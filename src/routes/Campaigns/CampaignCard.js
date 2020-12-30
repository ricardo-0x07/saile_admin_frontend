import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Divider } from '@material-ui/core';

import {
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import moment from 'moment';
import { adopt } from 'react-adopt';
import { Mutation, Query } from "react-apollo";
// import Switch from '@material-ui/core/Switch';
import { updateCampaign, createCampaignContact, createContact, createCampaignAccount, createScheduleAccount, createSchedule } from "../../graphql/mutations";
import { getScheduledAccountByAccountId, listAccountsByList, countCampaignScheduleAccounts, countCampaignAccounts, listCompanyDomainById, inbox_event_logs, getContactsByAccountId } from "../../graphql/queries"
import CampaignChart from './CampaignChart';
import { describeService, updateService, deployCampaign } from '../../utils/rest_api'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import WindResponseFileUpload from './WindResponseFileUpload'
import ProcessApolloAccountsFileUpload from './ProcessApolloAccountsFileUpload'
import { CSVLink } from "react-csv";

import { makeStyles } from '@material-ui/core/styles';
// import { blue } from '@material-ui/core/colors';


// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// });
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}));

function SimpleDialog(props) {
  // const classes = useStyles();
  const { onClose, onConfirm, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleonConfirm = () => {
    onConfirm()
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Deploy this as an ECS Service?</DialogTitle>
          <Button color="secondary" onClick={() => handleonConfirm()}>
            Confirm
          </Button>

        <Button color="primary" autoFocus onClick={() => handleClose()}>
          Cancel
        </Button>
    </Dialog>
  );
}

export const CampaignCard = ({ campaign, sailebot, requirement,  history }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    toStatus: campaign.to_run,
    is_warming_up: campaign.is_warming_up,
    service: {},
    showDownload: false,
    open: false,
  });

  const getService = async () => {
    let services = await describeService({ campaign_id: campaign.id});
    services = await services.json()
    console.log("services: ", services);
    return "services" in services && services["services"].length > 0  ? services["services"][0] : {}
  }
  React.useEffect(() => {
    const getData = async () => {
      const resp = await getService();
      // const json = await resp.json()
      setState({ ...state, service: resp });
    }
    getData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const {service, open} = state;
  console.log('service: ', service);
  const runECSService = async (params) => {
    await updateService(params);
    let services = await describeService({ campaign_id: campaign.id});
    services = await services.json()
    setState({ ...state, service: "services" in services && services["services"].length > 0  ? services["services"][0] : {} });
  }
  const handleClickOpen = () => {
    setState({...state, open: true});
  };

  const handleClose = () => {
    setState({...state, open: false});
    // setSelectedValue(value);
  };

  const addToWarmup = async (campaign, sailebot, createContactMutation, createCampaignAccountMutation, is_warmup_scheduled, createScheduleMutation, createScheduleAccountMutation, createCampaignContactMutation, contact_ids=[], warmup_account_id = 3921) => {
    const { firstname, lastname, email, phone, title } = sailebot;
    // add campaign credentails to warmup account view createContact
    
    console.log('contact_ids: ', contact_ids)
    let create_campaign_contact_responses = contact_ids.map(async contact_id => {
      let create_campaign_contact_response = await createCampaignContactMutation({
        variables: {
          objects: {
            campaign_id: campaign.id,
            account_id: warmup_account_id,
            contact_id
          }
        }
      });
      return create_campaign_contact_response;
    })
    console.log('create_campaign_contact_responses: ', create_campaign_contact_responses)
    let create_contact_response = await createContactMutation({
      variables: {
        objects: {
          firstname,
          lastname,
          email,
          phone,
          title,
          account_id: warmup_account_id
        }
      }
    });
    console.log('create_contact_response: ', create_contact_response)
    let create_campaign_account_response = await createCampaignAccountMutation({
      variables: {
        objects: {
          campaign_id: campaign.id,
          account_id: warmup_account_id
        }
      }
    });
    console.log('create_campaign_account_response: ', create_campaign_account_response)
    // add the warm up account 3921 to campaign if needed with createCampaignAccount

    // create warmup schedule if needed with createSchedule
    if(!is_warmup_scheduled) {
      let create_campaign_account_response = await createScheduleMutation({
        variables: {
          objects: {
            campaign_id: campaign.id,
            daily_outbound_limit: 1,
            no_targets_per_accounts: 1,
            deploy_date:  new Date() ,
            end_date:  new Date() ,
            status: 'Active',
            name: `Warmup Schedule Re: ${campaign.name}`, 
            timezone: campaign && campaign.timezone ? campaign.timezone : 'US/Eastern',
            accounts_per_schedule: 1
          }
        }
      });
      console.log('create_campaign_account_response: ', create_campaign_account_response)
      create_campaign_account_response.data.insert_schedule.returning.map(async schedule => {
        let create_schedule_account_response = await createScheduleAccountMutation({
          variables: {
            objects: {
              schedule_id: schedule.id,
              campaign_id: campaign.id,
              account_id: warmup_account_id
            }
          }
        });
        console.log('create_schedule_account_response: ', create_schedule_account_response)
        return create_schedule_account_response
      })
     console.log('Schedule Warmup')
    }
    console.log('addToWarmup campaign: ', campaign)
  }

  const _deployCampaign_ = async (params) => {
    console.log("params: ", params);
    await deployCampaign(params);
    let services = await describeService({ campaign_id: campaign.id});
    services = await services.json()
    setState({ ...state, service: "services" in services && services["services"].length > 0  ? services["services"][0] : {} });
  }
  const StartDate = moment(new Date()).add(-14, 'days').format('YYYY-MM-DD');
  console.log('typeof StartDate: ', typeof StartDate)
  console.log('StartDate: ', StartDate)
  const Composed = adopt({
    getScheduledAccountByAccountIdQuery: ({ render }) => (
      <Query query={ getScheduledAccountByAccountId(3921, campaign.id) } >
        { render }
      </Query> 
    ),
    getContactsByAccountIdQuery: ({ render }) => (
      <Query query={ getContactsByAccountId(3921) } >
        { render }
      </Query> 
    ),
    outboundEventLogsQuery: ({ render }) => (
      <Query query={ inbox_event_logs(campaign.id, false, StartDate) } >
        { render }
      </Query> 
    ),
    listCompanyDomainByIdQuery: ({ render }) => (
      <Query query={ listCompanyDomainById(campaign.company_domain_id) } >
        { render }
      </Query> 
    ),
    inboundEventLogsQuery: ({ render }) => (
      <Query query={ inbox_event_logs(campaign.id, true, StartDate) } >
        { render }
      </Query> 
    ),
    countCampaignAccountsQuery: ({ render }) => (
      <Query query={ countCampaignAccounts(campaign.id) } >
        { render }
      </Query> 
    ),
    countCampaignScheduleAccountsQuery: ({ render }) => (
      <Query query={ countCampaignScheduleAccounts(campaign.id) } >
        { render }
      </Query> 
    ),
    createContactMutation: ({ render }) => (
      <Mutation mutation={ createContact } >
        { render }
      </Mutation> 
      ),
    createCampaignAccountMutation: ({ render }) => (
    <Mutation mutation={ createCampaignAccount } >
      { render }
    </Mutation> 
    ),
    createScheduleAccountMutation: ({ render }) => (
      <Mutation mutation={ createScheduleAccount } >
        { render }
      </Mutation> 
    ),
    createScheduleMutation: ({ render }) => (
      <Mutation mutation={ createSchedule } >
        { render }
      </Mutation> 
      ),
    createCampaignContactMutation: ({ render }) => (
      <Mutation mutation={ createCampaignContact } >
        { render }
      </Mutation> 
      ),
    updateCampaignMutation: ({ render }) => (
      <Mutation mutation={ updateCampaign } >
        { render }
      </Mutation> 
      ),
  })

  const handleIsWarmingUpChange = (updateCampaignMutation) => async (event) => {
    const { id } = campaign;
    console.log('event.target.name: ', event.target.name)
    console.log('event.target.value: ', event.target.value)
    console.log('event.target.checked: ', event.target.checked)
    const is_warming_up = event.target.checked
    await setState({ ...state, [event.target.name]: is_warming_up });
    console.log('is_warming_up: ', is_warming_up)
    console.log('state: ', state)
    // updateCampaignMutation
    await updateCampaignMutation({
      variables: {
          objects: {
              is_warming_up,
          },
          id
      }
    });
  }
  const handleChange = (updateCampaignMutation) => async (event) => {
  
    const { id } = campaign;
    console.log('event.target.name: ', event.target.name)
    console.log('event.target.value: ', event.target.value)
    console.log('event.target.checked: ', event.target.checked)
    const to_run = event.target.checked
    await setState({ ...state, [event.target.name]: to_run });
    console.log('to_run: ', to_run)
    console.log('state: ', state)
    // updateCampaignMutation
    await updateCampaignMutation({
      variables: {
          objects: {
              id,
              to_run,
          },
          id
      }
    });
  };
  const { name, accounts_per_schedule, email_service, timezone, wait_days, to_run } = campaign;
  console.log("campaign: ", campaign)
  
  return (
    <Composed>
      {({ createCampaignContactMutation, createScheduleMutation, createScheduleAccountMutation, getScheduledAccountByAccountIdQuery, createCampaignAccountMutation, createContactMutation, updateCampaignMutation, countCampaignAccountsQuery, countCampaignScheduleAccountsQuery, outboundEventLogsQuery, inboundEventLogsQuery, listCompanyDomainByIdQuery, getContactsByAccountIdQuery }) => {
        let countCampaignAccounts = null
        let accounts = [];
        let contact_emails = [];
        let contact_ids = [];
        let is_warmup_scheduled = false
        let scheduled_accounts = [];
        if (getScheduledAccountByAccountIdQuery.data && getScheduledAccountByAccountIdQuery.data.schedule_account && !getScheduledAccountByAccountIdQuery.loading) {
          
          is_warmup_scheduled = getScheduledAccountByAccountIdQuery.data.schedule_account.length > 0;
          console.log('is_warmup_scheduled: ', is_warmup_scheduled);
          console.log('getScheduledAccountByAccountIdQuery.data.schedule_account: ', getScheduledAccountByAccountIdQuery.data.schedule_account);
        }
        if (getContactsByAccountIdQuery.data && getContactsByAccountIdQuery.data.contact && !getContactsByAccountIdQuery.loading) {
          
          contact_emails = getContactsByAccountIdQuery.data.contact.map(({email}) => email);
          contact_ids = getContactsByAccountIdQuery.data.contact.map(({id}) => id);
          console.log('contact_emails: ', contact_emails);
        }
        if (countCampaignAccountsQuery.data && countCampaignAccountsQuery.data.campaign_account_aggregate && !countCampaignAccountsQuery.loading) {
          
          accounts = countCampaignAccountsQuery.data.campaign_account_aggregate.nodes.map(({account_id}) => account_id);
          console.log('accounts: ', accounts);
          countCampaignAccounts = countCampaignAccountsQuery.data.campaign_account_aggregate.aggregate.count          
        }
        let countCampaignScheduleAccounts = null
        if (countCampaignScheduleAccountsQuery.data && countCampaignScheduleAccountsQuery.data.schedule_account_aggregate && !countCampaignScheduleAccountsQuery.loading) {
          countCampaignScheduleAccounts = countCampaignScheduleAccountsQuery.data.schedule_account_aggregate.aggregate.count     
          scheduled_accounts = countCampaignScheduleAccountsQuery.data.schedule_account_aggregate.nodes.map(({account}) => account).filter(account => account.id !== 3921);  
          console.log('scheduled_accounts: ', scheduled_accounts)   
        }
        
        console.log('countCampaignAccountsQuery: ', countCampaignAccountsQuery)
        console.log('listCompanyDomainByIdQuery: ', listCompanyDomainByIdQuery)
        
        const campany_domain = listCompanyDomainByIdQuery && listCompanyDomainByIdQuery.data && listCompanyDomainByIdQuery.data.company_domain.length > 0 ? listCompanyDomainByIdQuery.data.company_domain[0] : null;
        return (
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* <Typography>Campaign: {name}</Typography> */}
              {
                name && 
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span>
                    <Typography variant="h4" display="inline">Name: </Typography><Typography variant="h6"  display="inline">{name}</Typography>
                  </span>
                  <span>
                    <Typography variant="h6" display="inline">ID: </Typography><Typography variant="h6"  display="inline"># {campaign.id}</Typography>
                  </span>              
                </div>
              } 

              {
                to_run &&
                <CampaignChart inbound_data={inboundEventLogsQuery.loading ? [] : inboundEventLogsQuery.data}  outbound_data={outboundEventLogsQuery.loading ? [] : outboundEventLogsQuery.data}></CampaignChart>
              }
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <CardContent>
                  {/* <Typography>Name: {name}</Typography> */}
                  
                  <Typography>Inbox Email: {campaign.smtp_login}</Typography>
                  {
                    campany_domain &&
                    <Typography>Company Domain: {campaign.company_domain_id !==null ? campany_domain.name : ''}</Typography>
                  }
                  {
                    email_service &&
                    <Typography>Email Service: {email_service}</Typography>
                  }
                  {
                    timezone &&
                    <Typography>Timezone: {timezone}</Typography>
                  }                  <Typography>Accounts per schedule: {accounts_per_schedule}</Typography>
                  <Typography>Outbound delay: {wait_days}</Typography>
                  <Typography>Elasticity: {requirement.elasticity}</Typography>
                  <Typography>Campaign Accounts: {countCampaignAccounts}</Typography>
                  <Typography>Campaign Scheduled Accounts: {countCampaignScheduleAccounts}</Typography>
                  {
                    window.location.hostname === "localhost" && Object.keys(service).length > 0 &&
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography >ECS Service: {"serviceName" in service ? service["serviceName"] : ""}</Typography>
                      <Typography >Status: {"status" in service ? service["status"] : ""}</Typography>
                      <Typography >Desired Count: {"desiredCount" in service ? service["desiredCount"] : ""}</Typography>
                      <Typography >Pending Count: {"pendingCount" in service ? service["pendingCount"] : ""}</Typography>
                      <Typography >Running Count: {"runningCount" in service ? service["runningCount"] : ""}</Typography>
                      <Typography >Task Definition: {"taskDefinition" in service ? service["taskDefinition"] : ""}</Typography>
                      <Typography >Task Revision: {"taskDefinition" in service ? service["taskDefinition"].split(':')[service["taskDefinition"].split(':').length-1] : ""}</Typography>
                    </div>
                  }
                  {
                    // countCampaignAccounts && 
                    // <Typography>Campaign Elasticity: {countCampaignAccounts}</Typography>
                  }
                </CardContent>
                <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/manage-campaign', {campaign, requirement, sailebot})}>Edit</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/manage-template', {campaign, requirement, sailebot})}>Add Template</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/manage-schedule', {campaign, requirement, sailebot})}>Add Schedule</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/manage-account', {campaign, requirement, sailebot})}>Add Account</Button>
                  {
                    // window.location.hostname === "localhost" && name &&
                    name &&
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                      <WindResponseFileUpload 
                        campaign_name={name}
                        name={ 
                          `Process Wind: Contacts`
                        }
                      />                  
                      <ProcessApolloAccountsFileUpload 
                        campaign_name={name}
                        name={ 
                          `Process Wind: Accounts`
                        }
                      />
                    </div>
                  }
                </CardActions>
                <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/templates-by-campaign', {campaign, requirement})}>View Templates</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/schedules-by-campaign', {campaign, requirement, sailebot})}>View Schedules</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/accounts-by-campaign', {campaign, requirement, sailebot})}>View Accounts</Button>
                  <Button variant="contained"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => history.push('/app/clarifications-by-campaign', {campaign, requirement, name: 'Campaign'})}>Clarifications</Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.toStatus}
                        onChange={handleChange(updateCampaignMutation)}
                        name="toStatus"
                        color="primary"
                      />
                    }
                    label="Run?"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.is_warming_up}
                        onChange={handleIsWarmingUpChange(updateCampaignMutation)}
                        name="is_warming_up"
                        color="primary"
                      />
                    }
                    label="Warming Up?"
                  />                  
                  {
                    window.location.hostname === "localhost" && state.toStatus && Object.keys(service).length > 0 && "desiredCount" in service 
                    ?
                    <React.Fragment>
                      {
                        service["desiredCount"] > 0 
                        ?
                        <React.Fragment>
                          <Button variant="contained" color="secondary"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => runECSService({campaign_id: campaign.id, desiredCount: 0})}>Stop ECS Service</Button>

                        </React.Fragment>
                        :
                        <React.Fragment>
                          <Button variant="contained" color="default"   style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => runECSService({campaign_id: campaign.id, desiredCount: 1})}>Run ECS Service</Button>
                          {
                            window.location.hostname === "localhost" && timezone && requirement && requirement.id && sailebot && sailebot.client_id && campaign && campaign.id && campany_domain && campany_domain.name &&
                            <Button variant="contained" color="secondary"   style={{ width: '100%', marginBottom: '1rem'}} size="small"  onClick={() => _deployCampaign_({NEW_TASK: "NEW_TASK", campaign_id: campaign.id, client_id: sailebot.client_id, sailebot_id: sailebot.id, requirement_id: requirement.id, MAILGUNDOMAIN: campany_domain.name, MAILGUNHOST: campany_domain.name, timezone: timezone, updateTask: true})}>Update Task</Button>
                          }
                        </React.Fragment>
    
                      }
                    </React.Fragment>
                    :
                    window.location.hostname === "localhost" && timezone && requirement && requirement.id && sailebot && sailebot.client_id && campaign && campaign.id && campany_domain && campany_domain.name ?
                      <React.Fragment>
                        <Button variant="contained" color="secondary"   style={{ width: '100%', marginBottom: '1rem'}} size="small"  onClick={handleClickOpen}>Deploy ECS Service</Button>
                        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                          Open simple dialog
                        </Button> */}
                        <SimpleDialog open={open} onClose={handleClose} onConfirm={() => _deployCampaign_({campaign_id: campaign.id, client_id: sailebot.client_id, sailebot_id: sailebot.id, requirement_id: requirement.id, MAILGUNDOMAIN: campany_domain.name, MAILGUNHOST: campany_domain.name, timezone: timezone, updateTask: true})}/>

                      </React.Fragment>
                      
                      :
                      null
                  }
                  {
                    accounts && accounts.length > 0 &&
                    <Query query={listAccountsByList} variables={{list: accounts}}>
                      { ({data, loading, error}) => {
                      if (
                          loading ||
                          !data ||
                          !data.account ||
                          !data.account.length > 0 ||
                          !data.account
                        ) {
                          return null;
                        }
                        console.log("data.account: ", data.account)

                        return (
                          <div className={classes.root}>
                            {
                              !loading && data && data.account && data.account.length > 0 
                              ?
                              <React.Fragment>
                                <CSVLink
                                  data={data.account.filter(account => account.id !== 3921)}
                                  filename={`${campaign.name ? campaign.name : 'campaign'}_${campaign.smtp_login ? campaign.smtp_login : 'campaign'}_campaign_accounts.csv`}
                                  className="btn btn-primary"
                                  target="_blank"
                                >
                                  Download Campaign CSV
                                </CSVLink>
                              </React.Fragment>
                              :
                              <CircularProgress color="secondary" />

                            }
                          </div>
                        );
                      }}
                    </Query>
                  }  
                  <Divider/>
                  {
                    scheduled_accounts.length > 0  &&
                    <CSVLink
                      data={scheduled_accounts}
                      filename={`${campaign.name ? campaign.name : 'campaign'}_${campaign.smtp_login ? campaign.smtp_login : 'campaign'}_scheduled_accounts.csv`}
                      className="btn btn-primary"
                      target="_blank"
                    >
                      Download Scheduled CSV
                    </CSVLink>

                  }
                  {
                    // sailebot && contact_emails.length > 0 && campaign && campaign.smtp_login &&
                    sailebot && contact_ids && contact_ids.length > 0 && contact_emails && contact_emails.length > 0 && campaign && campaign.smtp_login && !contact_emails.includes(campaign.smtp_login) &&
                    <div className={classes.root}>
                      <Button variant="contained" color="default"   style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => addToWarmup(campaign, sailebot, createContactMutation, createCampaignAccountMutation, is_warmup_scheduled, createScheduleMutation, createScheduleAccountMutation, createCampaignContactMutation, contact_ids)}>add to warmup</Button>
                    </div>

                  }              


                </CardActions>
              </div>
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};
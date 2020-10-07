import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  FormControlLabel,
} from '@material-ui/core';
import moment from 'moment';
import { adopt } from 'react-adopt';
import { Mutation, Query } from "react-apollo";
import Switch from '@material-ui/core/Switch';
import { updateCampaign } from "../../graphql/mutations";
import { countCampaignScheduleAccounts, countCampaignAccounts, listCompanyDomainById, inbox_event_logs } from "../../graphql/queries"
import CampaignChart from './CampaignChart';


export const CampaignCard = ({ campaign, sailebot, requirement,  history }) => {
  const [state, setState] = React.useState({
    toStatus: campaign.to_run,
  });
  const StartDate = moment(new Date()).add(-14, 'days').format('YYYY-MM-DD');
  console.log('typeof StartDate: ', typeof StartDate)
  console.log('StartDate: ', StartDate)
  const Composed = adopt({
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
    updateCampaignMutation: ({ render }) => (
    <Mutation mutation={ updateCampaign } >
      { render }
    </Mutation> 
),
})

  const handleChange = (updateCampaignMutation) => async (event) => {
    const { name, description, accounts_per_schedule, requirement_id, id } = campaign;
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
              name,
              description,
              accounts_per_schedule,
              requirement_id,
              to_run,
          },
          id
      }
  });

  };
  const { name, accounts_per_schedule, email_service, wait_days, to_run } = campaign;
  return (
    <Composed>
      {({ updateCampaignMutation, countCampaignAccountsQuery, countCampaignScheduleAccountsQuery, outboundEventLogsQuery, inboundEventLogsQuery, listCompanyDomainByIdQuery }) => {
        let countCampaignAccounts = null
        if (countCampaignAccountsQuery.data && countCampaignAccountsQuery.data.campaign_account_aggregate && !countCampaignAccountsQuery.loading) {
          countCampaignAccounts = countCampaignAccountsQuery.data.campaign_account_aggregate.aggregate.count          
        }
        let countCampaignScheduleAccounts = null
        if (countCampaignScheduleAccountsQuery.data && countCampaignScheduleAccountsQuery.data.schedule_account_aggregate && !countCampaignScheduleAccountsQuery.loading) {
          countCampaignScheduleAccounts = countCampaignScheduleAccountsQuery.data.schedule_account_aggregate.aggregate.count          
        }
        console.log('outboundEventLogsQuery: ', outboundEventLogsQuery)
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
                  <Typography>Accounts per schedule: {accounts_per_schedule}</Typography>
                  <Typography>Outbound delay: {wait_days}</Typography>
                  <Typography>Elasticity: {requirement.elasticity}</Typography>
                  <Typography>Campaign Accounts: {countCampaignAccounts}</Typography>
                  <Typography>Campaign Scheduled Accounts: {countCampaignScheduleAccounts}</Typography>
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
                </CardActions>
              </div>
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};
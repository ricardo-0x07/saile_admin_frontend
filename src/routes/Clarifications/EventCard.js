/* eslint-disable no-unused-vars */

import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import * as moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import CircularProgress from '@material-ui/core/CircularProgress';

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Mutation, Query } from "react-apollo";
import { updateEvent, updateContact, updateSingleCampaignAccount, updateCampaignContact, deleteEvent, deleteOutboundEventByContactIdLabel } from "../../graphql/mutations";
import { getContactById, getCampaignContact, getCampaignAccount, getCampaignSaileBot, getCampaignAOTemplates, getCampaignReferrer } from "../../graphql/queries";
// import { getCampaignAOTemplates } from "../../graphql/queries";
import { adopt } from 'react-adopt';
import { createreferral, createActionableOpportunity } from '../../utils/rest_api'
import ContactSelect from "./ContactSelect";
import AddCampaignContact from './AddCampaignContact';
import CampaignContactEvents from '../CampaignContactEvents';
import EventEditDialog from './EventEditDialog';
import EditAccountDialog from './EditAccountDialog';
import EditContactDialog from './EditContactDialog';
import PreviewAODialog from './PreviewAODialog';



// const actionable_opportunity_clarification_lambda_api_endpoint = "https://8xbo18ydk7.execute-api.us-west-2.amazonaws.com/Prod/"
// const referral_clarification_lambda_api_endpoint = "https://d7quhnype6.execute-api.us-west-2.amazonaws.com/Prod/"

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const EventCard = ({ event, updateReload, history, apolloClient, company }) => {
  const [state, setState] = React.useState({
    showBody: false,
    delay: 7,
    showcontactForm: false,
    showCampaignContactEvents: false,
    createAOLoading: false,
    createReferralLoading: false,
  });
  const classes = useStyles();

  const handleShowCampaignContactEvents = async () => {
    await setState({ ...state, showCampaignContactEvents: !state.showCampaignContactEvents });
  }
  const {
    cc,
    date,
    id,
    label,
    sender,
    subject,
    body,
    contact_id,
    nlu_input_text,
    nlu_json_response,
    selected_intent,
    validated_json_response,
    validated_intent,
    campaign_id,
    is_inbound,
    to_clarify,
    to,
  } = event;

  const _createreferral_ = async (referral) => {
    try {
      console.log('referral: ', referral)
      await setState({ ...state, createReferralLoading: true });
      await createreferral(referral)
      console.log('referral: ', referral)
      updateReload()
    } catch (error) {
      console.log('createreferral error: ', error)
      await setState({ ...state, createReferralLoading: false });
      updateReload()
    }
  }
  
  const _createActionableOpportunity_ = async (opportunity) => {
    try {
      console.log('opportunity: ', opportunity)
      await setState({ ...state, createAOLoading: true });
      await createActionableOpportunity(opportunity)
      console.log('opportunity: ', opportunity)
      updateReload()
    } catch (error) {
      console.log('createActionableOpportunity error: ', error)
      await setState({ ...state, createAOLoading: false });
      updateReload()
    }
  }
  const _followupCampaignContact_ = async (updateCampaignContactMutation, deleteEventMutation, updateEventMutation, delay=7) => {
    const {
      cc,
      date,
      id,
      label,
      sender,
      subject,
      contact_id,
      nlu_input_text,
      nlu_json_response,
      selected_intent,
      validated_json_response,
      validated_intent,
      campaign_id,
      is_inbound,
      to_clarify,
      to,
    } = event;
    console.log('contact_id: ', contact_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignContactMutation({
      variables: {
          objects: {
            to_followup: true,
            is_delisted: false,
            status: 'Active',
            next_date: moment().add(delay, 'd').format('YYYY-MM-DD'),
          },
          contact_id,
          campaign_id,
      }
    });
    const toClarify=false
    var AUTO_REPLY_SUBJECT_KEYWORDS = ["utf-8", "Autosvar", "Respuesta automática", "Automatisch antwoord", "Risposta Non al computer", "Risposta automatica", "Automatische Antwort", "Automatische_Antwort", "ponse_automatique", "OUT OF OFFICE NOTIFICATION", "Răspuns automat:", "Resposta automática", "自動回覆", 'Automatic reply:', 'Automatic_reply', 'Auto-Reply', 'Out of Office' ]
    var isIn = new RegExp(AUTO_REPLY_SUBJECT_KEYWORDS.join("|")).test(subject)
    console.log("subject: ", subject)
    console.log("isIn: ", isIn)
    if (!isIn) {
      await updateEventMutation({
        variables: {
            objects: {
              label: 'followup',
              to_clarify: toClarify,
              to,
            },
            id
        }
      });        
    } else {
      await deleteEventMutation({
        variables: {
            id
        }
      });        
    }
    // refetch()
    updateReload()
  }
  // updateCampaignContact
  const Composed = adopt({
    deleteOutboundEventByContactIdLabelMutation: ({ render }) => (
      <Mutation mutation={ deleteOutboundEventByContactIdLabel } >
        { render }
      </Mutation> 
    ),
    deleteEventMutation: ({ render }) => (
      <Mutation mutation={ deleteEvent } >
        { render }
      </Mutation> 
    ),
    updateCampaignContactMutation: ({ render }) => (
      <Mutation mutation={ updateCampaignContact } >
        { render }
      </Mutation> 
    ),
    updateEventMutation: ({ render }) => (
        <Mutation mutation={ updateEvent } >
          { render }
        </Mutation> 
    ),
    updateContactMutation: ({ render }) => (
      <Mutation mutation={ updateContact } >
        { render }
      </Mutation> 
    ),
      updateCampaignAccountMutation: ({ render }) => (
        <Mutation mutation={ updateSingleCampaignAccount } >
          { render }
        </Mutation> 
    ),
  })
  const handleChange = async () => {
    await setState({ ...state, showBody: !state.showBody });
  }
  const toggleContactForm = async () => {
    await setState({ ...state, showcontactForm: !state.showcontactForm });
  }
    

  const handleDelayChange = async (event) => {
    console.log("event.target.value:  ", event.target.value)
    await setState({ ...state, delay: Number(event.target.value) });
  }


  const noResponseClarification = (updateEventMutation) => async () => {
    const {
      id,
    } = event;
    
    const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
            label: 'no_response',
            to_clarify: toClarify,
          },
          id
      }
    });
    updateReload()
  }

  const reEngage = (updateCampaignAccountMutation, updateEventMutation, contact_data, refetchAccount, updateCampaignContactMutation, deleteOutboundEventByContactIdLabelMutation) => async () => {
    const {
      cc,
      date,
      id,
      label,
      sender,
      subject,
      contact_id,
      nlu_input_text,
      nlu_json_response,
      selected_intent,
      validated_json_response,
      validated_intent,
      campaign_id,
      is_inbound,
      to_clarify,
      to,
    } = event;
    await updateCampaignContactMutation({
      variables: {
          objects: {
            is_delisted: false,
            status: 'Active',
          },
          contact_id,
          campaign_id,
      }
    });
    await deleteOutboundEventByContactIdLabelMutation({
      variables: {
        contact_id, 
        is_inbound: false,
        label: "actionable_opportunity"
      }
    });        
  
    const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
            label: 're_engage',
            to_clarify: toClarify,
            to,
          },
          id
      }
    });
    console.log('contact_data.account_id: ', contact_data.account_id)
    await updateCampaignAccountMutation({
      variables: {
          objects: {
            is_delisted: false,
            last_delisted_date: new Date().toJSON().slice(0, 10) 
          },
          account_id: contact_data.account_id,
          campaign_id,
      }
    });
    // refetchAccount()

    updateReload()
  }

  const dismissClarification = (updateEventMutation) => async () => {
    const {
      id,
    } = event;
    
    const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
            to_clarify: toClarify,
          },
          id
      }
    });
    updateReload()
  }
  const unsubscribeContact = (updateContactMutation) => async () => {
    const toClarify=false
    await updateContactMutation({
      variables: {
          objects: {
            unsubscribed: true,
          },
          id: event.contact_id
      }
    });
    updateReload()
  }
  const handleSelectChange= async (item) => {
    console.log('item: ', item)
    updateReload()
  }
  const _delistCampaignAccount_ = async (updateCampaignAccountMutation, updateEventMutation, contact_data, is_delisted, refetchAccount) => {
    console.log('contact_data: ', contact_data)
    const {
      cc,
      date,
      id,
      label,
      sender,
      subject,
      contact_id,
      nlu_input_text,
      nlu_json_response,
      selected_intent,
      validated_json_response,
      validated_intent,
      campaign_id,
      is_inbound,
      to_clarify,
      to,
    } = event;
    const toClarify=false
    console.log('contact_data.account_id: ', contact_data.account_id)
    await updateCampaignAccountMutation({
      variables: {
          objects: {
            is_delisted: !is_delisted,
            last_delisted_date: new Date().toJSON().slice(0, 10) 
          },
          account_id: contact_data.account_id,
          campaign_id,
      }
    });
    refetchAccount()

  }
  const _reListCampaignContact_ = async (updateCampaignContactMutation, deleteEventMutation) => {
    const {
      id,
      contact_id,
      campaign_id,
    } = event;
    const toClarify=false
    console.log('contact_id: ', contact_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignContactMutation({
      variables: {
          objects: {
            is_delisted: false,
            status: 'Active',
          },
          contact_id,
          campaign_id,
      }
    });

    await deleteEventMutation({
      variables: {
          id
      }
    });
    updateReload()
  }
  const _delistCampaignContact_ = async (updateCampaignContactMutation, updateEventMutation) => {
    const {
      cc,
      date,
      id,
      label,
      sender,
      subject,
      contact_id,
      nlu_input_text,
      nlu_json_response,
      selected_intent,
      validated_json_response,
      validated_intent,
      campaign_id,
      is_inbound,
      to_clarify,
      to,
    } = event;
    const toClarify=false
    console.log('contact_id: ', contact_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignContactMutation({
      variables: {
          objects: {
            to_followup: true,
            is_delisted: true,
            status: 'Remove',
            delisted_date: new Date().toJSON().slice(0, 10) 
          },
          contact_id,
          campaign_id,
      }
    });

    await updateEventMutation({
      variables: {
          objects: {
            to_clarify: toClarify,
          },
          id
      }
    });
    updateReload()
  }
  function createMarkup(body) {
    return {__html: body};
  }
  const insertBody = (body) => {
    return (
      <React.Fragment>
        <Typography>Body: </Typography>
        {
          body.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
        }
      </React.Fragment>
    );
  }
  console.log("sender.split('@'): ", sender.split('@'))
  console.log("sender.split('@'): ", sender.split('@')[sender.split('@').length-1])

  
  return (
    <Composed>
      {({ updateEventMutation, updateContactMutation, updateCampaignAccountMutation, updateCampaignContactMutation, deleteEventMutation, deleteOutboundEventByContactIdLabelMutation  }) => {

        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong><span style={{backgroundColor: label === 'actionable_opportunity'? 'red' : 'orange'}}>{label}</span> <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              <Typography><strong>Subject:</strong> {subject} <strong>Cc:</strong> {cc}</Typography>
              <Typography><strong>Event ID:</strong> {event.id || ''} <strong>Campaign id:</strong> {event.campaign_id || ''} <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment></Typography>
              {/* <Typography>
                
              </Typography> */}
              {
                campaign_id && contact_id &&
                <Query query={getContactById(contact_id)} >
                  { ({data, loading, refetch}) => {
                  if (
                      loading ||
                      !data ||
                      !data.contact ||
                      !data.contact.length > 0 ||
                      !data.contact
                    ) {
                      return null;
                    }
                    console.log('getContactById data: ',  data)
                    console.log("state.delay: ", state.delay)
                    const contact = data.contact[0]
                    const { account_id } = data.contact[0]
                    if (account_id === undefined) {
                      return null;
                    }

                    return (
                      <Query query={getCampaignAccount(campaign_id, account_id)} >
                      { (campaignAccountQuery) => {
                        console.log('getCampaignAccount campaignAccountQuery.data: ', campaignAccountQuery.data)
                      if (
                        campaignAccountQuery.loading ||
                          !campaignAccountQuery.data ||
                          !campaignAccountQuery.data.campaign_account ||
                          !campaignAccountQuery.data.campaign_account.length > 0 ||
                          !campaignAccountQuery.data.campaign_account
                        ) {
                          return null;
                        }
                        console.log('campaignAccountQuery.data: ', campaignAccountQuery.data)
                        const { is_delisted } = campaignAccountQuery.data.campaign_account[0]
    
                        return (
                          <React.Fragment>
                            {/* EditContactDialog */}
                            {/* <EditContactDialog contact={contact} updateReload={refetch} history={history} apolloClient={apolloClient} name={`Edit contact`}/> */}
                            <Typography><strong>AccountID: {account_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography>
                          </React.Fragment>
                        );
                      }}
                    </Query>                    
                    );
                  }}
                </Query>
                
              }
              {
                id && campaign_id &&
                <Query query={getCampaignSaileBot(campaign_id)}>
                   { (getCampaignSaileBotQuery) => {
                    console.log('getCampaignSaileBotQuery.data: ', getCampaignSaileBotQuery.data)

                    var AUTO_REPLY_SUBJECT_KEYWORDS = ["Automatyczna odpowiedź", "Automatyczna", "Autosvar", "Respuesta automática", "Automatisch antwoord", "Risposta Non al computer", "Risposta automatica", "Automatische Antwort", "Automatische_Antwort", "ponse_automatique", "OUT OF OFFICE NOTIFICATION", "Răspuns automat:", "Resposta automática", "自動回覆", 'Automatic reply:', 'Automatic_reply', 'Auto-Reply', 'Out of Office', 'Out of the Office', 'Out of the office' ]
                    var isIn = new RegExp(AUTO_REPLY_SUBJECT_KEYWORDS.join("|")).test(subject)
                    console.log("subject: ", subject)
                    console.log("isIn: ", isIn)
                    if (
                        getCampaignSaileBotQuery.loading ||
                        !getCampaignSaileBotQuery.data ||
                        !getCampaignSaileBotQuery.data.sailebot ||
                        !getCampaignSaileBotQuery.data.sailebot.length > 0 ||
                        !getCampaignSaileBotQuery.data.sailebot
                      ) {
                        return null;
                      }
                      const sailebot = getCampaignSaileBotQuery.data.sailebot[0];
                      return (
                        <React.Fragment>
                          {
                            id && sailebot && sailebot.id && campaign_id && contact_id &&
                            <Query query={getCampaignContact(campaign_id, contact_id)} >
                              { ({data, loading}) => {
                                console.log('data: ', data)
                              if (
                                  loading ||
                                  !data ||
                                  !data.campaign_contact ||
                                  !data.campaign_contact.length > 0 ||
                                  !data.campaign_contact
                                ) {
                                  return null;
                                }
                                console.log('data: ', data)
                                const { status, is_delisted} = data.campaign_contact[0]

                                return (
                                  <Typography><strong>ContactID: {contact_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography>
                                );
                              }}
                            </Query>
                            
                          }
                          <CardActions className={classes.root} style={{ flexFlow: 'wrap'}}>
                            <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                            <Button variant="contained" size="small" color={state.showCampaignContactEvents ? "secondary" :  "default"}onClick={handleShowCampaignContactEvents}>{!state.showCampaignContactEvents ? "View Events" : "Hide Events"}</Button>
                            <Button variant="contained" size="small" onClick={dismissClarification(updateEventMutation)}>Dismiss</Button>
                            <Button variant="contained" size="small" onClick={noResponseClarification(updateEventMutation)}>None Response</Button>
                            {
                              id && sailebot && sailebot.id && contact_id && 
                              <React.Fragment>
                                {
                                  !state.createReferralLoading 
                                  ?
                                  <Button variant="contained" size="small" onClick={() => _createreferral_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create Referral</Button>
                                  :
                                  <CircularProgress color="secondary" />
                                }
                              </React.Fragment>
                            }
                            {
                              id && sailebot && sailebot.id && contact_id &&
                              <React.Fragment>
                                {
                                  !state.createAOLoading 
                                  ?
                                  <Button variant="contained" size="small" onClick={() => _createActionableOpportunity_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create AO</Button>
                                  :
                                  <CircularProgress color="secondary" />
                                }
                              </React.Fragment>
                            }
                            {
                              id && sailebot && sailebot.id && campaign_id && contact_id &&
                              <Query query={getCampaignContact(campaign_id, contact_id)} >
                                { ({data, loading}) => {
                                  if (
                                    loading ||
                                    !data ||
                                    !data.campaign_contact ||
                                    !data.campaign_contact.length > 0 ||
                                    !data.campaign_contact
                                  ) {
                                    return null;
                                  }
                                  const { is_delisted } = data.campaign_contact[0]

                                  if (is_delisted) {
                                    return null
                                  }

                                  return (
                                    <Button variant="contained" size="small" onClick={() => _delistCampaignContact_(updateCampaignContactMutation, updateEventMutation)}>Remove Contact</Button>
                                  );
                                }}
                              </Query>
                             
                            }
                            {/* Delist or Relist Account */}
                            {
                              id && sailebot && sailebot.id && campaign_id && contact_id &&
                              <Query query={getContactById(contact_id)} >
                                { ({data, loading, refetch}) => {
                                  if (
                                    loading ||
                                    !data ||
                                    !data.contact ||
                                    !data.contact.length > 0 ||
                                    !data.contact
                                  ) {
                                    return null;
                                  }
                                  const contact = data.contact[0]
                                  const { account_id } = data.contact[0]
                                  if (account_id === undefined) {
                                    return null;
                                  }
              
                                  return (
                                    <Query query={getCampaignAccount(campaign_id, account_id)} >
                                    { (campaignAccountQuery) => {
                                      console.log('getCampaignAccount campaignAccountQuery.data: ', campaignAccountQuery.data)
                                      if (
                                      campaignAccountQuery.loading ||
                                        !campaignAccountQuery.data ||
                                        !campaignAccountQuery.data.campaign_account ||
                                        !campaignAccountQuery.data.campaign_account.length > 0 ||
                                        !campaignAccountQuery.data.campaign_account
                                      ) {
                                        return null;
                                      }
                                      console.log('campaignAccountQuery.data: ', campaignAccountQuery.data)
                                      const { is_delisted, account } = campaignAccountQuery.data.campaign_account[0]
                  
                                      return (
                                        <React.Fragment>
                                          {
                                            contact &&
                                            <EditContactDialog contact={contact} updateReload={refetch} history={history} apolloClient={apolloClient} name={`Edit contact`}/>
                                          }
                                          {
                                            account && account.id &&
                                            <React.Fragment>
                                            <EditAccountDialog account={account} updateReload={campaignAccountQuery.refetch} history={history} apolloClient={apolloClient} name={`Edit Account`}/>
                                              {
                                                // getCampaignAOTemplates
                                                campaign_id &&
                                                <Query query={getCampaignAOTemplates(campaign_id, 'actionable_opportunity')} >
                                                  { (getCampaignAOTemplatesQuery) => {
                                                    if (
                                                    getCampaignAOTemplatesQuery.loading ||
                                                      !getCampaignAOTemplatesQuery.data ||
                                                      !getCampaignAOTemplatesQuery.data.template ||
                                                      !getCampaignAOTemplatesQuery.data.template.length > 0 ||
                                                      !getCampaignAOTemplatesQuery.data.template
                                                    ) {
                                                      return null;
                                                    }
                                                    console.log('getCampaignAOTemplatesQuery.data: ', getCampaignAOTemplatesQuery.data)
                                                    const template = getCampaignAOTemplatesQuery.data.template[0]
                                                    let referrer = null;
                                                    // PreviewAODialog getCampaignReferrer
                                                    return (
                                                      <Query query={getCampaignReferrer(campaign_id, contact_id)} >
                                                        { (getCampaignReferrerQuery) => {
                                                          if (
                                                          !getCampaignReferrerQuery.loading &&
                                                            getCampaignReferrerQuery.data &&
                                                            getCampaignReferrerQuery.data.campaign_referral &&
                                                            getCampaignReferrerQuery.data.campaign_referral.length > 0 &&
                                                            getCampaignReferrerQuery.data.campaign_referral[0].contact
                                                          ) {
                                                            referrer = getCampaignReferrerQuery.data.campaign_referral[0].contact
                                                            console.log('referrer: ', referrer)
                                                          }
                                                          if (getCampaignReferrerQuery.loading) {
                                                            return null
                                                          }
                                                          console.log('getCampaignReferrerQuery.data: ', getCampaignReferrerQuery.data)
                                                          
                                                          // PreviewAODialog getCampaignReferrer
                                                          return <PreviewAODialog template={template} referrer={referrer} event={event} account={account} contact={contact} updateReload={getCampaignAOTemplatesQuery.refetch} history={history} apolloClient={apolloClient} name={`Preview AO`} company={company}/>;
                                                        }}
                                                      </Query>
                                                    );
                                                  }}
                                                </Query>
                                              }
                                            </React.Fragment>
                                          }
                                          <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* <Typography><strong>AccountID: {account_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography> */}
                                            <Button variant="contained" size="small" style={{marginRight: '1rem'}} onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact, is_delisted, campaignAccountQuery.refetch)}>{is_delisted? "Relist" : "Delist"} Account</Button>
                                            {
                                              label === 'actionable_opportunity' && window.location.hostname === "localhost" &&
                                              
                                                <Button variant="contained" size="small" color="secondary" onClick={() => reEngage(updateCampaignAccountMutation, updateEventMutation, contact, campaignAccountQuery.refetch, updateCampaignContactMutation, deleteOutboundEventByContactIdLabelMutation)}>Re Engage</Button>
                                            }
                                          </div>
                                        </React.Fragment>
                                      );  
                                    }} 
                                    </Query>
                                  );           
                                }}
                              </Query>
                            }
                          {/* </CardActions>

                          <CardActions className={classes.root}> */}
                            {/* Edit Event */}
                            {
                              // window.location.hostname === "localhost" &&
                              // <Button  variant="contained" size="small" onClick={() => history.push('/app/manage-event', { event })}>Edit Event</Button>
                            }
                            <EventEditDialog event={event} updateReload={updateReload} history={history} apolloClient={apolloClient} name={`Edit Event`}/>
                            {/* Follow up period */}
                            {
                              // !isIn &&
                              id && sailebot && sailebot.id && campaign_id && contact_id &&
                              <React.Fragment>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-label">Followup Period</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.delay}
                                    onChange={handleDelayChange}
                                  >
                                    <MenuItem value={2}>Two Days</MenuItem>
                                    <MenuItem value={3}>Three Days</MenuItem>
                                    <MenuItem value={7}>One Week</MenuItem>
                                    <MenuItem value={14}>Two Weeks</MenuItem>
                                    <MenuItem value={21}>Three Weeks</MenuItem>
                                    <MenuItem value={28}>Four Weeks</MenuItem>
                                    <MenuItem value={42}>Six Weeks</MenuItem>
                                    <MenuItem value={56}>Eight Weeks</MenuItem>
                                    <MenuItem value={70}>Ten Weeks</MenuItem>
                                    <MenuItem value={84}>Twelve Weeks</MenuItem>
                                    <MenuItem value={112}>Four Months</MenuItem>
                                    <MenuItem value={168}>Six Months</MenuItem>
                                    <MenuItem value={252}>Nine Months</MenuItem>
                                    <MenuItem value={336}>Twelve Months</MenuItem>
                                  </Select>
                                </FormControl>
                                <Button variant="contained" size="small" onClick={() => {
                                    if (state.delay) {
                                      _followupCampaignContact_(updateCampaignContactMutation, deleteEventMutation, updateEventMutation, state.delay)
                                    }
                                }}>Followup Contact</Button>                                
                              </React.Fragment>
                            }

                            {
                              id && sailebot && sailebot.id && campaign_id && contact_id &&
                              <Query query={getContactById(contact_id)} >
                                { ({data, loading}) => {
                                  if (
                                    loading ||
                                    !data ||
                                    !data.contact ||
                                    !data.contact.length > 0 ||
                                    !data.contact
                                  ) {
                                    return null;
                                  }
                                  const contact = data.contact[0]
                                  var now = moment()
                                  var startTime = moment(date)
                                  // var start = moment.utc(startTime, "HH:mm");
                                  console.log("now: ", now)
                                  console.log("startTime: ", startTime)
                                  var ready = startTime.add(1, "week") < now
                                  console.log("ready: ", ready)
                                  var AUTO_REPLY_SUBJECT_KEYWORDS = ["Autosvar", "Respuesta automática", "Automatisch antwoord", "Risposta Non al computer", "Risposta automatica", "Automatische Antwort", "Automatische_Antwort", "ponse_automatique", "OUT OF OFFICE NOTIFICATION", "Răspuns automat:", "Resposta automática", "自動回覆", 'Automatic reply:', 'Automatic_reply', 'Auto-Reply', 'Out of Office' ]
                                  var isIn = new RegExp(AUTO_REPLY_SUBJECT_KEYWORDS.join("|")).test(subject)
                                  console.log("subject: ", subject)
                                  console.log("isIn: ", isIn)

                                  return (
                                    <div style={{ flexDirection: 'row' }}>
                                      {
                                        contact && contact.account_id && ready && isIn &&
                                        <Query query={getCampaignAccount(campaign_id, contact.account_id)} >
                                          { (getCampaignAccountQuery) => {
                                            if (
                                              getCampaignAccountQuery.loading ||
                                              !getCampaignAccountQuery.data ||
                                              !getCampaignAccountQuery.data.campaign_account ||
                                              !getCampaignAccountQuery.data.campaign_account.length > 0 ||
                                              !getCampaignAccountQuery.data.campaign_account
                                            ) {
                                              return null;
                                            }
                                            const campaign_account = getCampaignAccountQuery.data.campaign_account[0]
                                            console.log("campaign_account: ", campaign_account)
                                            if (campaign_account.is_delisted) {
                                              return null;
                                            }

                                            return (
                                              <div>
                                                <Button variant="contained" size="small" onClick={() =>  _reListCampaignContact_(updateCampaignContactMutation, deleteEventMutation) }>De-quarantee</Button>
                                              </div>
                                            );
                                          }}
                                        </Query>
                                      }
                                    </div>
                                  );
                                }}
                              </Query>
                              
                            }

                            {
                              id && sailebot && sailebot.id && !contact_id &&
                              
                              <ContactSelect
                                    placeholder='Contact by Email'
                                    name='contact'
                                    handleSelectChange={handleSelectChange}
                                    variant="outlined"
                                    event_id={id}
                                    // sailebot={props.location.state.sailebot}
                              />  
                            }            
                            {
                              // contact_id &&
                              // <Button variant="contained" size="small" onClick={unsubscribeContact(updateContactMutation)}>Globally Unsubscribe Contact</Button>
                            }
                            {
                              id && sailebot && sailebot.id && contact_id &&
                              <Button variant="contained" size="small" onClick={() => _createActionableOpportunity_({entity: {is_ao: false, event_id: id, sailebot_id: sailebot.id}})}>Create NO</Button>
                            }

                          </CardActions>

                        </React.Fragment>
                      );
  
                   }}
                </Query>
              }



              {/* Add Campaign contact */}
              {
                state.showBody &&
                <React.Fragment>
                  {
                    insertBody(body)
                  }
                  <Button variant="contained" size="small" onClick={toggleContactForm}>{!state.showcontactForm ? "Show Contact Form" : "Hide Contact Form"}</Button>
                </React.Fragment>
              }
              {
                state.showcontactForm && campaign_id && contact_id?
                <Query query={getContactById(contact_id)} >
                  { ({data, loading}) => {
                    if (
                      loading ||
                      !data ||
                      !data.contact ||
                      !data.contact.length > 0 ||
                      !data.contact
                    ) {
                      return null;
                    }
                    const contact = data.contact[0]
                    var now = moment()
                    var startTime = moment(date)
                    // var start = moment.utc(startTime, "HH:mm");
                    console.log("contact: ", contact)

                    return (
                      <div style={{ flexDirection: 'row' }}>
                        {
                          contact && contact.account_id && 
                          <AddCampaignContact closeForm={toggleContactForm} account_id={contact !== undefined && contact.account_id !== undefined ? contact.account_id : undefined} campaign_id={campaign_id} apolloClient={apolloClient}/>
                        }
                      </div>
                    );
                  }}
                </Query>
                :
                state.showcontactForm && campaign_id ?
                <AddCampaignContact closeForm={toggleContactForm} account_id={ undefined} campaign_id={campaign_id} apolloClient={apolloClient}/>
                : null

              }
              {
                campaign_id && state.showCampaignContactEvents &&
                <CampaignContactEvents search_term={sender ?  sender.split('@')[sender.split('@').length-1] : ''} campaign_id={campaign_id}/>
              }

            </CardContent>
          </Card>    
        );
      }}
    </Composed>
  );
};
/* eslint-disable no-unused-vars */

import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import * as moment from 'moment';
// import {
//   TextField,
//   Button,
//   FormLabel,
//   FormControl,
//   FormGroup,
//   FormControlLabel,
// } from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Mutation, Query } from "react-apollo";
import { updateEvent, updateContact, updateSingleCampaignAccount, updateCampaignContact, deleteEvent } from "../../graphql/mutations";
import { getContactById, getCampaignContact, getCampaignAccount, getCampaignSaileBot } from "../../graphql/queries";
import { adopt } from 'react-adopt';
import { createreferral, createActionableOpportunity } from '../../utils/rest_api'
import ContactSelect from "./ContactSelect";


// const actionable_opportunity_clarification_lambda_api_endpoint = "https://8xbo18ydk7.execute-api.us-west-2.amazonaws.com/Prod/"
// const referral_clarification_lambda_api_endpoint = "https://d7quhnype6.execute-api.us-west-2.amazonaws.com/Prod/"

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event, updateReload }) => {
  const [state, setState] = React.useState({
    showBody: false,
  });
  const classes = useStyles();

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
      await createreferral(referral)
      console.log('referral: ', referral)
      updateReload()
    } catch (error) {
      console.log('createreferral error: ', error)
    }
  }
  
  const _createActionableOpportunity_ = async (opportunity) => {
    try {
      console.log('opportunity: ', opportunity)
      await createActionableOpportunity(opportunity)
      console.log('opportunity: ', opportunity)
      updateReload()
    } catch (error) {
      console.log('createActionableOpportunity error: ', error)
    }
  }
// updateCampaignContact
  const Composed = adopt({
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
  const dismissClarification = (updateEventMutation) => async () => {
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
    
    const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
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
            to_clarify: toClarify,
            to,
          },
          id
      }
    });
    updateReload()
  }

  const noResponseClarification = (updateEventMutation) => async () => {
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
    
    const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
            cc,
            date,
            id,
            label: 'no_response',
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
            to_clarify: toClarify,
            to,
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
  const _delistCampaignAccount_ = async (updateCampaignAccountMutation, updateEventMutation, contact_data) => {
    console.log('contact_data: ', contact_data)
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
    const toClarify=false
    console.log('contact_data.account_id: ', contact_data.account_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignAccountMutation({
      variables: {
          objects: {
            is_delisted: true,
            last_delisted_date: new Date().toJSON().slice(0, 10) 
          },
          account_id: contact_data.account_id,
          campaign_id,
      }
    });

    await updateEventMutation({
      variables: {
          objects: {
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
            to_clarify: toClarify,
            to,
          },
          id
      }
    });
    updateReload()
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
    const toClarify=false
    console.log('contact_id: ', contact_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignContactMutation({
      variables: {
          objects: {
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
            to_clarify: toClarify,
            to,
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
  
  return (
    <Composed>
      {({ updateEventMutation, updateContactMutation, updateCampaignAccountMutation, updateCampaignContactMutation, deleteEventMutation  }) => {

        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              <Typography><strong>Subject:</strong> {subject} <strong>Cc:</strong> {cc}</Typography>
              <Typography>
                <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment>
              </Typography>
              {
                campaign_id && contact_id &&
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
                    console.log('getContactById data: ',  data)
                    console.log('campaign_id: ', campaign_id)
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
                          <Typography><strong>AccountID: {account_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography>
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
                          <CardActions className={classes.root}>
                            <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                            <Button variant="contained" size="small" onClick={dismissClarification(updateEventMutation)}>Accept & Dismiss</Button>
                            <Button variant="contained" size="small" onClick={noResponseClarification(updateEventMutation)}>None Response</Button>
                            {
                              id && sailebot && sailebot.id && contact_id &&
                              <Button variant="contained" size="small" onClick={() => _createreferral_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create Referral</Button>
                            }
                            {
                              id && sailebot && sailebot.id && contact_id &&
                              <Button variant="contained" size="small" onClick={() => _createActionableOpportunity_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create AO</Button>
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

                                  return (
                                    <div style={{ flexDirection: 'row' }}>
                                      <Button variant="contained" size="small" onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact)}>Remove Account</Button>
                                    </div>
                                  );
                                }}
                              </Query>
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
                                  var AUTO_REPLY_SUBJECT_KEYWORDS = ["Autosvar", "ponse_automatique", "OUT OF OFFICE NOTIFICATION", "Răspuns automat:", "Resposta automática", "自動回覆", 'Automatic reply:', 'Automatic_reply', 'Auto-Reply', 'Out of Office' ]
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
                          </CardActions>

                        </React.Fragment>
                      );
  
                   }}
                </Query>
              }
              {
                state.showBody &&
                insertBody(body)
              }
            </CardContent>
          </Card>    
        );
      }}
    </Composed>
  );
};
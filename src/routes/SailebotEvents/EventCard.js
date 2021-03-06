import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Moment from 'react-moment';
import { updateEvent, updateCampaignContact, deleteOutboundEventByContactIdLabel } from "../../graphql/mutations";
import { updateSingleCampaignAccount } from "../../graphql/mutations";

import { adopt } from 'react-adopt';
import { Mutation, Query } from "react-apollo";
import { getContactById, getCampaignContact, getCampaignAccount, sailebotEventDigitalLabor } from "../../graphql/queries";
import CampaignContactEvents from '../CampaignContactEvents';
import * as moment from 'moment';
// import { createActionableOpportunity } from '../../utils/rest_api'


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event, updateReload, client, history }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    showBody: false,
    showCampaignContactEvents: false,
  });
  const {
    sender,
    subject,
    label,
    to,
    body,
    date,
    cc,
    contact_id,
    campaign_id
  } = event;
  function createMarkup(body) {
    return {__html: body};
  }
  const handleChange = async () => {
    await setState({ ...state, showBody: !state.showBody });
  }
  const handleShowCampaignContactEvents = async () => {
    await setState({ ...state, showCampaignContactEvents: !state.showCampaignContactEvents });
  }
  const reEngage = (updateCampaignAccountMutation, updateEventMutation, contact_data, refetchAccount, updateCampaignContactMutation, deleteOutboundEventByContactIdLabelMutation) => async () => {
    const {
      id,
      contact_id,
      campaign_id,
      to,
    } = event;
    await updateCampaignContactMutation({
      variables: {
          objects: {
            to_followup: true,
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
            status: 'Active',
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
  const _delistCampaignAccount_ = async (updateCampaignAccountMutation, updateEventMutation, contact_data, is_delisted, refetchAccount) => {
    console.log('contact_data: ', contact_data)
    const {
      campaign_id,
    } = event;
    console.log('contact_data.account_id: ', contact_data.account_id)
    console.log('campaign_id: ', campaign_id)
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

    const {
      id,
    } = event;
    // const toClarify=false
    await updateEventMutation({
      variables: {
          objects: {
            to_clarify: is_delisted ? false : true,
            label: is_delisted ? label : 'no_response',
          },
          id
      }
    });
    // refetchAccount()
    updateReload()
  }

  const _delistCampaignContact_ = async (updateCampaignContactMutation, updateEventMutation) => {
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
            label: 'no_response',
          },
          id
      }
    });
    updateReload()
  }
  // const _createActionableOpportunity_ = async (opportunity) => {
  //   try {
  //     console.log('opportunity: ', opportunity)
  //     await createActionableOpportunity(opportunity)
  //     console.log('opportunity: ', opportunity)
  //     updateReload()
  //   } catch (error) {
  //     console.log('createActionableOpportunity error: ', error)
  //   }
  // }
  // const insertBody = (body) => {
  //   return (
  //     <React.Fragment>
  //       <Typography>Body: </Typography>
  //       {
  //         // body.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
  //         <div dangerouslySetInnerHTML={createMarkup(body)} />
          
  //       }
  //     </React.Fragment>
  //   );
  // }
  const _followupCampaignContact_ = async (updateCampaignContactMutation, refetch) => {
    const {

      contact_id,
      campaign_id,

    } = event;
    console.log('contact_id: ', contact_id)
    console.log('campaign_id: ', campaign_id)
    await updateCampaignContactMutation({
      variables: {
          objects: {
            to_followup: true,
            is_delisted: false,
            next_date: moment().format('YYYY-MM-DD'),
          },
          contact_id,
          campaign_id,
      }
    });
    refetch()
    updateReload()
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
      // to_clarify,
      to,
    } = event;
    
    const toClarify=true
    const results = await updateEventMutation({
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
    console.log("results: ", results);
    updateReload()
  }
  // const insertBody = (body) => {
  //   return (
  //     <React.Fragment>
  //       <Typography>Body: </Typography>
  //       {
  //         body.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
  //       }
  //     </React.Fragment>
  //   );
  // }
  // function createMarkup(body) {
  //   return {__html: body};
  // }
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
  const Composed = adopt({
      deleteOutboundEventByContactIdLabelMutation: ({ render }) => (
        <Mutation mutation={ deleteOutboundEventByContactIdLabel } >
          { render }
        </Mutation> 
      ),
      updateEventMutation: ({ render }) => (
        <Mutation mutation={ updateEvent } >
          { render }
        </Mutation> 
    ),
    updateCampaignContactMutation: ({ render }) => (
      <Mutation mutation={ updateCampaignContact } >
        { render }
      </Mutation> 
    ),
    updateCampaignAccountMutation: ({ render }) => (
      <Mutation mutation={ updateSingleCampaignAccount } >
        { render }
      </Mutation> 
    ),
    // contactQuery: ({ render }) => (
    //   <Query query={getCampaignContact(campaign_id, contact_id)} >
    //     { render}
    //   </Query>
    // ),
  })
  // console.log(body.split("\n").slice(0,4))
  console.log("contact_id: ", contact_id);
  console.log("campaign_id: ", campaign_id);
  // let refetchContact = null;
  return (
    <Composed>
      {({ updateEventMutation, updateCampaignContactMutation, updateCampaignAccountMutation, deleteOutboundEventByContactIdLabelMutation  }) => {
        return (
          <Card>
            <CardContent>
            {
                  event && event.id && event.label && event.label === "actionable_opportunity" &&
                  <Typography>
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
                        console.log('label: ', label)
                        const contact = data.contact[0]
                        if (contact === undefined) {
                          return null;
                        }

                        return (
                            <Query query={sailebotEventDigitalLabor(campaign_id, contact.account_id)} >
                            { ({data, loading}) => {
                              console.log('sailebotEventDigitalLabor data: ',  data)
                              if (
                                loading ||
                                !data ||
                                !data.event_aggregate ||
                                !data.event_aggregate.aggregate.count ||
                                !data.event_aggregate.aggregate
                              ) {
                                return null;
                              }
                              console.log('sailebotEventDigitalLabor data: ',  data)
                              console.log('label: ', label)
                              const digital_labor = data.event_aggregate.aggregate.count
                              if (contact === undefined) {
                                return null;
                              }
      
                              return (
                                <span><strong>Digital Labour: </strong> {digital_labor} </span>
                              );
                            }}
                          </Query>  
                        );
                      }}
                    </Query>  
                  </Typography>
              }
              <Typography><strong>CampaignId: </strong>{event.campaign_id || ''}<strong> EventId: </strong>{event.id} <strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              <Typography><strong>Subject:</strong> {subject} <strong>Cc:</strong> {cc} <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment></Typography>
              {
                <Typography>
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
                            // refetchContact = campaignAccountQuery.refetch;
        
                            return (
                              <span><strong>AccountID: {account_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'} </span>
                            );
                          }}
                        </Query>                    
                      );
                    }}
                  </Query>
                  
                }
                {
                  campaign_id && contact_id &&
                  <Query query={getCampaignContact(campaign_id, contact_id)} >
                    { ({data, loading}) => {
                      console.log('getCampaignContact data: ', data)
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
                      const { is_delisted } = data.campaign_contact[0]
                      const { is_undeliverable } = data.campaign_contact[0].contact ? data.campaign_contact[0].contact : { is_undeliverable: undefined }
                      console.log('is_undeliverable: ', is_undeliverable)


                      return (
                      <span><strong>Contact ID: {contact_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'} <strong>Deliverable:</strong> {is_undeliverable ? 'Undeliverable' : 'Deliverable'}</span>
                      );
                    }}
                  </Query>
                }                
                </Typography>
              }

              <CardActions className={classes.root}>
                <Button variant="contained" size="small" color={state.showBody ? "secondary" :  "default"} onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                <Button variant="contained" size="small" color={state.showCampaignContactEvents ? "secondary" :  "default"}onClick={handleShowCampaignContactEvents}>{!state.showCampaignContactEvents ? "View Events" : "Hide Events"}</Button>
                <Button variant="contained" size="small"  onClick={dismissClarification(updateEventMutation)}>To clarify</Button>
                {
                  // window.location.hostname === "localhost" &&
                  <Button  variant="contained" size="small" onClick={() => history.push('/app/manage-event', { event })}>Edit Event</Button>
                }
                {/* <Button  variant="contained" size="small" onClick={() => history.push('/app/events-by-campaign-contact', {client, campaign_id: event.campaign_id, contact_id: event.contact_id })}>Contact Events</Button> */}
                {
                  label === "refferal_introduction" && 
                  campaign_id && contact_id &&
                  <Query query={getCampaignContact(campaign_id, contact_id)} >
                    { ({data, loading, refetch }) => {
                      if (
                        loading ||
                        !data ||
                        !data.campaign_contact ||
                        !data.campaign_contact.length > 0 ||
                        !data.campaign_contact
                      ) {
                        return null;
                      }
                      const { to_followup, next_date, is_delisted, account_id } = data.campaign_contact[0]
                      console.log("to_followup: ", to_followup);
                      console.log("next_date: ", next_date);
                      console.log("(to_followup): ", (to_followup));
                      console.log("(next_date !== null): ", (next_date !== null));
                      console.log(" is_delisted === true: ",  is_delisted === true);

                      if ((to_followup === true && next_date !== null)) {

                        return null
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
                            const campaign_account = campaignAccountQuery.data.campaign_account[0]
                            if (is_delisted && campaign_account && campaign_account.is_delisted) {
                              return null
                            }        
                            return (
                              <Button variant="contained" size="small" onClick={() => {
                                if (to_followup === false || to_followup === undefined || next_date === null) {
                                  _followupCampaignContact_(updateCampaignContactMutation, refetch)
                                }
                              }}>Followup Contact</Button>
                            );
                          }}
                        </Query>                    
                      );
  
                    }}
                  </Query>
                  
                }
                {
                  // label === "refferal" && id && sailebot && sailebot.id && contact_id &&
                  // <Button variant="contained" size="small" onClick={() => _createActionableOpportunity_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create AO</Button>
                }

                {
                  campaign_id && contact_id &&
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
                        <Button variant="contained" size="small" onClick={() => _delistCampaignContact_(updateCampaignContactMutation, updateEventMutation )}>Remove Contact</Button>
                      );
                    }}
                  </Query>
                  
                }
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
                      const contact = data.contact[0]

                      // return (
                      //   <div style={{ flexDirection: 'row' }}>
                      //     <Button variant="contained" size="small" onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact)}>Remove Account</Button>
                      //   </div>
                      // );
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
                            // <div style={{ flexDirection: 'row' }}>
                            //   {/* <Typography><strong>AccountID: {account_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography> */}
                            //   <Button variant="contained" size="small" onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact, is_delisted, campaignAccountQuery.refetch)}>{is_delisted? "Relist" : "Delist"} Account</Button>
                            // </div>
                            <div style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                              <Button variant="contained" size="small" style={{marginRight: '1rem'}} onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact, is_delisted, campaignAccountQuery.refetch)}>{is_delisted? "Relist" : "Delist"} Account</Button>
                              {
                                label === 'actionable_opportunity' && window.location.hostname === "localhost" &&
                                <Button variant="contained" size="small" color="secondary" onClick={() => reEngage(updateCampaignAccountMutation, updateEventMutation, contact, campaignAccountQuery.refetch, updateCampaignContactMutation, deleteOutboundEventByContactIdLabelMutation)}>Re Engage</Button>
                              }
                            </div>
                          );  
                        }} 
                        </Query>
                      );           

                    }}
                  </Query>
                }

              </CardActions>
              {
                state.showBody &&
                insertBody(body)
              }
              {
                client && campaign_id && contact_id && state.showCampaignContactEvents &&
                <CampaignContactEvents client={client} contact_id={contact_id} campaign_id={campaign_id}/>
              }
            </CardContent>
          </Card>    
        );
      }}
    </Composed>
  );
};
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Moment from 'react-moment';
import { updateEvent, updateCampaignContact } from "../../graphql/mutations";
import { adopt } from 'react-adopt';
import { Mutation, Query } from "react-apollo";
import { getContactById, getCampaignContact, getCampaignAccount/*, clientEventByCampaignContact*/ } from "../../graphql/queries";
import CampaignContactEvents from '../CampaignContactEvents';
import * as moment from 'moment';
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
  })
  // console.log(body.split("\n").slice(0,4))
  console.log("contact_id: ", contact_id);
  console.log("campaign_id: ", campaign_id);
  return (
    <Composed>
      {({ updateEventMutation, updateCampaignContactMutation  }) => {
        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
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

                      return (
                      <span><strong>Contact ID: {contact_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</span>
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
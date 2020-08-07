/* eslint-disable no-unused-vars */

import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Mutation, Query } from "react-apollo";
import { updateEvent, updateContact, updateSingleCampaignAccount, updateCampaignContact } from "../../graphql/mutations";
import { getContactById, getCampaignContact } from "../../graphql/queries";
import { adopt } from 'react-adopt';
import { createreferral, createActionableOpportunity } from '../../utils/rest_api'

// const actionable_opportunity_clarification_lambda_api_endpoint = "https://8xbo18ydk7.execute-api.us-west-2.amazonaws.com/Prod/"
// const referral_clarification_lambda_api_endpoint = "https://d7quhnype6.execute-api.us-west-2.amazonaws.com/Prod/"

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event, sailebot, updateReload }) => {
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
      {({ updateEventMutation, updateContactMutation, updateCampaignAccountMutation, updateCampaignContactMutation  }) => {

        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              <Typography><strong>Subject:</strong> {subject}</Typography>
              <Typography>
                <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment>
              </Typography>
              {
                id && sailebot && sailebot.id && campaign_id && contact_id &&
                <Query query={getCampaignContact(campaign_id, contact_id)} >
                  { ({data, loading}) => {
                    console.log('data: ', data)
                    if (
                      loading ||
                      !data ||
                      !data.campaign_contact ||
                      !data.campaign_contact
                    ) {
                      return null;
                    }
                    console.log('data: ', data)
                    const { status, is_delisted} = data.campaign_contact[0]

                    return (
                      <Typography><strong>Contact Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography>
                    );
                  }}
                </Query>
                
              }
              <CardActions className={classes.root}>
                <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                <Button variant="contained" size="small" onClick={dismissClarification(updateEventMutation)}>Accept & Dismiss</Button>
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
                        !data.contact
                      ) {
                        return null;
                      }
                      const contact = data.contact[0]

                      return (
                        <Button variant="contained" size="small" onClick={() => _delistCampaignAccount_(updateCampaignAccountMutation, updateEventMutation, contact)}>Remove Account</Button>
                      );
                    }}
                  </Query>
                  
                }
                {
                  // contact_id &&
                  // <Button variant="contained" size="small" onClick={unsubscribeContact(updateContactMutation)}>Globally Unsubscribe Contact</Button>
                }
              </CardActions>
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
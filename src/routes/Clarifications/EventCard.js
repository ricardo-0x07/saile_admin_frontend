/* eslint-disable no-unused-vars */

import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import { updateEvent } from "../../graphql/mutations";
import { adopt } from 'react-adopt';
import { createreferral } from '../../utils/rest_api'

// const actionable_opportunity_clarification_lambda_api_endpoint = "https://8xbo18ydk7.execute-api.us-west-2.amazonaws.com/Prod/"
// const referral_clarification_lambda_api_endpoint = "https://d7quhnype6.execute-api.us-west-2.amazonaws.com/Prod/"

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event, sailebot }) => {
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
    } catch (error) {
      console.log('createreferral error: ', error)
    }
  }
  
  const Composed = adopt({
    updateEventMutation: ({ render }) => (
        <Mutation mutation={ updateEvent } >
          { render }
        </Mutation> 
    ),
  })
  const handleChange = async () => {
    await setState({ ...state, showBody: !state.showBody });
  }
  const dismissClarification = (updateEventMutation) => async () => {
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
  // console.log(body.split("\n").slice(0,4))
  return (
    <Composed>
      {({ updateEventMutation }) => {
        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              {/* <Typography>Label: {label} </Typography> */}
              {/* <Typography>From: {sender}</Typography> */}
              {/* <Typography>To: {to}</Typography> */}
              <Typography><strong>Subject:</strong> {subject}</Typography>
              <Typography>
                <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment>
              </Typography>
              <CardActions className={classes.root}>
                <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                <Button variant="contained" size="small" onClick={dismissClarification(updateEventMutation)}>Accept & Dismiss</Button>
                {
                  id && sailebot && sailebot.id && contact_id &&
                  <Button variant="contained" size="small" onClick={() => _createreferral_({entity: {event_id: id, sailebot_id: sailebot.id}})}>Create Referral</Button>
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
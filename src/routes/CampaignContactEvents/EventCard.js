import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Moment from 'react-moment';
import { adopt } from 'react-adopt';
import { Mutation } from "react-apollo";

import { updateCampaignContact, deleteEvent } from "../../graphql/mutations";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event, updateReload }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    showBody: false,
  });
  const {
    sender,
    subject,
    label,
    to,
    body,
    date
  } = event;
  function createMarkup(body) {
    return {__html: body};
  }
  const handleChange = async () => {
    await setState({ ...state, showBody: !state.showBody });
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
  })

  return (
    <Composed>
      {({ updateCampaignContactMutation, deleteEventMutation  }) => {

        return (
          <Card>
            <CardContent>
              <Typography>Label: {label}</Typography>
              <Typography>From: {sender}</Typography>
              <Typography>To: {to}</Typography>
              <Typography>Subject: {subject}</Typography>
              <Typography>
                <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment>
              </Typography>        
              <CardActions className={classes.root}>
                <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                {
                  label === 'sent_neutral_outbound' &&
                  <Button variant="contained" color="secondary" size="small" onClick={() =>  _reListCampaignContact_(updateCampaignContactMutation, deleteEventMutation) }>Delete Neutral Event</Button>
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
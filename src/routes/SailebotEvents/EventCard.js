import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Moment from 'react-moment';
import { updateEvent } from "../../graphql/mutations";
import { adopt } from 'react-adopt';
import { Mutation, Query } from "react-apollo";
import { getContactById, getCampaignContact, getCampaignAccount/*, clientEventByCampaignContact*/ } from "../../graphql/queries";

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
  })
  // console.log(body.split("\n").slice(0,4))
  console.log("contact_id: ", contact_id);
  console.log("campaign_id: ", campaign_id);
  return (
    <Composed>
      {({ updateEventMutation  }) => {
        return (
          <Card>
            <CardContent>
              <Typography><strong>Label: </strong>{label} <strong>From:</strong> {sender} <strong>To:</strong> {to}</Typography>
              <Typography><strong>Subject:</strong> {subject} <strong>Cc:</strong> {cc} <strong>Date:</strong> <Moment format="YYYY-MMM-DD" date={date !== null && date }></Moment></Typography>
              {/* <Typography>
                
              </Typography> */}
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
                    </Query>                    );
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
                    <Typography><strong>Contact ID: {contact_id} Status:</strong> {is_delisted ? 'De-listed' : 'Listed'}</Typography>
                    );
                  }}
                </Query>
                
              }
              <CardActions className={classes.root}>
                <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
                <Button variant="contained" size="small" onClick={dismissClarification(updateEventMutation)}>To clarify</Button>
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
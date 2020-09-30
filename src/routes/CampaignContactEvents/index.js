import * as React from "react";
import { Query } from "react-apollo";

import { EventCard } from "./EventCard";
// import { listEvents, clientEventByCampaignContact } from "../../graphql/subscription";
import { listEvents, clientEventByCampaignContact } from "../../graphql/queries";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Events = (props) => {
  console.log('campaignContactevents props: ', props);
  const classes = useStyles();
  const Composed = adopt({
    eventsSubscription: (props.location && props.locationprops.location.state && props.location.state.client && props.location.state.contact_id && props.location.state.client.id  && props.location.state.campaign_id) 
    || (props.client && props.contact_id && props.client.id  && props.campaign_id)?
    ({ render }) => (
      <Query query={
        clientEventByCampaignContact(
          (props.location && props.location.state && props.location.state.client) 
          ? props.location.state.client.id 
          : props.client.id,
          ( props.location && props.location.state &&  props.location.state.contact_id) 
          ? props.location.state.contact_id 
          : props.contact_id, 
          (props.location && props.location.state && props.location.state.campaign_id) 
          ? props.location.state.campaign_id 
          : props.campaign_id)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listEvents(10) } >
        { render }
      </Query>
    ),
  })
  return (
    <Composed>
      {({ eventsSubscription: {data, loading, refetch} }) => {
        console.log('campaignContactevents props: ', props)
        console.log('campaignContactevents data: ', data)
        console.log('campaignContactevents loading: ', loading)
        if (
          loading ||
          !data ||
          !data.event ||
          !data.event
        ) {
          return null;
        }
        const contact_id = (props.location && props.location.state && props.location.state.contact_id) ? props.location.state.contact_id : props.contact_id ? props.contact_id : null;

        return (
          <div className={classes.root}>
            <Title> {contact_id ? "ContactId: " + contact_id : ''} Events</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                (props.location && props.location.state && props.location.state.contact_id && props.location.state.client.id  && props.location.state.campaign_id )
                || (props.contact_id && props.client.id  && props.campaign_id ) ?
                data.event.filter(item => (props.location && item.contact_id === props.location.state.contact_id) || item.contact_id === props.contact_id ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id} history={props.history} updateReload={refetch}/>
                ))
                :
                data.event.filter(item => item ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id}  history={props.history} updateReload={refetch}/>
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Events
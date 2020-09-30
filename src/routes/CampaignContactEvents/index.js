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
    eventsSubscription: props.location.state && props.location.state.client && props.location.state.contact_id && props.location.state.client.id  && props.location.state.campaign_id ?
    ({ render }) => (
      <Query query={clientEventByCampaignContact(props.location.state.client.id, props.location.state.contact_id, props.location.state.campaign_id)} >
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


        return (
          <div className={classes.root}>
            <Title>Events</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.contact_id && props.location.state.client.id  && props.location.state.campaign_id ?
                data.event.filter(item => item.contact_id === props.location.state.contact_id ).map(x => (
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
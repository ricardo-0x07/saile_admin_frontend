import * as React from "react";
import { Subscription } from "react-apollo";

import { EventCard } from "./EventCard";
import { listEvents, listContactEvents } from "../../graphql/subscription";
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
  const classes = useStyles();
  const Composed = adopt({
    eventsSubscription: props.location.state && props.location.state.contact && props.location.state.contact.id ?
    ({ render }) => (
      <Subscription subscription={listContactEvents(props.location.state.contact.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listEvents(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ eventsSubscription: {data, loading} }) => {
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
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.contact  && props.location.state.contact ?
                data.event.filter(item => item.contact_id === props.location.state.contact.id ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id} history={props.history} contact={props.location.state.contact}/>
                ))
                :
                data.event.filter(item => item ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id}  history={props.history} />
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
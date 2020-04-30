import * as React from "react";
import { Query } from "react-apollo";

import { EventCard } from "./EventCard";
import { listEvents } from "../../graphql/queries";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Events = (props) => {
  const classes = useStyles();
  return (
    <Query
      query={listEvents(10)}
    >
      {({ data, loading }) => {
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
    </Query>
  );
};

export default Events
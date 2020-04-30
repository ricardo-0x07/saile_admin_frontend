import * as React from "react";
import { EventCard } from "./EventCard";
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
  console.log('props.location: ', props.location)
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
          props.location.state && props.location.state.events  &&
          props.location.state.events.map(x => (
            <EventCard event={x} name={x.name} key={x.id} history={props.history} />
          ))
        }
      </div>
    </div>
  );
};

export default Events
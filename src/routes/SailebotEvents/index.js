import * as React from "react";
import { EventCard } from "./EventCard";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { adopt } from 'react-adopt';
import { Query } from "react-apollo";
import { clientEventByLabel, totalCampaignEventsByLabel, totalCampaignEvents, clientEvent } from "../../graphql/queries";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Events = (props) => {
  const classes = useStyles();
  const limit = 5;
  let total = 5;
  
  const [state, setState] = React.useState({
    reload: false,
    page: 1
  });
  const { page } = state;
  const handleChange = (event, value) => {
    setState({ page: value})
  };
  if(props.location.state.client === undefined) {
    return null;
  }
  const Composed = adopt({
    totalCampaignEventsQuery: props.location.state && props.location.state.client && props.location.state.client.id && props.location.state.label ?
    ({ render }) => (
      <Query query={totalCampaignEventsByLabel(props.location.state.client.id, props.location.state.label)} >
        { render }
      </Query>
    )
    : ({ render }) => (
      <Query query={totalCampaignEvents(props.location.state.client.id)} >
        { render }
      </Query>
    ), 
    eventsQuery: props.location.state && props.location.state.client && props.location.state.client.id && props.location.state.label ?
    ({ render }) => (
      <Query query={clientEventByLabel(props.location.state.client.id, props.location.state.label, limit, (page-1) * limit)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={clientEvent(props.location.state.client.id, limit, (page-1) * limit) } >
        { render }
      </Query>
    ),
  })

  console.log('props.location: ', props.location)
  return (
    <Composed>
      {({ totalCampaignEventsQuery, eventsQuery }) => {
        console.log('totalCampaignEventsQuery: ', totalCampaignEventsQuery)
        console.log('eventsQuery: ', eventsQuery)
        if (
          eventsQuery.loading ||
          !eventsQuery.data ||
          !eventsQuery.data.event ||
          !eventsQuery.data.event
        ) {
          return null;
        }

        if (!totalCampaignEventsQuery.loading) {
          console.log('totalCampaignEventsQuery: ', totalCampaignEventsQuery)
          total =  Math.ceil(totalCampaignEventsQuery.data.event_aggregate.aggregate.count/limit)
        }

        return (
          <div className={classes.root}>
            <Title>{props.location.state.label ? props.location.state.label.replace('_', ' ').toUpperCase() : ""} EVENTS</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                eventsQuery.data.event.map(x => (
                  <EventCard 
                    event={x} name={x.name} key={x.id} history={props.history} 
                    updateReload={() => {
                      eventsQuery.refetch();
                      totalCampaignEventsQuery.refetch()
                    }}
                  />
                ))
              }
            </div>
              <div className={classes.root}>
                <Pagination count={total} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
              </div>
            </div>  
        );
      }}
    </Composed>
  );
};

export default Events
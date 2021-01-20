import * as React from "react";
import { EventCard } from "./EventCard";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { adopt } from 'react-adopt';
import { Query } from "react-apollo";
import { clientEventByLabel, totalCampaignEventsByLabel, clientNutureEventByLabel, totalCampaignEvents, clientEvent } from "../../graphql/queries";
import { CSVLink } from "react-csv";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Events = (props) => {
  console.log("sailebot events props: ", props)
  console.log("sailebot events props.history: ", props.history)
  const classes = useStyles();
  const limit = 5;
  let total = 5;
  // const is_ao = false;
  
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
      <Query query={totalCampaignEventsByLabel(props.location.state.client.id, props.location.state.label, props.location.state.label !== 'refferal_introduction')} >
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
      <Query query={clientEventByLabel(props.location.state.client.id, props.location.state.label, limit, (page-1) * limit, props.location.state.label !== 'refferal_introduction')} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={clientEvent(props.location.state.client.id, limit, (page-1) * limit) } >
        { render }
      </Query>
    ),
    nurtureEventsQuery:  props.location.state && props.location.state.client && props.location.state.client.id && props.location.state.label  && props.location.state.label === 'refferal' ?
    ({ render }) => (
      <Query query={clientNutureEventByLabel(props.location.state.client.id, props.location.state.label, true) } >
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
  let nurtureData = [];
  return (
    <Composed>
      {({ totalCampaignEventsQuery, eventsQuery, nurtureEventsQuery }) => {
        console.log('totalCampaignEventsQuery: ', totalCampaignEventsQuery)
        console.log('eventsQuery: ', eventsQuery)
        console.log('nurtureEventsQuery: ', nurtureEventsQuery)
        if (nurtureEventsQuery && nurtureEventsQuery.data && nurtureEventsQuery.data.event.length > 0) {

          nurtureData = nurtureEventsQuery.data.event.map(nut => {
            const { body, cc, id, date, label, contact } = nut;
            const { account: { name, address }, email, firstname, lastname, title } = contact;
            return {
              body, cc, id, date, label,
              name, address,
              email, firstname, lastname, title
            }
          })
          
        }
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
        console.log('total: ', total)
        console.log('props.location.state.label: ', props.location.state.label)
        console.log('nurtureData: ', nurtureData)

        return (
          <div className={classes.root}>
            <Title>{totalCampaignEventsQuery && totalCampaignEventsQuery.data && totalCampaignEventsQuery.data.event_aggregate && totalCampaignEventsQuery.data.event_aggregate.aggregate.count ? totalCampaignEventsQuery.data.event_aggregate.aggregate.count : 0} {props.location.state.label ? props.location.state.label.replace('_', ' ').toUpperCase() : ""} EVENTS</Title>
            {
              props.location.state.label === 'refferal' && nurtureData.length > 0 &&
              <CSVLink
                data={nurtureData}
                filename={`${props.location.state.label ? props.location.state.label : ""}_events.csv`}
                className="btn btn-primary"
                target="_blank"
              >
                Download Nuture Data CSV
              </CSVLink>
            }
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
                    client={props.location.state.client}
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
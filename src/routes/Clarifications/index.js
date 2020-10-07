
import * as React from "react";
import { Query } from "react-apollo";
import Pagination from '@material-ui/lab/Pagination';
import { EventCard } from "./EventCard";
import { listClarificationEvents, listClientClarificationEvents, listCampaignClarificationEvents, totalCampaignClarificationEvents, totalClientClarificationEvents } from "../../graphql/queries";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
// import { createreferral } from '../../utils/rest_api'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Events = (props) => {
  console.log("props: ", props)

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
  // const updateReload = () => {
  //   setState({ 
  //     reload: !reload,
  //     page
  //   })
  // };
  const Composed = adopt({
    totalCampaignClarificationEventsSubscription: ({ render }) => props.location.state.campaign && props.location.state.campaign.id !== undefined
    ? (
      <Query query={totalCampaignClarificationEvents(props.location.state.campaign.id)} >
        { render }
      </Query>
    )
    :
    (
      <Query query={totalClientClarificationEvents(props.location.state.client.id)} >
        { render }
      </Query>
    ), 
    eventsSubscription: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Query query={listCampaignClarificationEvents(props.location.state.campaign.id, limit, (page-1) * limit)} >
        { render }
      </Query>
    )
    :
    props.location.state && props.location.state.client && props.location.state.client.id ?
    ({ render }) => (
      <Query query={listClientClarificationEvents(props.location.state.client.id, limit, (page-1) * limit)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listClarificationEvents(limit, (page-1) * limit) } >
        { render }
      </Query>
    ),
  })
  console.log('page: ', page);

  return (
    <Composed>
      {({ eventsSubscription: {data, loading, refetch}, totalCampaignClarificationEventsSubscription }) => {
        if (
          loading ||
          !data ||
          !data.event ||
          !data.event
        ) {
          return null;
        }

        if (!totalCampaignClarificationEventsSubscription.loading) {
          console.log('totalCampaignClarificationEventsSubscription: ', totalCampaignClarificationEventsSubscription)
          total =  Math.ceil(totalCampaignClarificationEventsSubscription.data.event_aggregate.aggregate.count/limit)
        }

        return (
          <div className={classes.root}>
            <Title>{props.location && props.location.state && props.location.state.name ? props.location.state.name : ''} Clarifications</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location && props.location.state && (props.location.state.campaign || props.location.state.client) ?
                data.event.map(x => (
                  <EventCard updateReload={() => {
                    refetch();
                    totalCampaignClarificationEventsSubscription.refetch()
                  }} event={x} name={x.name} key={x.id} history={props.history}  />
                ))
                :
                data.event.filter(item => item ).map(x => (
                  <EventCard updateReload={() => {
                    refetch();
                    totalCampaignClarificationEventsSubscription.refetch()
                  }} event={x} name={x.name} key={x.id}  history={props.history} />
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
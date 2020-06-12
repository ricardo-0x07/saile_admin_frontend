
import * as React from "react";
import { Subscription } from "react-apollo";
import Pagination from '@material-ui/lab/Pagination';
import { EventCard } from "./EventCard";
import { listClarificationEvents, listCampaignClarificationEvents } from "../../graphql/subscription";
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
  let limit = 5;
  // const REACT_APP_SENDGRID_API_KEY = process.env.REACT_APP_SENDGRID_API_KEY;
  // const REACT_APP_MAILGUN_API_KEY = process.env.REACT_APP_MAILGUN_API_KEY;
  // const REACT_APP_PRIVATE_API_KEY = process.env.REACT_APP_PRIVATE_API_KEY;

  // console.log('process.env: ', process.env)
  // console.log('REACT_APP_SENDGRID_API_KEY: ', REACT_APP_SENDGRID_API_KEY)
  // console.log('REACT_APP_MAILGUN_API_KEY: ', REACT_APP_MAILGUN_API_KEY)
  // console.log('REACT_APP_PRIVATE_API_KEY: ', REACT_APP_PRIVATE_API_KEY)
  
  
  

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const Composed = adopt({
    eventsSubscription: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listCampaignClarificationEvents(props.location.state.campaign.id, limit, (page-1) * limit)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listClarificationEvents(limit, (page-1) * limit) } >
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
            <Title>Clarifications</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                data.event.filter(item => item.campaign_id === props.location.state.campaign.id ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id} history={props.history} campaign={props.location.state.campaign}/>
                ))
                :
                data.event.filter(item => item ).map(x => (
                  <EventCard event={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
            <div className={classes.root}>
              <Pagination count={limit} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Events
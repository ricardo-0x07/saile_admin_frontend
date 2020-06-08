import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { adopt } from 'react-adopt';
import { Subscription } from "react-apollo";


import { sailebotEventCountByLabel, sailebotEventCount } from "../../graphql/subscription";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export const SaileBotCard = ({ sailebot, client,  history }) => {
  const classes = useStyles();
  const {name, fullname} = sailebot;
  const Composed = adopt({
    actionableEventCountQuery: ({ render }) => (
      <Subscription subscription={sailebotEventCountByLabel(sailebot.id, "actionable_opportunity")} >
        { render }
      </Subscription>
    ),
    referralEventCountQuery: ({ render }) => (
      <Subscription subscription={sailebotEventCountByLabel(sailebot.id, "refferal_thanks")} >
        { render }
      </Subscription>
    ),
    neutralEventCountQuery: ({ render }) => (
      <Subscription subscription={sailebotEventCountByLabel(sailebot.id, "sent_neutral_outbound")} >
        { render }
      </Subscription>
    ),
    sailebotEventCountQuery: ({ render }) => (
      <Subscription subscription={sailebotEventCount(sailebot.id)} >
        { render }
      </Subscription>
    ),
  })

  return (
    <Composed>
      {({ actionableEventCountQuery, referralEventCountQuery, sailebotEventCountQuery, neutralEventCountQuery }) => {
        // if (
        //   loading ||
        //   !data
        // ) {
        //   return null;
        // }
        return (
          <Card>
            <CardContent>
              <Typography>{fullname || name}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-sailebot', {sailebot, client})}>Edit</Button>
                <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-requirement', {sailebot})}>Add Requirement</Button>
                <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-domain', {sailebot})}>Add Domain</Button>
                <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/requirements-by-sailebot', {sailebot})}>View Requirements</Button>
                <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/domains-by-sailebot', {sailebot})}>View Domains</Button>
              </CardActions>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  sailebotEventCountQuery.data && 
                  sailebotEventCountQuery.data.event_aggregate &&
                  sailebotEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-sailebot', {sailebot, events: sailebotEventCountQuery.data.event_aggregate.nodes })}>Digital Labor: <br/> {sailebotEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  referralEventCountQuery.data && 
                  referralEventCountQuery.data.event_aggregate &&
                  referralEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-sailebot', {sailebot, events: referralEventCountQuery.data.event_aggregate.nodes })}>Referral Events: <br/> {referralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  actionableEventCountQuery.data && 
                  actionableEventCountQuery.data.event_aggregate &&
                  actionableEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-sailebot', {sailebot, events: actionableEventCountQuery.data.event_aggregate.nodes })}>Actionable Events: <br/> {actionableEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  neutralEventCountQuery.data && 
                  neutralEventCountQuery.data.event_aggregate &&
                  neutralEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-sailebot', {sailebot, events: neutralEventCountQuery.data.event_aggregate.nodes })}>Neutral Events: <br/> {neutralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
              </CardActions>
            </div>
          </Card>    
        );
        }
      }
    </Composed>
  );
};
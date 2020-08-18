import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { adopt } from 'react-adopt';
import { Query } from "react-apollo";

import { clientEventCountByLabel, clientEventCount } from "../../graphql/queries";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const ClientCard = ({ client,  history }) => {
  const classes = useStyles();
  const { firstname, lastname, company } = client;
  const Composed = adopt({
    actionableEventCountQuery: ({ render }) => (
      <Query query={clientEventCountByLabel(client.id, "actionable_opportunity")} >
        { render }
      </Query>
    ),
    referralEventCountQuery: ({ render }) => (
      <Query query={clientEventCountByLabel(client.id, "refferal_thanks")} >
        { render }
      </Query>
    ),
    clientEventCountQuery: ({ render }) => (
      <Query query={clientEventCount(client.id)} >
        { render }
      </Query>
    ),
  })

  return (
    <Composed>
      {({ actionableEventCountQuery, referralEventCountQuery, clientEventCountQuery }) => {
        return (
          <Card>
            <CardContent>
              <Typography>Client: {firstname} {lastname}</Typography>
              <Typography>Company: {company && company.name ? company.name : ''}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-client', {client})}>Edit</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-sailebot', {client})}>Add SaileBot</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/sailebots-by-client', {client})}>View SaileBots</Button>
              </CardActions>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  clientEventCountQuery.data && 
                  clientEventCountQuery.data.event_aggregate &&
                  clientEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-client', {client, events: clientEventCountQuery.data.event_aggregate.nodes })}>Digital Labor: <br/> {clientEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  referralEventCountQuery.data && 
                  referralEventCountQuery.data.event_aggregate &&
                  referralEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-client', {client, events: referralEventCountQuery.data.event_aggregate.nodes })}>Referral Events: <br/> {referralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  actionableEventCountQuery.data && 
                  actionableEventCountQuery.data.event_aggregate &&
                  actionableEventCountQuery.data.event_aggregate.aggregate &&
                  <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-client', {client, events: actionableEventCountQuery.data.event_aggregate.nodes })}>Actionable Events: <br/> {actionableEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
              </CardActions>
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};
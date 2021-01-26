import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { adopt } from 'react-adopt';
import { Query } from "react-apollo";

import { clientEventCountByLabel, clientEventCount } from "../../graphql/queries";
import PrivateRoutesConfig from '../../utils/PrivateRoutesConfig';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const ClientCard = ({ admin, client,  history }) => {
  const classes = useStyles();
  const { firstname, lastname, company } = client;
  const allowed = PrivateRoutesConfig.reduce((acc, item) =>{
    acc[`/app${item["path"]}`] = item['permission']
    return acc
  }, {})
  console.log("allowed: ", allowed)
  console.log("window.location: ", window.location)
  const Composed = adopt({
    actionableEventCountQuery: ({ render }) => (
      <Query query={clientEventCountByLabel(client.id, "actionable_opportunity")} >
        { render }
      </Query>
    ),
    referralEventCountQuery: ({ render }) => (
      <Query query={clientEventCountByLabel(client.id, "refferal", true)} >
        { render }
      </Query>
    ),
    referralIntroductionEventCountQuery: ({ render }) => (
      <Query query={clientEventCountByLabel(client.id, "refferal_introduction")} >
        { render }
      </Query>
    ),
    clientEventCountQuery: ({ render }) => (
      <Query query={clientEventCount(client.id)} >
        { render }
      </Query>
    ),
  })
  console.log("admin.user.role: ", admin.user.role)
  console.log("allowed['/app/manage-sailebot'].includes(): ", allowed[window.location.pathname].includes(admin.user.role))

  return (
    <Composed>
      {({ actionableEventCountQuery, referralEventCountQuery, clientEventCountQuery, referralIntroductionEventCountQuery }) => {
        console.log("actionableEventCountQuery: ", actionableEventCountQuery)
        return (
          <Card>
            <CardContent>
              <Typography>ClientId: {client.id}</Typography>
              <Typography>Client: {firstname} {lastname}</Typography>
              <Typography>Company: {company && company.name ? company.name : ''}</Typography>
              <Typography>City: {client && client.city ? client.city : ''}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                <Button 
                  variant="contained" 
                  disabled={!(admin && admin.user && admin.user.role && allowed['/app/manage-client'] && allowed['/app/manage-client'].includes(admin.user.role))}
                  size="small" 
                  style={{ width: '100%'}} 
                  onClick={() => history.push('/app/manage-client', {client})}>Edit</Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  style={{ width: '100%'}} 
                  disabled={!(admin && admin.user && admin.user.role && allowed['/app/manage-sailebot'] && allowed['/app/manage-sailebot'].includes(admin.user.role))}
                  onClick={() => history.push('/app/manage-sailebot', {client})}>Add SaileBot</Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  style={{ width: '100%'}} 
                  disabled={!(admin && admin.user && admin.user.role && allowed['/app/sailebots-by-client'] && allowed['/app/sailebots-by-client'].includes(admin.user.role))}
                  onClick={() => history.push('/app/sailebots-by-client', {client, company})}>View SaileBots</Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  style={{ width: '100%'}} 
                  disabled={!(admin && admin.user && admin.user.role && allowed['/app/questionnaires-by-client'] && allowed['/app/questionnaires-by-client'].includes(admin.user.role))}
                  onClick={() => history.push('/app/questionnaires-by-client', {client})}>View Questionnaires</Button>
              </CardActions>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  client &&
                  <Button
                    variant="contained" 
                    disabled={!(admin && admin.user && admin.user.role && allowed['/app/clarifications-by-campaign'] && allowed['/app/clarifications-by-campaign'].includes(admin.user.role))}
                    style={{ width: '100%', marginBottom: '1rem'}}
                    size="small"
                    onClick={() => history.push('/app/clarifications-by-campaign', {client, company, name: 'Client'})}
                  >Clarifications</Button>
                }
                {
                  clientEventCountQuery.data && 
                  clientEventCountQuery.data.event_aggregate &&
                  clientEventCountQuery.data.event_aggregate.aggregate &&
                  <Button
                    variant="contained"
                    size="small" style={{ width: '100%'}}
                    disabled={!(admin && admin.user && admin.user.role && allowed['/app/events-by-client'] && allowed['/app/events-by-client'].includes(admin.user.role))}
                    onClick={() => history.push('/app/events-by-client', {client })}>Digital Labor: <br/> {clientEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  referralEventCountQuery.data && 
                  referralEventCountQuery.data.event_aggregate &&
                  referralEventCountQuery.data.event_aggregate.aggregate &&
                  <Button
                    variant="contained"
                    size="small" style={{ width: '100%'}}
                    disabled={!(admin && admin.user && admin.user.role && allowed['/app/events-by-client'] && allowed['/app/events-by-client'].includes(admin.user.role))}
                    onClick={() => history.push('/app/events-by-client', {client, label: 'refferal' })}>Referral Events: <br/> {referralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  referralIntroductionEventCountQuery.data && 
                  referralIntroductionEventCountQuery.data.event_aggregate &&
                  referralIntroductionEventCountQuery.data.event_aggregate.aggregate &&
                  <Button
                    variant="contained"
                    size="small" style={{ width: '100%'}}
                    disabled={!(admin && admin.user && admin.user.role && allowed['/app/events-by-client'] && allowed['/app/events-by-client'].includes(admin.user.role))}
                    onClick={() => history.push('/app/events-by-client', {client, label: 'refferal_introduction' })}>Referral Introduction Events: <br/> {referralIntroductionEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  actionableEventCountQuery.data && 
                  actionableEventCountQuery.data.event_aggregate &&
                  actionableEventCountQuery.data.event_aggregate.aggregate &&
                  <Button
                    variant="contained"
                    size="small" style={{ width: '100%'}}
                    disabled={!(admin && admin.user && admin.user.role && allowed['/app/events-by-client'] && allowed['/app/events-by-client'].includes(admin.user.role))}
                    onClick={() => history.push('/app/events-by-client', {client, label: 'actionable_opportunity' })}>Actionable Events: <br/> {actionableEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }

              </CardActions>
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};
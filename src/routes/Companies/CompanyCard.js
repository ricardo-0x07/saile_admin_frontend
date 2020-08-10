import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { adopt } from 'react-adopt';
// import { Query } from "react-apollo";

// import { companyEventCountByLabel, companyEventCount } from "../../graphql/queries";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const CompanyCard = ({ company,  history }) => {
  const classes = useStyles();
  const {name } = company;
  // const Composed = adopt({
  //   actionableEventCountQuery: ({ render }) => (
  //     <Query query={companyEventCountByLabel(company.id, "actionable_opportunity")} >
  //       { render }
  //     </Query>
  //   ),
  //   referralEventCountQuery: ({ render }) => (
  //     <Query query={companyEventCountByLabel(company.id, "refferal_thanks")} >
  //       { render }
  //     </Query>
  //   ),
  //   companyEventCountQuery: ({ render }) => (
  //     <Query query={companyEventCount(company.id)} >
  //       { render }
  //     </Query>
  //   ),
  // })

  return (
    // <Composed>
    //   {({ actionableEventCountQuery, referralEventCountQuery, companyEventCountQuery }) => {
    //     return (
          <Card>
            <CardContent>
              <Typography>Company: {name}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-company', {company})}>Edit</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-client', {company})}>Add Client</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/clients-by-company', {company})}>View Clients</Button>
              </CardActions>
              {/* <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  // companyEventCountQuery.data && 
                  // companyEventCountQuery.data.event_aggregate &&
                  // companyEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-company', {company, events: companyEventCountQuery.data.event_aggregate.nodes })}>Digital Labor: <br/> {companyEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  // referralEventCountQuery.data && 
                  // referralEventCountQuery.data.event_aggregate &&
                  // referralEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-company', {company, events: referralEventCountQuery.data.event_aggregate.nodes })}>Referral Events: <br/> {referralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  // actionableEventCountQuery.data && 
                  // actionableEventCountQuery.data.event_aggregate &&
                  // actionableEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-company', {company, events: actionableEventCountQuery.data.event_aggregate.nodes })}>Actionable Events: <br/> {actionableEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
              </CardActions> */}
            </div>
          </Card>
    //     );
    //   }}
    // </Composed>
  );
};
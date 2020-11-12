import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { adopt } from 'react-adopt';
import { Mutation } from "react-apollo";

// import { companyEventCountByLabel, companyEventCount } from "../../graphql/queries";

import { makeStyles } from '@material-ui/core/styles';
import { updateCompany } from "../../graphql/mutations";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const CompanyCard = ({ company,  history }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    to_suppress: company.to_suppress,
  });
  const {name, id } = company;
  // const { to_suppress } = state;

  const Composed = adopt({
    updateCompanyMutation: ({ render }) => (
      <Mutation mutation={ updateCompany } >
        { render }
      </Mutation> 
      ),  
  })
  const handleChange = (updateCompanyMutation) => async (event) => {
    const { id } = company;
    console.log('event.target.name: ', event.target.name)
    console.log('event.target.value: ', event.target.value)
    console.log('event.target.checked: ', event.target.checked)
    const to_suppress = event.target.checked
    await setState({ ...state, [event.target.name]: to_suppress });
    console.log('to_suppress: ', to_suppress)
    console.log('state: ', state)
    // updateCompanyMutation
    await updateCompanyMutation({
      variables: {
          objects: {
              id,
              to_suppress,
          },
          id
      }
  });

  };
  return (
    <Composed>
      {({ updateCompanyMutation }) => {
        return (
          <Card>
            <CardContent>
              <Typography>Company ID: {id}</Typography>
              <Typography>Company: {name}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-company', {company})}>Edit</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-client', {company})}>Add Client</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/clients-by-company', {company})}>View Clients</Button>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/domains-by-company', {company})}>View Domains</Button>
                <FormControlLabel
                    control={
                      <Switch
                        checked={state.to_suppress}
                        onChange={handleChange(updateCompanyMutation)}
                        name="to_suppress"
                        color="primary"
                      />
                    }
                    label="Suppression?"
                  />
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
        );
      }}
    </Composed>
  );
};
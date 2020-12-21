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
import CardMedia from '@material-ui/core/CardMedia';
import LogoFileUpload from './LogoFileUpload'



// import { companyEventCountByLabel, companyEventCount } from "../../graphql/queries";

import { makeStyles } from '@material-ui/core/styles';
import { updateCompany } from "../../graphql/mutations";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
// const styles = 
// {

// media: {
//   height: 0,
//   paddingTop: '56.25%', // 16:9,
//   marginTop:'30'
// }
//   };

export const CompanyCard = ({ company,  history, refetch }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    to_suppress: company.to_suppress,
  });
  const {name, id, logo } = company;
  // const { to_suppress } = state;
  console.log("logo.split('/'): ", logo.split('/', 4).join('/'))

  const Composed = adopt({
    updateCompanyMutation: ({ render }) => (
      <Mutation mutation={ updateCompany } >
        { render }
      </Mutation> 
      ),  
  })
  const updateLogo = (updateCompanyMutation) => async (filename) => {
    const { id, logo } = company;
    const logo_base = logo.split('/', 4).join('/')
    const updated_logo = `${logo_base}/${filename}`
    // updateCompanyMutation
    await updateCompanyMutation({
      variables: {
          objects: {
              logo: updated_logo,
          },
          id
      }
    });
    refetch()
  }
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
    refetch()
  };
  return (
    <Composed>
      {({ updateCompanyMutation }) => {
        return (
          <Card>
            {/* <CardMedia
              className={classes.media}
              image={logo}
              title="Company Logo"
              style={{height: 0, width: 'auto', paddingTop: '66.25%'}}
            /> */}
            <CardMedia style={{height: '10%', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
             <img src={logo} alt="Company Logo" width='10%' style={{ alignSelf: 'center', margin: 'auto' }}/>
            </CardMedia>

            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography>{name} </Typography>
              <Typography>ID: {id}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column'}} className={classes.root}>
                <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-company', {company})}>Edit</Button>
                {/* <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/manage-client', {company})}>Add Client</Button> */}
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/clients-by-company', {company})}>Clients</Button>
                  <Button variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/domains-by-company', {company})}>Domains</Button>
                </div>
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
                {
                  name &&
                  <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <LogoFileUpload 
                      id={id}
                      name={ 
                        `Logo Upload`
                      }
                      updateLogo={updateLogo(updateCompanyMutation)}
                    />                  
                  </div>
                }
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
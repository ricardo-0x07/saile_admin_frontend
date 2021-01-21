import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Formik, useField } from 'formik';
import { adopt } from 'react-adopt';
import {
    TextField,
    // FormControlLabel,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";

import { createAccount, createCampaignAccount, updateAccount } from "../../graphql/mutations";

export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);

  return (
    <MuiCheckbox {...field} checked={field.value} />
  );
};



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventEditDialog(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let initialValues = {
      name: '',
      address: '',
      domain: '',
      email: '',
      employees: '',
      fax: '',
      phone: '',
      revenue: '',
      state  : '',
      website  : '',
      email_domain: '',
      NAICS: '',
      city: '',
      country: '',
      is_scheduled: false
  };
    console.log('location: ', location);
    console.log('history: ', history);

    if ( props && props.account) {
        initialValues = props.account
    } else {
        if ( props && props.campaign && props.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.campaign.id
            };
        }
    }

    const Composed = adopt({
      mutation: ({ render }) => (
          <Mutation
              mutation={
                  props && props.account 
                  ? updateAccount 
                  : createAccount
              }
          >
              {render}
          </Mutation> 
      ),
      createCampaignAccountMutation: ({ render }) => (
          <Mutation
              mutation={createCampaignAccount}
          >
              {render}
          </Mutation> 
      ),
    })

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.name}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.name}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Composed>
            { 
                ({mutation, createCampaignAccountMutation}) => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                    name,
                                    address,
                                    domain,
                                    email,
                                    employees,
                                    fax,
                                    phone,
                                    revenue,
                                    website,
                                    email_domain,
                                    NAICS,
                                    state,
                                    city,
                                    country,
                                    is_scheduled,
                                    schedule_id,
                                    campaign_id,
                                    id,
                                }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                address,
                                                domain,
                                                email,
                                                employees,
                                                fax,
                                                phone,
                                                revenue,
                                                website,
                                                email_domain,
                                                NAICS,
                                                state,
                                                city,
                                                country,
                                                is_scheduled,
                                                schedule_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                name,
                                                address,
                                                domain,
                                                email,
                                                employees,
                                                fax,
                                                phone,
                                                revenue,
                                                website,
                                                email_domain,
                                                NAICS,
                                                state,
                                                city,
                                                country,
                                                is_scheduled,
                                                schedule_id,
                                            }
                                        }
                                    });

                                    await createCampaignAccountMutation({
                                        variables: {
                                            objects: {
                                                account_id: response.data.insert_account.returning[0].id,
                                                campaign_id,
                                            }
                                        }
                                    });

                                }
                      
                                handleClose()
                                props.updateReload()
                                
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{width: '100%', flex: 1}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Account Edit</FormLabel>
                                <FormGroup aria-label="position" >
                                    <TextField
                                        name="name"
                                        label="Name" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.name || ''}
                                    />
                                    <TextField
                                        name="address"
                                        label="Address" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.address || ''}
                                    />
                                    <TextField
                                        name="email"
                                        label="Email" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.email || ''}
                                    />
                                    <TextField
                                        name="email_domain"
                                        label="Email domain" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.email_domain || ''}
                                    />
                                    <TextField
                                        name="employees"
                                        label="Employees" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.employees || ''}
                                    />
                                    <TextField
                                        name="phone"
                                        label="Phone" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.phone || ''}
                                    />
                                    {/* <TextField
                                        name="fax"
                                        label="Fax" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.fax || ''}
                                    /> */}
                                    <TextField
                                        name="revenue"
                                        label="Revenue" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.revenue || ''}
                                    />
                                    <TextField
                                        name="street"
                                        label="Street" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.street || ''}
                                    />
                                    <TextField
                                        name="city"
                                        label="City" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.city || ''}
                                    />
                                    <TextField
                                        name="state"
                                        label="State" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.state || ''}
                                    />
                                    <TextField
                                        name="country"
                                        label="Country" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.country || ''}
                                    />
                                    {/* <TextField
                                        name="NAICS"
                                        label="NAICS" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.NAICS || ''}
                                    /> */}
                                    <TextField
                                        name="website"
                                        label="Website" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.website || ''}
                                    />
                                    {/* <TextField
                                        name="domain"
                                        label="Domain" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.domain || ''}
                                    />
                                        <FormControlLabel
                                        label="Is Scheduled?"
                                        control={
                                            <Checkbox name="is_scheduled" onChange={handleChange} value={values.is_scheduled} />
                                        } 
                                    />*/}
                                </FormGroup>
                            </FormControl>
                            <Button variant="contained" type='submit' style={{textAlign: 'inherit'}}>Submit</Button>
                        </form>
                        )}
                    </Formik>
                )
            }
        </Composed>
      </Dialog>
    </div>
  );
}

import React, { useEffect, useReducer } from "react";
import { Formik, Form, Field, useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import {
    TextField,
    TextareaAutosize,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Switch,
    Slider,
    Grid,
} from '@material-ui/core';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { createAccount, createCampaignAccount, updateAccount } from "../../graphql/mutations";

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
}));
export const Checkbox = ({ ...props }) => {
    const [field] = useField(props.name);
  
    return (
      <MuiCheckbox {...field} checked={field.value} />
    );
};

const ManageAccountForm = (props) => {
    const classes = useStyles();
    console.log('props: ', props)
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
    if ( props.location.state && props.location.state.account) {
        initialValues = props.location.state.account
    } else {
        if ( props.location.state && props.location.state.campaign && props.location.state.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.location.state.campaign.id
            };
        }
    }
    const Composed = adopt({
        mutation: ({ render }) => (
            <Mutation
                mutation={
                    props.location.state && props.location.state.account 
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
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit campaign_id: ', campaign_id)
                                if (id) {
                                    const response = await mutation({
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
                                    console.log('update response: ', response);
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
                                    console.log('create response: ', response);

                                    const response2 = await createCampaignAccountMutation({
                                        variables: {
                                            objects: {
                                                account_id: response.data.insert_account.returning[0].id,
                                                campaign_id,
                                            }
                                        }
                                    });
                                    console.log('createCampaignAccountMutation response2: ', response2);

                                }
                      
                                
                                props.history.push('/accounts-by-campaign', {campaign: props.location.state.campaign})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Account Creation/Update</FormLabel>
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
                                    <TextField
                                        name="fax"
                                        label="Fax" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.fax || ''}
                                    />
                                    <TextField
                                        name="revenue"
                                        label="Revenue" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.revenue || ''}
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
                                        name="city"
                                        label="City" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.city || ''}
                                    />
                                    <TextField
                                        name="country"
                                        label="Country" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.country || ''}
                                    />
                                    <TextField
                                        name="NAICS"
                                        label="NAICS" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.NAICS || ''}
                                    />
                                    <TextField
                                        name="website"
                                        label="Website" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.website || ''}
                                    />
                                    <TextField
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
                                    />
                                </FormGroup>
                            </FormControl>
                            <Button variant="contained" type='submit'>Submit</Button>
                        </form>
                        )}
                    </Formik>
                )
            }
        </Composed>
    );
}

export default ManageAccountForm
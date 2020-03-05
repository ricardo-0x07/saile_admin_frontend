import React, { useEffect, useReducer } from "react";
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
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

import { createAccount, updateAccount } from "../../graphql/mutations";

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
    };
    if ( props.location.state && props.location.state.account) {
        initialValues = props.location.state.account
    } else {
        if ( props.location.state && props.location.state.sailebot && props.location.state.sailebot.id) {
            initialValues = {
                ...initialValues,
                sailebot_id: props.location.state.sailebot.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.account ? updateAccount : createAccount}
        >
            { 
                mutation => (
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
                                    state,
                                    website,
                                    sailebot_id,
                                    id,
                                }) => {
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit sailebot_id: ', sailebot_id)
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
                                                sailebot_id,
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
                                                sailebot_id,
                                            }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                      
                                
                                props.history.push('/accounts-by-sailebot', {sailebot: props.location.state.sailebot})
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
                                        value={values.name}
                                    />
                                    <TextField
                                        name="address"
                                        label="Address" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.address}
                                    />
                                    <TextField
                                        name="email"
                                        label="Email" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    <TextField
                                        name="employees"
                                        label="Employees" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.employees}
                                    />
                                    <TextField
                                        name="phone"
                                        label="Phone" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                    <TextField
                                        name="fax"
                                        label="Fax" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.fax}
                                    />
                                    <TextField
                                        name="revenue"
                                        label="Revenue" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.revenue}
                                    />
                                    <TextField
                                        name="state"
                                        label="State" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.state}
                                    />
                                    <TextField
                                        name="website"
                                        label="Website" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.website}
                                    />
                                    <TextField
                                        name="domain"
                                        label="Domain" 
                                        variant="filled" 
                                        margin="normal" 
                                        onChange={handleChange}
                                        value={values.domain}
                                    />
                                </FormGroup>
                            </FormControl>
                            <Button variant="contained" type='submit'>Submit</Button>
                        </form>
                        )}
                    </Formik>
                )
            }
        </Mutation>
    );
}

export default ManageAccountForm
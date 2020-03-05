// import 'date-fns';
import React, { useEffect, useReducer } from "react";
import { Formik, Form, Field, useField } from 'formik';
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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { createContact, updateContact } from "../../graphql/mutations";



const DatePickerField = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
  
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                clearable
                disablePast
                name={field.name}
                value={field.value}
                format="ddd/MMM/YYYY"
                helperText={currentError}
                label={field.label}
                error={Boolean(currentError)}
                onError={error => {
                // handle as a side effect
                if (error !== currentError) {
                    form.setFieldError(field.name, error);
                }
                }}
                // if you are using custom validation schema you probably want to pass `true` as third argument
                onChange={date => form.setFieldValue(field.name, date, false)}
                {...other}
            />
        </MuiPickersUtilsProvider>
    );
};
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
  
const ManageContactForm = (props) => {
    const classes = useStyles();

    
    console.log('props: ', props)
    let initialValues = {
        account_id: '',
        bounce_type: '',
        email: '',
        fax: '',
        first_outbound_done: false,
        firstname: '',
        gender: '',
        id: '',
        is_ema_eligible: false,
        is_eva_eligible: false,
        is_referral: false,
        lastname: '',
        member_status: '',
        phone: '',
        position: '',
        role: '',
        sam_status: '',
        second_outbound_done: false,
        source: '',
        title: '',
        to_followup: false,
    };
    if ( props.location.state && props.location.state.contact) {
        initialValues = props.location.state.contact
    } else {
        if ( props.location.state && props.location.state.account && props.location.state.account.id) {
            initialValues = {
                ...initialValues,
                account_id: props.location.state.account.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.contact ? updateContact : createContact}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                bounce_type,
                                email,
                                fax,
                                first_outbound_done,
                                firstname,
                                gender,
                                is_ema_eligible,
                                is_eva_eligible,
                                is_referral,
                                lastname,
                                member_status,
                                phone,
                                position,
                                role,
                                sam_status,
                                second_outbound_done,
                                source,
                                title,
                                to_followup,
                                account_id,
                                id
                            }) => {
                                console.log('onSubmit account_id: ', account_id)
                                if (id) {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                bounce_type,
                                                email,
                                                fax,
                                                first_outbound_done,
                                                firstname,
                                                gender,
                                                is_ema_eligible,
                                                is_eva_eligible,
                                                is_referral,
                                                lastname,
                                                member_status,
                                                phone,
                                                position,
                                                role,
                                                sam_status,
                                                second_outbound_done,
                                                source,
                                                title,
                                                to_followup,
                                                account_id,
                                            },
                                            id
                                        }
                                    });
                                    console.log('update response: ', response);
                                } else {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                bounce_type,
                                                email,
                                                fax,
                                                first_outbound_done,
                                                firstname,
                                                gender,
                                                is_ema_eligible,
                                                is_eva_eligible,
                                                is_referral,
                                                lastname,
                                                member_status,
                                                phone,
                                                position,
                                                role,
                                                sam_status,
                                                second_outbound_done,
                                                source,
                                                title,
                                                to_followup,
                                                account_id,
                                            }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                                props.history.push('/contacts-by-account', {account: props.location.state.account})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            console.log('values: ', values);
                            return (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Contact Creation/Update</FormLabel>
                                    <FormGroup aria-label="position" >
                                        <TextField
                                            name="firstname"
                                            label="First Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.firstname === null ? '' : values.firstname }
                                        />
                                        <TextField
                                            name="lastname"
                                            label="Last Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.lastname === null ? '' : values.lastname }
                                        />
                                        <TextField
                                            name="gender"
                                            label="Gender" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.gender === null ? '' : values.gender }
                                        />
                                        <TextField
                                            name="title"
                                            label="State" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.title === null ? '' : values.title }
                                        />
                                        <TextField
                                            name="phone"
                                            label="Phone" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.phone === null ? '' : values.phone }
                                        />
                                        <TextField
                                            name="fax"
                                            label="Fax" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.fax === null ? '' : values.fax }
                                        />
                                        <TextField
                                            name="email"
                                            label="Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email === null ? '' : values.email }
                                        />
                                        <FormControlLabel
                                            label="Is EMA Eligeble?"
                                            control={
                                                <Checkbox name="is_ema_eligible" onChange={handleChange} value={values.is_ema_eligible} />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Is EVA Eligeble?"
                                            control={
                                                <Checkbox name="is_eva_eligible" onChange={handleChange} value={values.is_eva_eligible} />
                                            }
                                        />
                                        <TextField
                                            name="role"
                                            label="Role" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.role === null ? '' : values.role }
                                        />
                                        <TextField
                                            name="position"
                                            label="Position" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.position === null ? '' : values.position }
                                        />
                                        <TextField
                                            name="source"
                                            label="Source" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.source === null ? '' : values.source }
                                        />
                                    </FormGroup>
                                </FormControl>
                                <Button variant="contained" type='submit'>Submit</Button>
                            </form>
                        )}}
                    </Formik>
                )
            }
        </Mutation>
    );
}

export default ManageContactForm
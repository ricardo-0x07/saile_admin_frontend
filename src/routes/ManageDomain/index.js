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

import { createDomain, updateDomain } from "../../graphql/mutations";



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
  
const ManageDomainForm = (props) => {
    const classes = useStyles();

    
    console.log('props: ', props)
    let initialValues = {
        active: false,
        dns: '',
        host: '',
        id: '',
        ip: '',
        name: '',
        provider: '',
        sailebot_id: '',
        smtp: '',
        smtp_login: '',
        smtp_password: '',
    };
    if ( props.location.state && props.location.state.domain) {
        initialValues = props.location.state.domain
    } else {
        if ( props.location.state && props.location.state.sailbot && props.location.state.sailbot.id) {
            initialValues = {
                ...initialValues,
                sailbot_id: props.location.state.sailbot.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.domain ? updateDomain : createDomain}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                active,
                                dns,
                                host,
                                ip,
                                name,
                                provider,
                                smtp,
                                smtp_login,
                                smtp_password,
                                sailebot_id,
                                id
                            }) => {
                                console.log('onSubmit sailebot_id: ', sailebot_id)
                                if (id) {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                active,
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                provider,
                                                smtp,
                                                smtp_login,
                                                smtp_password,
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
                                                active,
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                provider,
                                                smtp,
                                                smtp_login,
                                                smtp_password,
                                                sailebot_id,
                                            }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                                props.history.push('/domains-by-sailbot', {sailbot: props.location.state.sailbot})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            console.log('values: ', values);
                            return (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Domain Creation/Update</FormLabel>
                                    <FormGroup aria-label="position" >
                                        <TextField
                                            name="name"
                                            label="Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.name === null ? '' : values.name }
                                        />
                                        <TextField
                                            name="ip"
                                            label="IP Address" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.ip === null ? '' : values.ip }
                                        />
                                        <TextField
                                            name="dns"
                                            label="DNS" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.dns === null ? '' : values.dns }
                                        />
                                        <TextField
                                            name="provider"
                                            label="Provider" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.provider === null ? '' : values.provider }
                                        />
                                        <TextField
                                            name="smtp"
                                            label="SMTP server" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp === null ? '' : values.smtp }
                                        />
                                        <TextField
                                            name="host"
                                            label="Host" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.host === null ? '' : values.host }
                                        />
                                        <TextField
                                            name="smtp_login"
                                            label="SMTP Login" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_login === null ? '' : values.smtp_login }
                                        />
                                        <TextField
                                            name="smtp_password"
                                            label="SMTP Password" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_password === null ? '' : values.smtp_password }
                                        />
                                        <FormControlLabel
                                            label="Active?"
                                            control={
                                                <Checkbox name="active" onChange={handleChange} value={values.active} />
                                            }
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

export default ManageDomainForm
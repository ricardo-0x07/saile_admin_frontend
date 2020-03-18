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
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { createSchedule, updateSchedule } from "../../graphql/mutations";


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

const ManageScheduleForm = (props) => {
    const classes = useStyles();
    console.log('props: ', props)
    let initialValues = {
        name: '',
        daily_outbound_limit: '',
        no_targets_per_accounts: '',
        deploy_date:  new Date() ,
        status: '',
        timezone: '',
    };
    if ( props.location.state && props.location.state.schedule) {
        initialValues = props.location.state.schedule
    } else {
        if ( props.location.state && props.location.state.campaign && props.location.state.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.location.state.campaign.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.schedule ? updateSchedule : createSchedule}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                    name,
                                    daily_outbound_limit,
                                    no_targets_per_accounts,
                                    campaign_id,
                                    deploy_date,
                                    status,
                                    timezone,
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
                                                daily_outbound_limit: Number(daily_outbound_limit),
                                                no_targets_per_accounts: Number(no_targets_per_accounts),
                                                deploy_date,
                                                status,
                                                timezone,
                                                campaign_id,
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
                                                daily_outbound_limit: Number(daily_outbound_limit),
                                                no_targets_per_accounts: Number(no_targets_per_accounts),
                                                deploy_date,
                                                status,
                                                timezone,
                                                campaign_id: props.location.state.campaign.id,
                                            }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                      
                                
                                props.history.push('/schedules-by-campaign', {campaign: props.location.state.campaign})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Schedule Creation/Update</FormLabel>
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
                                            name="daily_outbound_limit"
                                            label="Daily outbound limit" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.daily_outbound_limit}
                                        />
                                        <TextField
                                            name="no_targets_per_accounts"
                                            label="No targets/accounts" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.no_targets_per_accounts}
                                        />
                                        <Field label="Deploy Date" name="deploy_date" component={DatePickerField} />
                                        <TextField
                                            name="status"
                                            label="Status" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.status}
                                        />
                                        <TextField
                                            name="timezone"
                                            label="Timezone" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.timezone}
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

export default ManageScheduleForm
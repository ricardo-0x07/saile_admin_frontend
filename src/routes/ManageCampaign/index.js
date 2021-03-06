import React from "react";
import { Formik, useField, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Mutation, Query } from "react-apollo";
import { createCampaign, updateCampaign } from "../../graphql/mutations";
import CompanyDomainSimpleSelect from './CompanyDomainSimpleSelect';
import EmailServiceSimpleSelect from './EmailServiceSimpleSelect';
import TimezoneSimpleSelect from './TimezoneSimpleSelect';
import Switch from '@material-ui/core/Switch';
import { getCompanyByRequirementId } from "../../graphql/queries";

const DatePickerField = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
  
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                clearable
                // disablePast
                name={field.name}
                value={field.value}
                format="YYYY-MM-DD"
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
      <Switch {...field} checked={field.value} />
    );
};


const ManageCampaignForm = (props) => {

    const classes = useStyles();
    let company = null;
      let initialValues = {
        name: '',
        description: '',
        accounts_per_schedule: 0,
        run_status: false,
        is_running: false,
        to_run: false,
        status_message: '',
        smtp_login: '',
        smtp_password: '',
        email_service: '',
        timezone: '',
        wait_days: 0,
        is_warming_up: false,
        warmup_start:  new Date() ,
        warmup_end:  new Date() ,
        max_heat: 10,
};
    if ( props.location.state && props.location.state.campaign) {
        initialValues = props.location.state.campaign
    } else {
        if ( props.location.state && props.location.state.requirement && props.location.state.requirement.id) {
            initialValues = {
                ...initialValues,
                requirement_id: props.location.state.requirement.id
            };
        }
    }

    const createWarmupSchedule = (schedule={name: 'warmup', campaign_id: 0, no_targets_per_accounts: 1, deploy_date: '2020-08-07', status: 'Active'}) => {
        // create schedule
    }
    console.log('createWarmupSchedule: ', createWarmupSchedule);
    if (!company) {
        return (
            <Query
            query={getCompanyByRequirementId(props.location.state.requirement.id)}
            >
              {({ data, loading }) => {
                console.log('data: ', data)
                console.log('loading: ', loading)
                if (
                  loading ||
                  !data ||
                  !data.company ||
                  !data.company
                ) {
                  return null;
                }
                company = data.company[0];
                console.log('company: ', company)

        
        
                return (
                    <Mutation
                        mutation={props.location.state && props.location.state.campaign ? updateCampaign : createCampaign}
                    >
                        { 
                            mutation => (
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={
                                        async ({ name,
                                            description,
                                            accounts_per_schedule,
                                            run_status,
                                            is_running,
                                            to_run,
                                            status_message,
                                            requirement_id,
                                            id,
                                            smtp_login,
                                            smtp_password,
                                            timezone,
                                            email_service,
                                            wait_days,
                                            company_domain_id,
                                            is_warming_up,
                                            warmup_start,
                                            warmup_end,
                                            max_heat
                                        }) => {
                                            if (id) {
                                                await mutation({
                                                    variables: {
                                                        objects: {
                                                            id,
                                                            name,
                                                            description,
                                                            accounts_per_schedule: Number(accounts_per_schedule),
                                                            requirement_id,
                                                            run_status,
                                                            is_running,
                                                            to_run,
                                                            status_message,
                                                            smtp_login,
                                                            smtp_password,
                                                            email_service,
                                                            timezone,
                                                            wait_days: Number(wait_days),
                                                            company_domain_id,
                                                            is_warming_up,
                                                            warmup_start,
                                                            warmup_end,
                                                            max_heat
                                                        },
                                                        id
                                                    }
                                                });
                                            } else {
                                                await mutation({
                                                    variables: {
                                                        objects: {
                                                            name,
                                                            accounts_per_schedule: Number(accounts_per_schedule),
                                                            description,
                                                            requirement_id,
                                                            run_status,
                                                            is_running,
                                                            to_run,
                                                            status_message,
                                                            smtp_login,
                                                            smtp_password,
                                                            email_service,
                                                            timezone,
                                                            wait_days: Number(wait_days),
                                                            company_domain_id,
                                                            is_warming_up,
                                                            warmup_start,
                                                            warmup_end,
                                                            max_heat
                                                        }
                                                    }
                                                });
                                            }
                                  
                                            
                                            props.history.push('/app/campaigns-by-requirement', {requirement: props.location.state.requirement, sailebot: props.location.state.sailebot})
                                        }
                                    }
                                >
                                    {({ values, handleChange, handleSubmit }) => (
                                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Campaign Creation/Update</FormLabel>
                                                <FormGroup aria-label="position" >
                                                    <TextField
                                                        name="name"
                                                        label="Name" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.name  || ''}
                                                    />
                                                    <TextField
                                                        name="description"
                                                        label="Description" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.description  || ''}
                                                    />
                                                    <TextField
                                                        name="accounts_per_schedule"
                                                        label="# Acccounts per schedule" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.accounts_per_schedule  || ''}
                                                    />
                                                    <TextField
                                                        name="wait_days"
                                                        label="#Outbound delay" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.wait_days  || ''}
                                                    />
                                                    <TextField
                                                        name="max_heat"
                                                        label="Max Warm" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.max_heat  || ''}
                                                    />
                                                    <Field label="Start Warmpup" name="warmup_start" component={DatePickerField} />
                                                    <Field label="Complete Warmup" name="warmup_end" component={DatePickerField} />
                                                    <EmailServiceSimpleSelect label="Email Service" name="email_service" onChange={handleChange} value={values.email_service || 'mailgun'}/>
                                                    <TimezoneSimpleSelect label="Timezone" name="timezone" onChange={handleChange} value={values.timezone || ''}/>
                                                    <TextField
                                                        name="smtp_login"
                                                        label="Gmail sailebot email address" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.smtp_login === null ? '' : values.smtp_login }
                                                    />
                                                    <TextField
                                                        name="smtp_password"
                                                        label="Gmail smtp application password" 
                                                        variant="filled" 
                                                        margin="normal" 
                                                        onChange={handleChange}
                                                        value={values.smtp_password === null ? '' : values.smtp_password }
                                                    />
                                                    <CompanyDomainSimpleSelect company_id={company.id} label="Domain" name="company_domain_id" onChange={handleChange} value={values.company_domain_id}/>
                                                    <FormControlLabel
                                                        label="Run Status"
                                                        control={
                                                            <Checkbox name="run_status" onChange={handleChange} value={values.run_status} />
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
                    </Mutation>
                );
            
              }}
            </Query>
          );
        
    }
}

export default ManageCampaignForm
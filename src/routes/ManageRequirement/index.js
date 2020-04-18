// import 'date-fns';
import React from "react";
import { Formik, Field, useField } from 'formik';
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
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";

import { createRequirement, updateRequirement } from "../../graphql/mutations";



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
  
const ManageRequirementForm = (props) => {
    const classes = useStyles();

    
    let initialValues = {
        name: '',
        auto_reject: false,
        city: '',
        contract_no: '',
        elasticity: '',
        function_name: '',
        geography: '',
        is_duplicate: false,
        launch_date:  new Date() ,
        max_hits_per_contact: '',
        priority: '',
        size: '',
        source: '',
        state: '',
    };
    if ( props.location.state && props.location.state.requirement) {
        initialValues = props.location.state.requirement
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
            mutation={props.location.state && props.location.state.requirement ? updateRequirement : createRequirement}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                name,
                                auto_reject,
                                city,
                                contract_no,
                                elasticity,
                                function_name,
                                geography,
                                is_duplicate,
                                launch_date,
                                max_hits_per_contact,
                                priority,
                                size,
                                source,
                                state,
                                sailebot_id,
                                id
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                auto_reject,
                                                city,
                                                contract_no,
                                                elasticity: Number(elasticity),
                                                function: function_name,
                                                geography,
                                                is_duplicate,
                                                launch_date,
                                                max_hits_per_contact: Number(max_hits_per_contact),
                                                priority,
                                                size: Number(size),
                                                source,
                                                state,
                                                sailebot_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                name,
                                                auto_reject,
                                                city,
                                                contract_no,
                                                elasticity: Number(elasticity),
                                                function: function_name,
                                                geography,
                                                id,
                                                is_duplicate,
                                                launch_date,
                                                max_hits_per_contact: Number(max_hits_per_contact),
                                                priority,
                                                source,
                                                state,
                                                sailebot_id,
                                            }
                                        }
                                    });
                                }
                                props.history.push('/app/requirements-by-sailebot', {sailebot: props.location.state.sailebot})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Requirement Creation/Update</FormLabel>
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
                                            name="city"
                                            label="City" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.city === null ? '' : values.city }
                                        />
                                        <TextField
                                            name="state"
                                            label="State" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.state === null ? '' : values.state }
                                        />
                                        <TextField
                                            name="elasticity"
                                            label="Elasticity" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.elasticity === null ? '' : values.elasticity }
                                        />
                                        <FormControlLabel
                                            label="Auto Reject?"
                                            control={
                                                <Checkbox name="auto_reject" onChange={handleChange} value={values.auto_reject} />
                                            }
                                        />
                                        <TextField
                                            name="source"
                                            label="Source" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.source === null ? '' : values.source }
                                        />
                                        <TextField
                                            name="contract_no"
                                            label="Contract#" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.contract_no === null ? '' : values.contract_no }
                                        />
                                        <TextField
                                            name="geography"
                                            label="Geography#" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.geography === null ? '' : values.geography }
                                        />
                                        <FormControlLabel
                                            label="Duplicate?"
                                            control={
                                                <Checkbox
                                                    name="is_duplicate"
                                                    onChange={handleChange}
                                                    value={values.is_duplicate}
                                                />
                                            }
                                        />
                                        <Field label="Launch Date" name="launch_date" component={DatePickerField} />
                                        <TextField
                                            name="max_hits_per_contact"
                                            label="Max hits/contact" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.max_hits_per_contact === null ? '' : values.max_hits_per_contact }
                                        />
                                        <TextField
                                            name="size"
                                            label="Size" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.size === null ? '' : values.size }
                                        />
                                        <TextField
                                            name="priority"
                                            label="Priority" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.priority === null ? '' : values.priority }
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

export default ManageRequirementForm
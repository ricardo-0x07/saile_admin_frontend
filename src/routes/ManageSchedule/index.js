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

import { createSchedule, updateSchedule } from "../../graphql/mutations";

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
                                            name="Daily outbound limit"
                                            label="Address" 
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
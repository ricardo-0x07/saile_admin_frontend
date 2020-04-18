import React from "react";
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { Mutation } from "react-apollo";
import { createCampaign, updateCampaign } from "../../graphql/mutations";

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

const ManageCampaignForm = (props) => {
    const classes = useStyles();
    let initialValues = {
        name: '',
        description: '',
        accounts_per_schedule: 0,
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
    return (
        <Mutation
            mutation={props.location.state && props.location.state.campaign ? updateCampaign : createCampaign}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ name, description, accounts_per_schedule, requirement_id, id }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                description,
                                                accounts_per_schedule: Number(accounts_per_schedule),
                                                requirement_id,
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
                                            }
                                        }
                                    });
                                }
                      
                                
                                props.history.push('/app/campaigns-by-requirement', {requirement: props.location.state.requirement})
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

export default ManageCampaignForm
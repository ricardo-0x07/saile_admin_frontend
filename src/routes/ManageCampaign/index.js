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
    console.log('props: ', props)
    let initialValues = {
        name: '',
        description: '',
    };
    if ( props.location.state && props.location.state.campaign) {
        initialValues = props.location.state.campaign
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
            mutation={props.location.state && props.location.state.campaign ? updateCampaign : createCampaign}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ name, description, sailebot_id, id }) => {
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit sailebot_id: ', sailebot_id)
                                if (id) {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                description,
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
                                                sailebot_id,
                                                description,
                                            }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                      
                                
                                props.history.push('/campaigns-by-sailebot', {sailebot: props.location.state.sailebot})
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
                                            value={values.name}
                                        />
                                        <TextField
                                            name="description"
                                            label="Description" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.description}
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
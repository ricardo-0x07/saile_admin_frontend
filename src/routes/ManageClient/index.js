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

import { createClient, updateClient } from "../../graphql/mutations";

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

const ManageClientForm = (props) => {
    const classes = useStyles();
    console.log('props: ', props)
    let initialValues = {
        name: '',
    };
    if ( props.location.state && props.location.state.client) {
        initialValues = props.location.state.client
    } else {
        if ( props.location.state && props.location.state.company && props.location.state.company.id) {
            initialValues = {
                ...initialValues,
                company_id: props.location.state.company.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.client ? updateClient : createClient}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ name, company_id, id }) => {
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit company_id: ', company_id)
                                if (id) {
                                    const response = await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                company_id,
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
                                            company_id,
                                        }
                                        }
                                    });
                                    console.log('create response: ', response);
                                }
                      
                                
                                props.history.push('/')
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Client Creation/Update</FormLabel>
                                    <FormGroup aria-label="position" >
                                        <TextField
                                            name="name"
                                            label="Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.name}
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

export default ManageClientForm
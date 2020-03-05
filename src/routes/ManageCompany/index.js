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

import { createCompany, updateCompany } from "../../graphql/mutations";

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

const ManageCompanyForm = (props) => {
    const classes = useStyles();
    console.log('props: ', props)
    let initialValues = {
        name: '',
        address: '',
        email: '',
        website: ''
    };
    if ( props.location.state && props.location.state.company) {
        initialValues = props.location.state.company
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.company ? updateCompany : createCompany}
        >
            { 
                // if ( props.location.state && props.location.state.company) {} else {}
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ name, address, email, website, id }) => {
                                console.log('onSubmit id: ', id)
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit address: ', address)
                                console.log('onSubmit email: ', email)
                                console.log('onSubmit website: ', website)
                                if (id) {
                                    const response = await mutation({
                                        variables: {
                                            object: {
                                                name,
                                                address,
                                                email,
                                                website,
                                                id,
                                            },
                                            id
                                        }
                                    });  
                                    console.log(response);  
                                    
                                } else {
                                    const response = await mutation({
                                        variables: {
                                            object: {
                                                name,
                                                address,
                                                email,
                                                website,
                                            }
                                        }
                                    });  
                                    console.log(response);  
                                }
                                props.history.push('/')
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Company Creation/Update</FormLabel>
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
                                            label="Subject" 
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
                                            name="website"
                                            label="Website" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.website}
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

export default ManageCompanyForm
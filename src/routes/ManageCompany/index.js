import React from "react";
import { Formik, useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    // FormControlLabel,
} from '@material-ui/core';
import { Mutation } from "react-apollo";
import MuiCheckbox from "@material-ui/core/Checkbox";
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
export const Checkbox = ({ ...props }) => {
    const [field] = useField(props.name);
    
  
    return (
      <MuiCheckbox {...field} checked={field.value} />
    );
};

const ManageCompanyForm = (props) => {
    console.log('props: ', props)
    const classes = useStyles();
    let initialValues = {
        name: '',
        email_domain: '',
        website  : '',
        industry  : '',
        address: '',
        street: '',
        state: '',
        city: '',
        country: '',
        phone: '',
    };
    if ( props.location.state && props.location.state.company) {
        initialValues = props.location.state.company
    } else {
        if ( props.location.state && props.location.state.company && props.location.state.company.id) {
            initialValues = {
                ...initialValues,
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.company ? updateCompany : createCompany}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({
                                id,
                                name,
                                email_domain,
                                website,
                                industry,
                                street,
                                city,
                                state,
                                country,
                                phone,
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                email_domain,
                                                website,
                                                industry,
                                                address: `${street} ${city} ${state} ${country}`,
                                                street,
                                                city,
                                                state,
                                                country,
                                                phone,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                email_domain,
                                                website,
                                                industry,
                                                address: `${street} ${city} ${state} ${country}`,
                                                street,
                                                city,
                                                state,
                                                country,
                                                phone,
                                            }
                                        }
                                    });
                                }
                      
                                
                                props.history.push('/app')
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
                                            value={values.name || ''}
                                        />
                                        <TextField
                                            name="email_domain"
                                            label="Email domain" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email_domain || ''}
                                        />
                                        <TextField
                                            name="website"
                                            label="Website" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.website || ''}
                                        />
                                        <TextField
                                            name="street"
                                            label="Street" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.street || ''}
                                        />
                                        <TextField
                                            name="city"
                                            label="City" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.city || ''}
                                        />
                                        <TextField
                                            name="state"
                                            label="State" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.state || ''}
                                        />
                                        <TextField
                                            name="country"
                                            label="Country" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.country || ''}
                                        />
                                        <TextField
                                            name="phone"
                                            label="Phone" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.phone || ''}
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
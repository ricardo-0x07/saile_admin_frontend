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
export const Checkbox = ({ ...props }) => {
    const [field] = useField(props.name);
    
  
    return (
      <MuiCheckbox {...field} checked={field.value} />
    );
};

const ManageClientForm = (props) => {
    console.log('props: ', props)
    const classes = useStyles();
    let initialValues = {
        name: '',
        address: '',
        state: '',
        city: '',
        country: '',
        NAICS: '',
        domain: '',
        email: '',
        email_domain: '',
        is_company: false,
        employees: 0,
        phone: '',
        revenue: '',
        website  : '',
        firstname  : '',
        lastname  : '',
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
                            async ({
                                id,
                                name,
                                address,
                                state,
                                city,
                                country,
                                NAICS,
                                domain,
                                email,
                                email_domain,
                                is_company,
                                employees,
                                phone,
                                revenue,
                                website,
                                firstname,
                                lastname,
                                company_id,
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                address,
                                                state,
                                                city,
                                                country,
                                                NAICS,
                                                domain,
                                                email,
                                                email_domain,
                                                is_company,
                                                employees,
                                                phone,
                                                revenue,
                                                website,
                                                firstname,
                                                lastname,
                                                company_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                name,
                                                address,
                                                state,
                                                city,
                                                country,
                                                NAICS,
                                                domain,
                                                email,
                                                email_domain,
                                                is_company,
                                                employees,
                                                phone,
                                                revenue,
                                                website,
                                                firstname, 
                                                lastname,
                                                company_id,
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
                                    <FormLabel component="legend">Client Creation/Update</FormLabel>
                                    <FormGroup aria-label="position" >
                                        <TextField
                                            name="firstname"
                                            label="First Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.firstname || ''}
                                        />
                                        <TextField
                                            name="lastname"
                                            label="Last Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.lastname || ''}
                                        />
                                        {/* <TextField
                                            name="name"
                                            label="Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.name || ''}
                                        /> */}
                                        <TextField
                                            name="address"
                                            label="Address" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.address || ''}
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
                                            name="city"
                                            label="City" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.city || ''}
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
                                            name="NAICS"
                                            label="NAICS" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.NAICS || ''}
                                        />
                                        <TextField
                                            name="email"
                                            label="Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email || ''}
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
                                            name="employees"
                                            label="Employees" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.employees || 0}
                                        />
                                        <TextField
                                            name="phone"
                                            label="Phone" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.phone || ''}
                                        />
                                        <TextField
                                            name="revenue"
                                            label="Revenue" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.revenue || ''}
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
                                            name="domain"
                                            label="Domain" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.domain || ''}
                                        />
                                        {/* <FormControlLabel
                                            label="Is Company?"
                                            control={
                                                <Checkbox name="is_company" onChange={handleChange} value={values.is_company} />
                                            }
                                        /> */}
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
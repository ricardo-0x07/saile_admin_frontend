// import 'date-fns';
import React from "react";
import { Formik, useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";
import { createCompanyDomain, updateCompanyDomain } from "../../graphql/mutations";



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
  
const ManageCompanyDomainForm = (props) => {
    const classes = useStyles();

    
    let initialValues = {
        dns: '',
        host: '',
        ip: '',
        name: '',
        company_id: '',
        smtp: '',
    };
    if ( props.location.state && props.location.state.domain) {
        initialValues = props.location.state.domain
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
            mutation={props.location.state && props.location.state.domain ? updateCompanyDomain : createCompanyDomain}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                dns,
                                host,
                                ip,
                                name,
                                smtp,
                                company_id,
                                id
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                smtp,
                                                company_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                smtp,
                                                company_id,
                                            }
                                        }
                                    });
                                }
                                props.history.push('/app/domains-by-company', {company: props.location.state.company})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Domain Creation/Update</FormLabel>
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
                                            name="ip"
                                            label="IP Address" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.ip === null ? '' : values.ip }
                                        />
                                        <TextField
                                            name="dns"
                                            label="DNS" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.dns === null ? '' : values.dns }
                                        />
                                        <TextField
                                            name="smtp"
                                            label="SMTP server" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp === null ? '' : values.smtp }
                                        />
                                        <TextField
                                            name="host"
                                            label="Host" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.host === null ? '' : values.host }
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

export default ManageCompanyDomainForm
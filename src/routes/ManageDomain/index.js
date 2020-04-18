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
    FormControlLabel,
} from '@material-ui/core';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";
import { createDomain, updateDomain } from "../../graphql/mutations";



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
  
const ManageDomainForm = (props) => {
    const classes = useStyles();

    
    let initialValues = {
        active: false,
        dns: '',
        host: '',
        ip: '',
        name: '',
        provider: '',
        sailebot_id: '',
        smtp: '',
        smtp_login: '',
        smtp_password: '',
    };
    if ( props.location.state && props.location.state.domain) {
        initialValues = props.location.state.domain
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
            mutation={props.location.state && props.location.state.domain ? updateDomain : createDomain}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ 
                                active,
                                dns,
                                host,
                                ip,
                                name,
                                provider,
                                smtp,
                                smtp_login,
                                smtp_password,
                                sailebot_id,
                                id
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                active,
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                provider,
                                                smtp,
                                                smtp_login,
                                                smtp_password,
                                                sailebot_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                active,
                                                dns,
                                                host,
                                                ip,
                                                name,
                                                provider,
                                                smtp,
                                                smtp_login,
                                                smtp_password,
                                                sailebot_id,
                                            }
                                        }
                                    });
                                }
                                props.history.push('/app/domains-by-sailebot', {sailebot: props.location.state.sailebot})
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
                                            name="provider"
                                            label="Provider" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.provider === null ? '' : values.provider }
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
                                        <TextField
                                            name="smtp_login"
                                            label="SMTP Login" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_login === null ? '' : values.smtp_login }
                                        />
                                        <TextField
                                            name="smtp_password"
                                            label="SMTP Password" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_password === null ? '' : values.smtp_password }
                                        />
                                        <FormControlLabel
                                            label="Active?"
                                            control={
                                                <Checkbox name="active" onChange={handleChange} value={values.active} />
                                            }
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

export default ManageDomainForm
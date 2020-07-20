import React from "react";
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    TextareaAutosize,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { Mutation } from "react-apollo";

import { createSaileBot, updateSaileBot } from "../../graphql/mutations";
import SimpleSelect from './SimpleSelect'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ManageSaileBotForm = (props) => {
    const classes = useStyles();
    let initialValues = {
        name: '',
        no_targets: 4,
        email: '',
        fullname: '',
        phone: '',
        title: '',
        role: '',
        company_name: '',
        signature: '',
        firstname: '',
        lastname: '',
        smtp_login: '',
        smtp_password: '',
        email_service: 'mailgun',
};
    if ( props.location.state && props.location.state.sailebot) {
        initialValues = props.location.state.sailebot
    } else {
        if ( props.location.state && props.location.state.client && props.location.state.client.id) {
            initialValues = {
                ...initialValues,
                client_id: props.location.state.client.id
            };
        }
    }
    return (
        <Mutation
            mutation={props.location.state && props.location.state.sailebot ? updateSaileBot : createSaileBot}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({
                                client_id,
                                email,
                                fullname,
                                id,
                                name,
                                no_targets,
                                phone,
                                title,
                                role,
                                company_name,
                                signature,
                                firstname,
                                lastname,
                                smtp_login,
                                smtp_password,
                                email_service,
                            }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                client_id,
                                                email,
                                                fullname,
                                                id,
                                                name,
                                                no_targets,
                                                phone,
                                                title,
                                                role,
                                                company_name,
                                                signature,
                                                firstname,
                                                lastname,
                                                smtp_login,
                                                smtp_password,
                                                email_service,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                client_id,
                                                email,
                                                fullname,
                                                name,
                                                no_targets,
                                                phone,
                                                title,
                                                role,
                                                company_name,
                                                signature,
                                                firstname,
                                                lastname,
                                                smtp_login,
                                                smtp_password,
                                                email_service,
                                            }
                                        }
                                    });
                                }
                      
                                
                                props.history.push('/app/sailebots-by-client', {client: props.location.state.client})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">SaileBot Creation/Update</FormLabel>
                                    <FormGroup aria-label="position" >
                                        <TextField
                                            name="fullname"
                                            label="Identifier" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.fullname === null ? '' : values.fullname }
                                        />
                                        <TextField
                                            name="firstname"
                                            label="First Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.firstname === null ? '' : values.firstname }
                                        />
                                        <TextField
                                            name="lastname"
                                            label="Last Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.lastname === null ? '' : values.lastname }
                                        />
                                        <TextField
                                            name="email"
                                            label="Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email === null ? '' : values.email }
                                        />
                                        <TextField
                                            name="title"
                                            label="Title" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.title === null ? '' : values.title }
                                        />
                                        <TextField
                                            name="role"
                                            label="Role" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.role === null ? '' : values.role }
                                        />
                                        <TextField
                                            name="company_name"
                                            label="Company Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.company_name === null ? '' : values.company_name }
                                        />
                                        <TextareaAutosize
                                            name="signature"
                                            placeholder="Signature Text" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.signature === null ? '' : values.signature }
                                            rowsMax={10}
                                            aria-label="signature"
                                        />
                                        <SimpleSelect label="Email Service" name="email_service" onChange={handleChange} value={values.email_service || 'mailgun'}/>
                                        {/* <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl> */}
                                        <TextField
                                            name="smtp_login"
                                            label="Gmail sailebot email address" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_login === null ? '' : values.smtp_login }
                                        />
                                        <TextField
                                            name="smtp_password"
                                            label="Gmail smtp application password" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.smtp_password === null ? '' : values.smtp_password }
                                        />
                                        <TextField
                                            name="no_targets"
                                            label="No of Daily Targets per Account" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.no_targets === null ? '' : values.no_targets }
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

export default ManageSaileBotForm
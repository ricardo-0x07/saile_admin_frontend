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
import { createTemplate, updateTemplate } from "../../graphql/mutations";

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

const ManageTemplateForm = (props) => {
    const classes = useStyles();
    let initialValues = {
        name: '',
        subject: '',
        body_text: '',
        body_html_text: '',
    };
    if ( props.location.state && props.location.state.template) {
        initialValues = props.location.state.template
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
            mutation={props.location.state && props.location.state.template ? updateTemplate : createTemplate}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ name, subject, body_text, body_html_text, campaign_id, id }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                name,
                                                subject,
                                                body_text,
                                                body_html_text,
                                                campaign_id,
                                            },
                                            id
                                        }
                                    });
                                } else {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                name,
                                                campaign_id,
                                                subject,
                                                body_text,
                                                body_html_text,
                                            }
                                        }
                                    });
                                }
                      
                                
                                props.history.push('/app/templates-by-campaign', {campaign: props.location.state.campaign})
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Template Creation/Update</FormLabel>
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
                                            name="subject"
                                            label="Subject" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.subject  || ''}
                                        />
                                        <TextareaAutosize
                                            name="body_text"
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.body_text  || ''}
                                            rowsMax={10}
                                            aria-label="body_text"
                                            placeholder="Text"
                                        />
                                        <TextareaAutosize
                                            name="body_html_text"
                                            placeholder="HTML Text" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.body_html_text  || ''}
                                            rowsMax={10}
                                            aria-label="body_html_text"
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

export default ManageTemplateForm
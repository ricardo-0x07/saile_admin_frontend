import React, { useEffect, useReducer } from "react";
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { createTemplate } from "../../graphql/mutations";

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
    return (
        <Mutation
            mutation={gql(createTemplate)}
        >
            { 
                createTemplate => (
                    <Formik
                        initialValues={{
                            name: '',
                            subject: '',
                            body_text: '',
                            body_html_text: ''
                        }}
                        onSubmit={
                            async ({ name, subject, body_text, body_html_text }) => {
                                console.log('onSubmit name: ', name)
                                console.log('onSubmit subject: ', subject)
                                console.log('onSubmit body_text: ', body_text)
                                console.log('onSubmit body_html_text: ', body_html_text)
                                const response = await createTemplate({
                                    variables: {
                                      input: {
                                        name,
                                        subject,
                                        body_text,
                                        body_html_text,
                                      }
                                    }
                                });
                      
                                console.log(response);
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    name="name"
                                    label="Name" 
                                    variant="filled" 
                                    margin="normal" 
                                    onChange={handleChange}
                                    value={values.name}
                                />
                                <TextField
                                    name="subject"
                                    label="Subject" 
                                    variant="filled" 
                                    margin="normal" 
                                    onChange={handleChange}
                                    value={values.subject}
                                />
                                <TextareaAutosize
                                    name="body_text"
                                    variant="filled" 
                                    margin="normal" 
                                    onChange={handleChange}
                                    value={values.body_text}
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
                                    value={values.body_html_text}
                                    rowsMax={10}
                                    aria-label="body_html_text"
                                />
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
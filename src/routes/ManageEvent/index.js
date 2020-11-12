import React, { useState } from "react";
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
import { updateEvent } from "../../graphql/mutations";
import Typography from "@material-ui/core/Typography";

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

const ManageEventForm = (props) => {
    const [isPreview, setIsPreview] = useState(true)
    const classes = useStyles();
    let initialValues = {
        subject: '',
        cc: '',
        body: '',
        label: '',
    };
    if ( props.location.state && props.location.state.event) {
        initialValues = props.location.state.event
    } else {
        if ( props.location.state && props.location.state.campaign && props.location.state.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.location.state.campaign.id
            };
        }
    }
    console.log('isPreview: ', isPreview);
    const togglePreview = () => {
        setIsPreview(!isPreview)
    }
    function createMarkup(body) {
        return {__html: body};
    }
    const insertBody = (name, body) => {
        let body_ = body
        return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>{name}: </Typography>
            {
                // body_.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
                <div dangerouslySetInnerHTML={createMarkup(body_)} />
            }
        </React.Fragment>
        );
    }
    return (
        <Mutation
            mutation={updateEvent}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async ({ subject, label, body, cc, id }) => {
                                if (id) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                id,
                                                label,
                                                subject,
                                                cc,
                                                body,
                                            },
                                            id
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
                                    <FormLabel component="legend">Event Creation/Update</FormLabel>
                                    { 
                                        isPreview 
                                        ? 
                                        <div>
                                            {insertBody('Subject',values.subject  || '')}
                                            {insertBody('Body', values.body_html_text  || '')}
                                        </div>
                                        : <FormGroup aria-label="position" >
                                            <TextField
                                                name="label"
                                                label="Label" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.label  || ''}
                                            />
                                            <TextField
                                                name="cc"
                                                label="CC" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.cc  || ''}
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
                                                name="body"
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.body  || ''}
                                                rowsMax={10}
                                                aria-label="body"
                                                placeholder="Text"
                                            />
                                        </FormGroup>
                                    }
                                </FormControl>
                                {
                                    !isPreview 
                                    && <Button variant="contained" type='submit'>Submit</Button>
                                }
                                <Button variant="contained" type='button' onClick={togglePreview}>{!isPreview ? 'Preview' : 'Edit' }</Button>
                            </form>
                        )}
                    </Formik>
                )
            }
        </Mutation>
    );
}

export default ManageEventForm
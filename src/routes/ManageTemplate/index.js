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
import { createTemplate, updateTemplate } from "../../graphql/mutations";
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

let client_company = 'client company'
let client_firstname = 'client firstname'
let target_company = 'target company'
let target_fullname = 'contact fullname'
let target_firstname = 'contact firstname'
let target_title = 'contact title'
let target_email = 'contact email'
let client_signature = 'client signature'
let previous_from = ''
let previous_to = ''
let previous_cc = ''
let previous_subject = ''
let previous_content = ''
let request_email = ''
let time_a = 'time a'
let time_b = 'time b'
let referree_firstname = 'referree firstname'
let referree_fullname = 'referree fullname'
let referrer_firstname = 'referrer firstname'
let referrer_fullname = 'referrer fullname'
let summary_a = 'summary a'
let summary_b = 'summary b'
let summary = 'summary'
let client_role = 'client role'
let opt_out = 'opt out link'
let intro = 'intro'
let salutations = 'salutations'
let account_name = 'account name'
let account_address = 'account address'
let account_website = 'account website'
let account_phone = 'account phone'
let account_employees = 'account employees'
let influencer_template = 'influencer details'

const ManageTemplateForm = (props) => {
    const [isPreview, setIsPreview] = useState(true)
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
    console.log('isPreview: ', isPreview);
    const togglePreview = () => {
        setIsPreview(!isPreview)
    }
    function createMarkup(body) {
        return {__html: body};
    }
    const insertBody = (name, body) => {
        let body_ = body.replace('{salutations}', `<strong>${salutations}</strong>`).replace('{intro}', `<strong>${intro}</strong>`).replace('{opt_out}', `<strong>${opt_out}</strong>`)
        .replace('{client_role}', `<strong>${client_role}</strong>`).replace('{summary}', `<strong>${summary}</strong>`).replace('{summary_b}', `<strong>${summary_b}</strong>`).replace('{summary_a}', `<strong>${summary_a}</strong>`)
        .replace('{referrer_fullname}', `<strong>${referrer_fullname}</strong>`).replace('{referrer_firstname}', `<strong>${referrer_firstname}</strong>`).replace('{referree_fullname}', `<strong>${referree_fullname}</strong>`)
        .replace('{referree_firstname}', `<strong>${referree_firstname}</strong>`).replace('{time_b}', `<strong>${time_b}</strong>`).replace('{time_a}', `<strong>${time_a}</strong>`).replace('{request_email}', `<strong>${request_email}</strong>`)
        .replace('{previous_content}', `<strong>${previous_content}</strong>`).replace('{previous_subject}', `<strong>${previous_subject}</strong>`).replace('{previous_cc}', `<strong>${previous_cc}</strong>`).replace('{previous_to}', `<strong>${previous_to}</strong>`)
        .replace('{previous_from}', `<strong>${previous_from}</strong>`).replace('{client_signature}', `<strong>${client_signature}</strong>`).replace('{target_firstname}', `<strong>${target_firstname}</strong>`).replace('{target_fullname}', `<strong>${target_fullname}</strong>`)
        .replace('{target_company}', `<strong>${target_company}</strong>`).replace('{client_firstname}', `<strong>${client_firstname}</strong>`).replace('{client_company}', `<strong>${client_company}</strong>`)
        .replace('{account_name}', `<strong>${account_name}</strong>`).replace('{account_address}', `<strong>${account_address}</strong>`).replace('{account_website}', `${account_website}`)
        .replace('{account_phone}', `${account_phone}`).replace('{account_employees}', `<strong>${account_employees}</strong>`).replace('{influencer_template}', `<strong>${influencer_template}</strong>`)
        .replace('{target_title}', `<strong>${target_title}</strong>`).replace('{target_email}', `${target_email}`)
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
                                    { 
                                        isPreview 
                                        ? 
                                        <div>
                                            {insertBody('Subject',values.subject  || '')}
                                            {insertBody('Body', values.body_html_text  || '')}
                                        </div>
                                        : <FormGroup aria-label="position" >
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

export default ManageTemplateForm
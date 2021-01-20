import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Formik } from 'formik';
import {
    TextField,
    TextareaAutosize,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { Mutation } from "react-apollo";
// getCampaignAOTemplates
import { createTemplate, updateTemplate } from "../../graphql/mutations";
import { useHistory, useLocation } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreviewAODialog(props) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    let isPreview = true
    // const [isPreview, setIsPreview] = React.useState(true)
    console.log("props: ", props)
    const { company, contact, account, event, referrer } = props;
    let client_company = company && company.name? company.name : 'client company'
    let client_logo= company && company.logo? company.logo : 'https://d13rds6btkjz86.cloudfront.net/logos/Danlaw.Logo.png'

    let target_firstname = contact && contact.firstname? contact.firstname : 'contact firstname'
    let target_lastname = contact && contact.lastname? contact.lastname : 'contact lastname'
    let target_fullname = `${target_firstname} ${target_lastname}` || 'contact fullname'
    let target_title = contact && contact.title? contact.title : 'contact title'
    let target_email = contact && contact.email? contact.email : 'contact email'

    let account_name = account && account.name? account.name : 'account name'
    let target_company = account_name || 'target company'
    let account_address = account && account.address? account.address : 'account address'
    let account_website = account && account.website? account.website : 'account website'
    let account_phone = account && account.phone? account.phone : 'account phone'
    let account_employees = account && account.employees? account.employees : 'account employees'

    let client_firstname = 'client firstname'
    let client_signature = 'client signature'

    let previous_from = event && event.sender? event.sender : ''
    let previous_to = event && event.to? event.to : ''
    let previous_cc = event && event.cc? event.cc : ''
    let previous_subject = event && event.subject? event.subject : ''
    let previous_content = event && event.body? event.body : ''

    let referree_firstname = contact && contact.firstname? contact.firstname : 'referree firstname'
    let referree_lastname = contact && contact.lastname? contact.lastname : 'referree lastname'
    let referree_fullname = `${referree_firstname} ${referree_lastname}` || 'referree fullname'

    let referrer_firstname = referrer && referrer.firstname? referrer.firstname : 'referrer firstname'
    let referrer_lastname = referrer && referrer.lastname? referrer.lastname : 'referrer lastname'
    let referrer_fullname = `${referrer_firstname} ${referrer_lastname}` || 'referrer fullname'

    let influencer_fullname=referrer_fullname || "Bill Blok"
    let influencer_title=referrer && referrer.title? referrer.title : "CEO"
    let influencer_email=referrer && referrer.email? referrer.email : "blokable.com"
    let influencer_phone=referrer && referrer.phone? referrer.phone : "+1 800-928-6778"
    let convert_url = ''
    let digital_labor = 70;
    let more_css= ` 
              a[href^="mailto"] {
                    color: white;

                }
              .white-links > a {
                    color: white;
              }
                .white-links > a[href^="mailto"] {
                    color: white;

                }

          .white-links > a[href^="mailto"]:hover:after { 
                    color: white;

               }
    `

    let request_email = ''
    let time_a = 'time a'
    let time_b = 'time b'
    let summary_a = 'summary a'
    let summary_b = 'summary b'
    let summary = 'summary'
    let client_role = 'client role'
    let opt_out = 'opt out link'
    let intro = 'intro'
    let salutations = 'salutations'



    let influencer_template = ''
    if (referrer !== null) {
        if ( props.template.body_html_text.includes('{digital_labor_old}')) {
            influencer_phone = `
            <a href="tel:${influencer_phone} "style="color:#608bea" target="_blank">${influencer_phone}</a>&nbsp;(Office)<br>
            `
            influencer_email = `
                <a href="mailto:${influencer_email}" style="color:#608bea" target="_blank">
                    ${influencer_email}
                </a><br>
            `
            influencer_title = `
            {influencer_title}<br>
            `.replace('{influencer_title}', `${influencer_title}`)
            influencer_fullname = `
            {influencer_fullname}<br>
            `.replace('{influencer_fullname}', `${influencer_fullname}`)
            console.log("influencer_email: ", influencer_email)
            influencer_template = `
            <p style="color:#3b2d2d;font-size:13px;font-weight:normal;line-height:18px;font-family:Verdana,Helvetica,Arial,sans-serif;margin-bottom:14px;margin-top:14px">
                <strong>Influencer:</strong><br>
                {influencer_fullname}<br>
                {influencer_title}
                {influencer_email}
                {influencer_phone}
            </p>
            `.replaceAll('{influencer_title}', `${influencer_title}`).replaceAll('{influencer_email}', `${influencer_email}`).replaceAll('{influencer_fullname}', `${influencer_fullname}`).replaceAll('{influencer_phone}', `${influencer_phone}`)
                
        } else {
            influencer_phone = `
            <a href="tel:${influencer_phone} " 
            style="color:#ffffff" target="_blank">
            ${influencer_phone}</a>&nbsp;<span style="color:#ffffff">(Office)</span><br>
            `
    
            influencer_email = `
            <a href="mailto:${influencer_email}"
            style="color:#ffffff" 
            target="_blank">${influencer_email}</a><br>
            `
            influencer_title = `
            {influencer_title}<br>
            `.replaceAll('{influencer_email}', `${influencer_email}`)
        
            influencer_fullname = `
            {influencer_fullname}<br>
            `.replaceAll('{influencer_fullname}', `${influencer_fullname}`)
        
            influencer_template = `
                    <p
                    style="color:#ffffff;
                            font-size:13px;
                            font-weight:normal;
                            line-height:18px;
                            
                            font-family:Verdana,Helvetica,Arial,sans-serif;
                            "
                            >
                {influencer_fullname}
                {influencer_title}
            </p>
            {influencer_phone}
    
            {influencer_email}
            `.replaceAll('{influencer_title}', `${influencer_title}`)
            .replaceAll('{influencer_email}', `${influencer_email}`)
            .replaceAll('{influencer_fullname}', `${influencer_fullname}`)
            .replaceAll('{influencer_phone}', `${influencer_phone}`)
                    
        }        
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let initialValues = {
        name: '',
        subject: '',
        body_text: '',
        body_html_text: '',
    };

    console.log('location: ', location);
    console.log('history: ', history);

    if ( props && props.template) {
        initialValues = props.template
    } else {
        if ( props && props.template && props.template.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.template.id
            };
        }
    }
    // console.log('isPreview: ', isPreview);
    console.log('props.template: ', props.template);
    // const togglePreview = () => {
    //     setIsPreview(!isPreview)
    // }
    function createMarkup(body) {
        return {__html: body};
    }
    const insertBody = (name, body) => {
        let body_ = body.replaceAll('{salutations}', `<strong>${salutations}</strong>`).replaceAll('{intro}', `<strong>${intro}</strong>`).replaceAll('{opt_out}', `<strong>${opt_out}</strong>`)
        .replaceAll('{client_role}', `<strong>${client_role}</strong>`).replaceAll('{summary}', `<strong>${summary}</strong>`).replaceAll('{summary_b}', `<strong>${summary_b}</strong>`).replaceAll('{summary_a}', `<strong>${summary_a}</strong>`)
        .replaceAll('{referrer_fullname}', `<strong>${referrer_fullname}</strong>`).replaceAll('{referrer_firstname}', `<strong>${referrer_firstname}</strong>`).replaceAll('{referree_fullname}', `<strong>${referree_fullname}</strong>`)
        .replaceAll('{referree_firstname}', `<strong>${referree_firstname}</strong>`).replaceAll('{time_b}', `<strong>${time_b}</strong>`).replaceAll('{time_a}', `<strong>${time_a}</strong>`).replaceAll('{request_email}', `<strong>${request_email}</strong>`)
        .replaceAll('{previous_content}', `<strong>${previous_content}</strong>`).replaceAll('{previous_subject}', `<strong>${previous_subject}</strong>`).replaceAll('{previous_cc}', `<strong>${previous_cc}</strong>`).replaceAll('{previous_to}', `<strong>${previous_to}</strong>`)
        .replaceAll('{previous_from}', `<strong>${previous_from}</strong>`).replaceAll('{client_signature}', `<strong>${client_signature}</strong>`).replaceAll('{target_firstname}', `<strong>${target_firstname}</strong>`).replaceAll('{target_fullname}', `<strong>${target_fullname}</strong>`)
        .replaceAll('{target_company}', `<strong>${target_company}</strong>`).replaceAll('{client_firstname}', `<strong>${client_firstname}</strong>`).replaceAll('{client_company}', `<strong>${client_company}</strong>`)
        .replaceAll('{account_name}', `<strong>${account_name}</strong>`).replaceAll('{account_address}', `<strong>${account_address}</strong>`).replaceAll('{account_website}', `${account_website}`)
        .replaceAll('{account_phone}', `${account_phone}`).replaceAll('{account_employees}', `<strong>${account_employees}</strong>`).replaceAll('{influencer_template}', `<strong>${influencer_template}</strong>`)
        .replaceAll('{target_title}', `<strong>${target_title}</strong>`).replaceAll('{target_email}', `${target_email}`).replaceAll('{influencer_template}', `${influencer_template}`).replaceAll('{more_css}', `${more_css}`)
        .replaceAll('{digital_labor}', `${digital_labor}`).replaceAll('{digital_labor_old}', `${digital_labor}`).replaceAll('{convert_url}', `${convert_url}`).replaceAll('{client_logo}', `${client_logo}`)
        
        return (
        <React.Fragment>
            <Typography variant="subtitle1" gutterBottom>{name}: </Typography>
            {
                // body_.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
                <div dangerouslySetInnerHTML={createMarkup(body_)} />
            }
        </React.Fragment>
        );
    }

  return (
    <div> 
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.name}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.name}
            </Typography>
            {<Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>}
          </Toolbar>
        </AppBar>
        <Mutation
            mutation={props && props.template ? updateTemplate : createTemplate}
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
                      
                                
                                handleClose()
                                props.updateReload()
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{width: '100%', flex: 1}}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">AO Preview</FormLabel>
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
                                    // !isPreview 
                                    // && <Button variant="contained" type='submit'>Submit</Button>
                                }
                                <Button variant="contained" type='button' onClick={handleClose}>Close</Button>
                            </form>
                        )}
                    </Formik>
                )
            }
        </Mutation>
      </Dialog>
    </div>
  );
}

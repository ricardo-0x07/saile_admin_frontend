import React, { useState } from "react";
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
import DialogContent from '@material-ui/core/DialogContent';

import {
    TextField,
    TextareaAutosize,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { Mutation } from "react-apollo";
import { updateEvent } from "../../graphql/mutations";
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

export default function EventEditDialog(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [isPreview, setIsPreview] = useState(false)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    let initialValues = {
        subject: '',
        cc: '',
        body: '',
        label: '',
    };
    console.log('location: ', location);
    console.log('history: ', history);

    if ( props && props.event) {
        initialValues = props.event
    } else {
        if ( props && props.campaign && props.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.campaign.id
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
                <div dangerouslySetInnerHTML={createMarkup(`
                <pre style="font-family: Arial, Helvetica, sans-serif; white-space: pre-wrap; color: #222;">
                    ${body_}
                </pre>`)} />
            }
        </React.Fragment>
        );
    }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.name}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} scroll={'paper'}>>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.name}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <DialogContent dividers={true}>
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
                                  // props.history.push('/app')
                                  // props.history.goBack()
                                  handleClose()
                                  props.updateReload()
                              }
                          }
                      >
                          {({ values, handleChange, handleSubmit }) => (
                              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{width: '100%', flex: 1}}>
                                  <FormControl component="fieldset">
                                      <FormLabel component="legend">Event Edit</FormLabel>
                                      { 
                                          isPreview 
                                          ? 
                                          <div>
                                              {insertBody('Subject',values.subject  || '')}
                                              {insertBody('Body', values.body  || '')}
                                          </div>
                                          : <FormGroup aria-label="position" >
                                              {/* <TextField
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
                                              /> */}
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
                                                  rowsMax={30}
                                                  aria-label="body"
                                                  placeholder="Text"
                                              />
                                          </FormGroup>
                                      }
                                  </FormControl>
                                  {
                                      !isPreview 
                                      && <Button variant="contained" type='submit' style={{textAlign: 'inherit'}}>Submit</Button>
                                  }
                                  <Button variant="contained" type='button' onClick={togglePreview} style={{textAlign: 'inherit'}}>{!isPreview ? 'Preview' : 'Edit' }</Button>
                              </form>
                          )}
                      </Formik>
                  )
              }
          </Mutation>
        </DialogContent>
      </Dialog>
    </div>
  );
}

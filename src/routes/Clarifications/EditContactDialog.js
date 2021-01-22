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
import { Formik, useField } from 'formik';
import DialogContent from '@material-ui/core/DialogContent';
import {
    TextField,
    // FormControlLabel,
    FormLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";

import { createContact, updateContact } from "../../graphql/mutations";

export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);

  return (
    <MuiCheckbox {...field} checked={field.value} />
  );
};



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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    let initialValues = {
        account_id: '',
        bounce_type: '',
        email: '',
        first_outbound_done: false,
        firstname: '',
        gender: '',
        id: '',
        is_ema_eligible: false,
        is_eva_eligible: false,
        is_referral: false,
        lastname: '',
        member_status: '',
        phone: '',
        position: '',
        role: '',
        sam_status: '',
        second_outbound_done: false,
        source: '',
        title: '',
        to_followup: false,
    };
    console.log('location: ', location);
    console.log('history: ', history);

    if ( props && props.contact) {
        initialValues = props.contact
    } else {
        if ( props && props.campaign && props.campaign.id) {
            initialValues = {
                ...initialValues,
                campaign_id: props.campaign.id
            };
        }
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
                mutation={props && props.contact ? updateContact : createContact}
            >
                { 
                    mutation => (
                        <Formik
                            initialValues={initialValues}
                            onSubmit={
                                async ({ 
                                    bounce_type,
                                    email,
                                    first_outbound_done,
                                    firstname,
                                    gender,
                                    is_ema_eligible,
                                    is_eva_eligible,
                                    is_referral,
                                    lastname,
                                    member_status,
                                    phone,
                                    position,
                                    role,
                                    sam_status,
                                    second_outbound_done,
                                    source,
                                    title,
                                    to_followup,
                                    account_id,
                                    id
                                }) => {
                                    if (id) {
                                        await mutation({
                                            variables: {
                                                objects: {
                                                    id,
                                                    bounce_type,
                                                    email,
                                                    first_outbound_done,
                                                    firstname,
                                                    gender,
                                                    is_ema_eligible,
                                                    is_eva_eligible,
                                                    is_referral,
                                                    lastname,
                                                    member_status,
                                                    phone,
                                                    position,
                                                    role,
                                                    sam_status,
                                                    second_outbound_done,
                                                    source,
                                                    title,
                                                    to_followup,
                                                    account_id,
                                                },
                                                id
                                            }
                                        });
                                    } else {
                                        await mutation({
                                            variables: {
                                                objects: {
                                                    bounce_type,
                                                    email,
                                                    first_outbound_done,
                                                    firstname,
                                                    gender,
                                                    is_ema_eligible,
                                                    is_eva_eligible,
                                                    is_referral,
                                                    lastname,
                                                    member_status,
                                                    phone,
                                                    position,
                                                    role,
                                                    sam_status,
                                                    second_outbound_done,
                                                    source,
                                                    title,
                                                    to_followup,
                                                    account_id,
                                                }
                                            }
                                        });
                                    }
                                    handleClose()
                                    props.updateReload()
                                                                }
                            }
                        >
                            {({ values, handleChange, handleSubmit }) => {
                                return (
                                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{width: '100%', flex: 1}}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Contact Creation/Update</FormLabel>
                                        <FormGroup aria-label="position" >
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
                                            {/* <TextField
                                                name="gender"
                                                label="Gender" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.gender === null ? '' : values.gender }
                                            /> */}
                                            <TextField
                                                name="title"
                                                label="Title" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.title === null ? '' : values.title }
                                            />
                                            <TextField
                                                name="phone"
                                                label="Phone" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.phone === null ? '' : values.phone }
                                            />

                                            <TextField
                                                name="email"
                                                label="Email" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.email === null ? '' : values.email }
                                            />
                                            {/* <FormControlLabel
                                                label="Is EMA Eligeble?"
                                                control={
                                                    <Checkbox name="is_ema_eligible" onChange={handleChange} value={values.is_ema_eligible} />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Is EVA Eligeble?"
                                                control={
                                                    <Checkbox name="is_eva_eligible" onChange={handleChange} value={values.is_eva_eligible} />
                                                }
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
                                                name="position"
                                                label="Position" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.position === null ? '' : values.position }
                                            /> 
                                            <TextField
                                                name="source"
                                                label="Source" 
                                                variant="filled" 
                                                margin="normal" 
                                                onChange={handleChange}
                                                value={values.source === null ? '' : values.source }
                                            /> */}
                                        </FormGroup>
                                    </FormControl>
                                    <Button variant="contained" type='submit' style={{textAlign: 'inherit'}}>Submit</Button>
                                </form>
                            )}}
                        </Formik>
                    )
                }
            </Mutation>
        </DialogContent>
      </Dialog>
    </div>
  );
}

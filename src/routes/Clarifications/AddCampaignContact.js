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
    Switch
} from '@material-ui/core';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Mutation } from "react-apollo";
import { createUpdateContact } from "../../graphql/mutations";
// import { validate } from 'validate.js';

// import constraints from '../../utils/constraints'



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
  
const ManageContactForm = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        to_refer: false,
      }); 
    const handleToReferChange = async (event) => {
        console.log('event.target.name: ', event.target.name)
        console.log('event.target.value: ', event.target.value)
        console.log('event.target.checked: ', event.target.checked)
        const to_refer = event.target.checked
        await setState({ ...state, [event.target.name]: to_refer });
        console.log('to_refer: ', to_refer)
        console.log('state: ', state)
    
    };
    let initialValues = {
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
        account_id: props.account_id,
        referrer_email: ''
    };

    // // Synchronous validation
    // const validate = (values, props /* only available when using withFormik */) => {
    //     const errors = {};
    //     console.log("validate values: ", values)
    
    //     if (!values.email) {
    //         errors.email = 'Required';
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address';
    //     }
    
    //     //...
    
    //     return errors;
    // };
 
    const AddcontactSchema = Yup.object().shape({
        firstname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!'),
        lastname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!'),
        title: Yup.string()
          .min(2, 'Too Short!')
          .max(100, 'Too Long!'),
        email: Yup.string().email('Invalid email').required('Required'),
        referrer_email: Yup.string().email('Invalid email'),
      });
     
    return (
        <Mutation
            mutation={createUpdateContact}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={AddcontactSchema}
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
                                referrer_email,
                                id
                            }) => {
                                // if (id) {
                                //     await mutation({
                                //         variables: {
                                //             objects: {
                                //                 id,
                                //                 bounce_type,
                                //                 email,
                                //                 first_outbound_done,
                                //                 firstname,
                                //                 gender,
                                //                 is_ema_eligible,
                                //                 is_eva_eligible,
                                //                 is_referral,
                                //                 lastname,
                                //                 member_status,
                                //                 phone,
                                //                 position,
                                //                 role,
                                //                 sam_status,
                                //                 second_outbound_done,
                                //                 source,
                                //                 title,
                                //                 to_followup,
                                //                 account_id,
                                //             },
                                //             id
                                //         }
                                //     });
                                // } else {
                                // }
                                // const validationResult = validate(this.state.data, constraints);
                                console.log("referrer_email: ", referrer_email)
                                console.log("account_id: ", account_id)
                                const { apolloClient, campaign_id } = props;
                                let referrer_response = null;
                                let account_id_ = null
                                if((account_id === undefined || account_id === null) && referrer_email !== undefined && referrer_email !== null && referrer_email !== '') {
                                    referrer_response = await apolloClient.query({
                                        query: gql`
                                          query MyQuery($email:String!) {
                                            contact(where: {email: {_eq: $email}}) {
                                              account_id
                                              email
                                              id
                                            }
                                          }
                                        `,
                                        variables: {
                                          email: referrer_email.trim().toLowerCase()
                                        }
                                    })
                                    console.log("referrer_response: ", referrer_response)
                                    account_id_ = referrer_response.data && referrer_response.data.contact && referrer_response.data.contact.length > 0 && referrer_response.data.contact[0].account_id !== undefined ? referrer_response.data.contact[0].account_id : null; 
                                    console.log("referrer_response: ", referrer_response)
                                }
                                console.log("account_id_: ", account_id_)

                                if((account_id !== undefined && account_id !== null) || (account_id_ !== undefined && account_id_ !== null)) {
                                    await mutation({
                                        variables: {
                                            objects: {
                                                bounce_type,
                                                email: email.trim().toLowerCase(),
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
                                                account_id: account_id || account_id_,
                                            }
                                        }
                                    });
                                    const response = await apolloClient.query({
                                        query: gql`
                                          query MyQuery($email:String!) {
                                            contact(where: {email: {_eq: $email}}) {
                                              account_id
                                              email
                                              id
                                            }
                                          }
                                        `,
                                        variables: {
                                          email: email
                                        }
                                    })
                                    console.log('response.data: ', response.data);
                                    if(campaign_id && response.data && response.data.contact && response.data.contact.length > 0 && response.data.contact[0].id  && response.data.contact[0].account_id) {
                                        const contact = response.data.contact[0]
                                        const contact_id = contact.id;
                                        const account_id = contact.account_id;
                                        const mutation_response = await apolloClient.mutate({
                                            mutation: gql`
                                            mutation InsertCampaignContact($objects: [campaign_contact_insert_input!]!) {
                                              insert_campaign_contact(objects: $objects, on_conflict: {constraint: campaign_contact_campaign_id_contact_id_key, update_columns: [campaign_id, account_id, contact_id]}) {
                                                returning {
                                                  id
                                                }
                                              }
                                            }
                                          `,
                                            variables: {
                                                objects: {
                                                    campaign_id,
                                                    account_id,
                                                    contact_id      
                                                }
                                            }
                                        })
                                        console.log('mutation_response.data: ', mutation_response.data);
                                    }  
                                    const { to_refer }  = state;   

                                    if(
                                        campaign_id 
                                        && to_refer
                                        && referrer_response !== null && referrer_response !== undefined  
                                        && referrer_response.data && referrer_response.data.contact && referrer_response.data.contact.length > 0 && referrer_response.data.contact[0].id 
                                        && response.data && response.data.contact && response.data.contact.length > 0 && response.data.contact[0].id
                                    ) {
                                        console.log("to_refer: ", to_refer)
                                        const contact = response.data.contact[0]
                                        const referrer = referrer_response.data.contact[0]
                                        const referree_id = contact.id;
                                        const referrer_id = referrer.id;
                                        const referral_mutation_response = await apolloClient.mutate({
                                            mutation: gql`
                                            mutation InsertCampaignContact($objects: [campaign_referral_insert_input!]!) {
                                                insert_campaign_referral(objects: $objects, on_conflict: {constraint: campaign_referral_referree_id_referrer_id_campaign_id_key, update_columns: [campaign_id, referree_id, referrer_id]}) {
                                                returning {
                                                  id
                                                }
                                              }
                                            }
                                          `,
                                            variables: {
                                                objects: {
                                                    campaign_id,
                                                    referree_id,
                                                    referrer_id      
                                                }
                                            }
                                        })
                                        console.log('referral_mutation_response.data: ', referral_mutation_response.data);
                                    }    
                                    // // insert_campaign_referral
                                }
                                // const createUpdateCampaignContact = 
                              
                                props.closeForm()
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit, errors, isValid, isValidating, touched }) => {
                            console.log("errors: ", errors)
                            console.log("touched: ", touched)
                            console.log("isValid: ", isValid)
                            console.log("isValidating: ", isValidating)
                            return (
                            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
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
                                        {errors.firstname ? (<div style={{color: 'red'}}>{errors.firstname}</div>) : null}
                                        <TextField
                                            name="lastname"
                                            label="Last Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.lastname === null ? '' : values.lastname }
                                        />
                                        {errors.lastname ? (<div style={{color: 'red'}}>{errors.lastname}</div>) : null}
                                        <TextField
                                            name="title"
                                            label="Title" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.title === null ? '' : values.title }
                                        />
                                        {errors.title ? (<div style={{color: 'red'}}>{errors.title}</div>) : null}
                                        <TextField
                                            name="email"
                                            label="Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email === null ? '' : values.email }
                                        />
                                        {errors.email ? <div style={{color: 'red'}}>{errors.email}</div> : null}
                                        <TextField
                                            name="referrer_email"
                                            label="Referrer Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.referrer_email === null ? '' : values.referrer_email }
                                        />
                                        {errors.referrer_email ? <div style={{color: 'red'}}>{errors.referrer_email}</div> : null}
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={state.to_refer}
                                                onChange={handleToReferChange}
                                                name="to_refer"
                                                color="primary"
                                            />
                                            }
                                            label="Refer?"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <Button variant="contained" type='submit' disabled={values.email === '' || values.email === undefined || isValid === false || isValidating === true}>Submit</Button>
                            </form>
                        )}}
                    </Formik>
                )
            }
        </Mutation>
    );
}

export default ManageContactForm
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
    // FormControlLabel,
} from '@material-ui/core';
import gql from 'graphql-tag';

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
        account_id: props.account_id
    };

    // Synchronous validation
    const validate = (values, props /* only available when using withFormik */) => {
        const errors = {};
        console.log("validate values: ", values)
    
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
    
        //...
    
        return errors;
    };
 

    return (
        <Mutation
            mutation={createUpdateContact}
        >
            { 
                mutation => (
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
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
                                // console.log("validationResult: ", validationResult)

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
                                            account_id,
                                        }
                                    }
                                });
                                const { apolloClient, campaign_id } = props;
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
                                // const createUpdateCampaignContact = 
                              
                                props.closeForm()
                            }
                        }
                    >
                        {({ values, handleChange, handleSubmit, errors, isValid, isValidating }) => {
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
                                        <TextField
                                            name="lastname"
                                            label="Last Name" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.lastname === null ? '' : values.lastname }
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
                                            name="email"
                                            label="Email" 
                                            variant="filled" 
                                            margin="normal" 
                                            onChange={handleChange}
                                            value={values.email === null ? '' : values.email }
                                        />
                                        {
                                            errors.email &&
                                            <div style={{color: 'red'}}>
                                                {errors.email}
                                            </div>
                                        }
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
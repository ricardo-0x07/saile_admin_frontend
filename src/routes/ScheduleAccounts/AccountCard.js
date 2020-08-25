import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { deleteScheduleAccount, createUpdateCampaignContact, createUpdateCampaignAccount } from "../../graphql/mutations";


export const AccountCard = ({ account,  schedule,  history, campaign_id, updateReload }) => {
  const { name, address, email, id } = account;
  const account_id = id;
  const removeCampaignAccount = async (createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation, deleteScheduleAccountMutation, campaign_id, account_id) => {
    console.log(createUpdateCampaignAccountMutation)
    console.log(createUpdateCampaignContactMutation)
    console.log("campaign_id: ", campaign_id)
    console.log("account_id: ", account_id)

    // const campaign_contacts_affected = await createUpdateCampaignContactMutation({
    //   variables: {
    //     campaign_id,
    //     account_id,
    //     is_delisted: true,
    //     status: 'Remove'
    //   }
    // });       
    // console.log("campaign_contacts_affected: ", campaign_contacts_affected)                 

    const campaign_accounts_affected = await createUpdateCampaignAccountMutation({
      variables: {
        objects: 
          {
            campaign_id,
            account_id,
            is_scheduled: false,
          }
      }
    });        
    console.log("campaign_accounts_affected: ", campaign_accounts_affected)     
    const schedule_accounts_affected = await deleteScheduleAccountMutation({
      variables: {
        campaign_id,
        account_id,
      }
    });        
    console.log("schedule_accounts_affected: ", schedule_accounts_affected)     
    updateReload()           
  }
  const Composed = adopt({
    createUpdateCampaignAccountMutation: ({ render }) => (
      <Mutation mutation={createUpdateCampaignAccount } >
        { render }
      </Mutation> 
    ),
    createUpdateCampaignContactMutation: ({ render }) => (
      <Mutation mutation={ createUpdateCampaignContact } >
        { render }
      </Mutation> 
    ),
    deleteScheduleAccountMutation: ({ render }) => (
      <Mutation mutation={ deleteScheduleAccount } >
        { render }
      </Mutation> 
    ),
   })
  return (
    <Composed>
      {
        ({ createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation, deleteScheduleAccountMutation }) => {
          return (
            <Card>
              <CardContent>
                <Typography>{name}</Typography>
                <Typography>{address}</Typography>
                <Typography>{email}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => history.push('/app/manage-account', {account, schedule})}>Edit</Button>
                <Button size="small" onClick={() => history.push('/app/manage-contact', {account})}>Add Contact</Button>
                <Button size="small" onClick={() => history.push('/app/contacts-by-account', {account})}>View Contacts</Button>
                <Button variant="contained" color="secondary" size="small" onClick={() => removeCampaignAccount(createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation, deleteScheduleAccountMutation, campaign_id, account_id)}>Remove Account</Button>
              </CardActions>
            </Card>    
          );
        }
      }
    </Composed>
  );
};
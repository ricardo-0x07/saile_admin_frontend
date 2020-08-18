import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import Title from '../../components/Title';

import {createUpdateCampaignAccount, createUpdateCampaignContact } from "../../graphql/mutations";


export const AccountCard = ({ account,  campaign,  history, updateReload }) => {
  const { name, address, email, email_domain, website } = account;
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
    )
  })
  const removeCampaignAccount = async (createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation, campaign_id, account_id) => {
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
            is_delisted: true,
            status: 'Remove'
          }
      }
    });        
    console.log("campaign_accounts_affected: ", campaign_accounts_affected)     
    updateReload()           
  }
  return (
    <Composed>
      {
        ({createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation }) => {
        // () => {
          return (
            <Card>
              <CardContent>
                {name && <Typography variant="caption"  display="block"><Typography variant="button" >Name: </Typography>{name}</Typography>}
                {email_domain && <Typography variant="caption"  display="block"><Typography variant="button" >Email Domain: : </Typography>{email_domain}</Typography>}
                {website && <Typography variant="caption"  display="block"><Typography variant="button" >Website: </Typography>{website}</Typography>}
                {address && <Typography variant="caption"  display="block"><Typography variant="button" >Address: </Typography>{address}</Typography>}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => history.push('/app/manage-account', {account, campaign})}>Edit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={() => removeCampaignAccount(createUpdateCampaignAccountMutation, createUpdateCampaignContactMutation, campaign.id, account.id)}>Remove Account</Button>
                <Button size="small" onClick={() => history.push('/app/manage-contact', {account})}>Add Contact</Button>
                <Button size="small" onClick={() => history.push('/app/contacts-by-account', {account})}>View Contacts</Button>
              </CardActions>
            </Card>
          );
        }
      }
    </Composed>
  );
};
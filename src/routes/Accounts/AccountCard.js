import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { deleteCampaignAccount, deleteCampaignContacts } from "../../graphql/mutations";


export const AccountCard = ({ account,  campaign,  history }) => {
  const { name, address, email } = account;
  const Composed = adopt({
    deleteCampaignAccountMutation: ({ render }) => (
      <Mutation mutation={ deleteCampaignAccount } >
        { render }
      </Mutation> 
    ),
    deleteCampaignContactsMutation: ({ render }) => (
      <Mutation mutation={ deleteCampaignContacts } >
        { render }
      </Mutation> 
    )
  })
  // const removeCampaignAccount = async (deleteCampaignAccountMutation, deleteCampaignContactsMutation, campaign_id, account_id) => {
  //   console.log(deleteCampaignAccountMutation)
  //   console.log(deleteCampaignContactsMutation)
  //   console.log("campaign_id: ", campaign_id)
  //   console.log("account_id: ", account_id)

  //   const campaign_contacts_affected = await deleteCampaignContactsMutation({
  //     variables: {
  //       campaign_id,
  //       account_id
  //     }
  //   });       
  //   console.log("campaign_contacts_affected: ", campaign_contacts_affected)                 

  //   const campaign_accounts_affected = await deleteCampaignAccountMutation({
  //     variables: {
  //       campaign_id,
  //       account_id
  //     }
  //   });        
  //   console.log("campaign_accounts_affected: ", campaign_accounts_affected)                


  // }
  return (
    <Composed>
      {
        // ({ deleteCampaignAccountMutation, deleteCampaignContactsMutation }) => {
        () => {
          return (
            <Card>
              <CardContent>
                <Typography>{name}</Typography>
                <Typography>{address}</Typography>
                <Typography>{email}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => history.push('/app/manage-account', {account, campaign})}>Edit</Button>
                {/* <Button size="small" onClick={() => removeCampaignAccount(deleteCampaignAccountMutation, deleteCampaignContactsMutation, campaign.id, account.id)}>Remove Account</Button> */}
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
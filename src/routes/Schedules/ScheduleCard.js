import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import { listSchedules, listCampaignAccounts } from "../../graphql/queries";
import { createScheduleAccount, updateCampaignAccount } from "../../graphql/mutations";

interface Props {
  name: string;
  address: string;
}

export const ScheduleCard = ({ schedule,  campaign,  history }) => {
  
  const { name, no_targets_per_accounts, daily_outbound_limit } = schedule;
  const accounts_per_schedule = schedule && schedule.accounts_per_schedule && schedule.accounts_per_schedule > 0 ? schedule.accounts_per_schedule : campaign && campaign.accounts_per_schedule ? campaign.accounts_per_schedule : 100;
  // const accounts_per_schedule = campaign && campaign.accounts_per_schedule ? campaign.accounts_per_schedule : 100;

  const addScheduleAccounts = async (schedule, listCampaignAccountsQuery, createScheduleAccountMutation, updateCampaignAccountMutation) => {
    const campaign_accounts = listCampaignAccountsQuery.data && listCampaignAccountsQuery.data.campaign_account ? listCampaignAccountsQuery.data.campaign_account : []
    const schedule_id = schedule.id
    
    const processed = campaign_accounts.map( ( account ) => {
      return {
        account_id: account.account_id,
        schedule_id
      };
    })


    const schedule_accounts_response = await createScheduleAccountMutation({
      variables: {
        objects: processed
      }
    });

    const schedule_account_ids = campaign_accounts.map( acc => acc.id);
    const updated_campaign_accounts = await updateCampaignAccountMutation({
      variables: {
        objects: {is_scheduled: true},
        id_list: schedule_account_ids
      }
    });

  }
  const no_schedule_accounts = schedule.schedule_accounts ? schedule.schedule_accounts.length : 0
  const accounts_to_add = accounts_per_schedule - no_schedule_accounts;

  const Composed = adopt({
    createScheduleAccountMutation: ({ render }) => (
        <Mutation
            mutation={createScheduleAccount}
        >
            {render}
        </Mutation> 
    ),
    updateCampaignAccountMutation: ({ render }) => (
        <Mutation
            mutation={updateCampaignAccount}
        >
            {render}
        </Mutation> 
    ),
  })

  return (
    <Composed>
      {({ createScheduleAccountMutation, updateCampaignAccountMutation }) => {
        return (
          <Card>
            <CardContent>
              <Typography>Name: {name}</Typography>
              <Typography>No of targets per Account: {no_targets_per_accounts}</Typography>
              <Typography>Daily outbound limit: {daily_outbound_limit}</Typography>
              <Typography>Number of Accounts: {schedule.schedule_accounts ? schedule.schedule_accounts.length : 0}/{accounts_per_schedule}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => history.push('/app/manage-schedule', {schedule})}>Edit</Button>
              <Button size="small" onClick={() => history.push('/app/accounts-by-schedule', {schedule})}>View Schedule Accounts</Button>
              {
                campaign && 
                <Query query={listCampaignAccounts(campaign.id, accounts_to_add)} >
                  {(listCampaignAccountsQuery) => 
                    (
                      !(schedule.schedule_accounts.length >= accounts_per_schedule) ?
                      <Button size="small" onClick={() => {
                        if (!listCampaignAccountsQuery.loading) {
                          addScheduleAccounts(schedule, listCampaignAccountsQuery, createScheduleAccountMutation, updateCampaignAccountMutation)
                        }
                      }}>Assign Accounts</Button>
                      : null
                    )
                  }
                </Query>
              }
            </CardActions>
          </Card>

        );
      }}
    </Composed>
  );
};
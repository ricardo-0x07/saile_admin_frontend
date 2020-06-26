import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Subscription, Mutation } from "react-apollo";
import Moment from 'react-moment';
import { adopt } from 'react-adopt';
import { listAvailableCampaignAccounts, listShallowScheduleAccounts } from "../../graphql/subscription";
import { createScheduleAccount, updateCampaignAccount } from "../../graphql/mutations";


export const ScheduleCard = ({ schedule,  campaign,  history }) => {
  
  const { name, no_targets_per_accounts, deploy_date } = schedule;
  const accounts_per_schedule = schedule && schedule.accounts_per_schedule && schedule.accounts_per_schedule > 0 ? schedule.accounts_per_schedule : campaign && campaign.accounts_per_schedule ? campaign.accounts_per_schedule : 100;

  const addScheduleAccounts = async (schedule, listShallowScheduleAccountsSubscription, listCampaignAccountsSubscription, createScheduleAccountMutation, updateCampaignAccountMutation, accounts_to_add) => {
    const campaign_accounts = listCampaignAccountsSubscription.data && listCampaignAccountsSubscription.data.campaign_account ? listCampaignAccountsSubscription.data.campaign_account : []
    const schedule_accounts = listShallowScheduleAccountsSubscription.data && listShallowScheduleAccountsSubscription.data.schedule_account ? listShallowScheduleAccountsSubscription.data.schedule_account.map(acc => acc.account_id) : []
    const schedule_id = schedule.id
    const campaign_id = schedule.campaign_id
    
    const processed = campaign_accounts.filter(acc => !schedule_accounts.includes(acc.account_id) ).splice(0,accounts_to_add).map( ( account ) => {
      return {
        account_id: account.account_id,
        schedule_id,
        campaign_id
      };
    })


    await createScheduleAccountMutation({
      variables: {
        objects: processed
      }
    });

    const schedule_account_ids = campaign_accounts.map( acc => acc.id);
    await updateCampaignAccountMutation({
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
    )
  })
  const ComposedAddAccount = adopt({
    listCampaignAccountsSubscription: ({ render }) => (
      <Subscription subscription={listAvailableCampaignAccounts(campaign.id, false)} >
        {render}
      </Subscription> 
    ),
    listShallowScheduleAccountsSubscription: ({ render }) => (
      <Subscription subscription={listShallowScheduleAccounts(campaign.id)} >
        {render}
      </Subscription> 
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
              <Typography>
                Deploy Date: <Moment format="YYYY-MMM-DD" date={deploy_date !== null && deploy_date }></Moment>
              </Typography>
              <Typography>Number of Accounts: {schedule.schedule_accounts ? schedule.schedule_accounts.length : 0}/{accounts_per_schedule}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => history.push('/app/manage-schedule', {schedule, campaign})}>Edit</Button>
              <Button size="small" onClick={() => history.push('/app/accounts-by-schedule', {schedule})}>View Schedule Accounts</Button>
              {
                campaign && 
                <ComposedAddAccount >
                  {({ listShallowScheduleAccountsSubscription, listCampaignAccountsSubscription }) => 
                    (
                      !(schedule.schedule_accounts.length >= accounts_per_schedule) ?
                      <Button size="small" onClick={() => {
                        if (!listShallowScheduleAccountsSubscription.loading && !listCampaignAccountsSubscription.loading) {
                          addScheduleAccounts(schedule, listShallowScheduleAccountsSubscription, listCampaignAccountsSubscription, createScheduleAccountMutation, updateCampaignAccountMutation, accounts_to_add)
                        }
                      }}>Assign Accounts</Button>
                      : null
                    )
                  }
                </ComposedAddAccount>
              }
            </CardActions>
          </Card>

        );
      }}
    </Composed>
  );
};
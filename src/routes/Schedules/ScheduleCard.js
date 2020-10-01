import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Subscription, Mutation, Query } from "react-apollo";
import Moment from 'react-moment';
import { adopt } from 'react-adopt';
import { listAvailableCampaignAccounts, listShallowScheduleAccounts } from "../../graphql/subscription";
import { createScheduleAccount, updateCampaignAccount, deleteScheduleAccount } from "../../graphql/mutations";
import { getScheduleById } from "../../graphql/queries";
import gql from 'graphql-tag';
// import { wait } from "@testing-library/react";

export const ScheduleCard = ({ schedule, requirement,  campaign,  history, schedule_campaign_accounts_to_remove, apolloClient }) => {
  const [data, updateData] = React.useState();
  const { name, no_targets_per_accounts, deploy_date, end_date, id, campaign_id } = schedule;
  const { elasticity } = requirement;
  console.log('elasticity: ', elasticity);

  const getScheduledContactsCount = () => {
    return schedule.schedule_accounts.reduce(  async (dataP, curr) => {
      const data = await dataP;
      // console.log('data: ', data);
      const { account_id } = curr;
      const response = await apolloClient.query({
        query: gql`
          query MyQuery($account_id:Int!, $campaign_id:Int!, $elasticity:Int!) {
            campaign_contact(where: {account_id: {_eq: $account_id}, is_delisted: {_eq: false}, campaign_id: {_eq: $campaign_id}}, limit: $elasticity, order_by: {id: asc}) {
              contact_id
            }
          }
        `,
        variables: {
          account_id: account_id,
          campaign_id: campaign_id,
          elasticity: elasticity
        }
      })
      // console.log('response.data: ', response.data);
      if(response.data && response.data.campaign_contact && response.data.campaign_contact.length) {
        return data.concat(response.data.campaign_contact);
      } else {
        return data;
      }
    }, [])
  }

  React.useEffect(() => {
    const getData = async () => {
      const resp = await getScheduledContactsCount();
      // const json = await resp.json()
      updateData(resp);
    }
    getData();
  }, []);

  
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
  const clear_delisted = async (deleteScheduleAccountMutation, getScheduleByIdQuery) => {
    if (getScheduleByIdQuery && getScheduleByIdQuery.data && getScheduleByIdQuery.data.schedule.length > 0) {
      const _objects_ = await getScheduleByIdQuery.data.schedule.map(async sched => {
        const { campaign_id } = sched;
        const campaign_accounts = await sched.schedule_accounts.map( async item => {
          const schedule_accounts_affected = await deleteScheduleAccountMutation({
            variables: {
              campaign_id,
              account_id: item.account_id,
            }
          });        
          // return {
          //   campaign_id,
          //   account_id: item.account_id,
          // }
          console.log("schedule_accounts_affected: ", schedule_accounts_affected)     
        });
        console.log('campaign_accounts: ', campaign_accounts);
        return campaign_accounts
      });
      console.log('_objects_: ', _objects_);
      console.log('_objects_.length: ', _objects_.length);
    }
  }


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
    deleteScheduleAccountMutation: ({ render }) => (
      <Mutation
          mutation={deleteScheduleAccount}
      >
          {render}
      </Mutation> 
  ),
  getScheduleByIdQuery: ({ render }) => (
      <Query query={getScheduleById(schedule.id, campaign.id, true)} >
        {render}
      </Query> 
    ),
    // total_campaign_contacts: GetScheduledContactsCount()
  })
  // const total_campaign_contacts = 0

  
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
  console.log('schedule_campaign_accounts_to_remove: ', schedule_campaign_accounts_to_remove);

  return (
    <Composed>
      {({ createScheduleAccountMutation, updateCampaignAccountMutation, getScheduleByIdQuery, deleteScheduleAccountMutation }) => {

        return (
          <Card>
            <CardContent>
              <Typography>Name: {name}</Typography>
              <Typography>Id: {id}</Typography>
              <Typography>Schedule Elasticity: {no_targets_per_accounts}</Typography>
              {
                requirement && 
                <Typography>Campaign Elasticity: {requirement.elasticity}</Typography>
              }
              <Typography>
                Deploy Date: <Moment format="YYYY-MMM-DD" date={deploy_date !== null && deploy_date }></Moment>
              </Typography>
              {
                end_date && 
                <Typography>
                  End Date: <Moment format="YYYY-MMM-DD" date={end_date !== null && end_date }></Moment>
                </Typography>
              }
              <Typography>Number of Accounts: {schedule.schedule_accounts ? schedule.schedule_accounts.length : 0}/{accounts_per_schedule}</Typography>
              {
                data && data.length >0 &&
                <div>
                  <Typography>Number of Contacts: {data && data.length ? data.length : 0 }</Typography>
                  <Typography>Average Elasticity: {data && schedule.schedule_accounts && schedule.schedule_accounts.length > 0 && data.length > 0 ? (data.length/schedule.schedule_accounts.length).toFixed(2) : 0 }</Typography>
                </div>
              }
              
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => history.push('/app/manage-schedule', {schedule, campaign})}>Edit</Button>
              <Button size="small" onClick={() => history.push('/app/accounts-by-schedule', {schedule})}>View Schedule Accounts</Button>
              {
                getScheduleByIdQuery.data !== undefined && getScheduleByIdQuery.data.schedule.length > 0 && getScheduleByIdQuery.data.schedule[0] !== undefined && getScheduleByIdQuery.data.schedule[0].schedule_accounts.length > 0 && 
                <Button variant="contained" color="secondary" size="small" onClick={() => clear_delisted(deleteScheduleAccountMutation, getScheduleByIdQuery)}>Clear Delisted ({getScheduleByIdQuery.data.schedule[0].schedule_accounts.length})</Button>
              }
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
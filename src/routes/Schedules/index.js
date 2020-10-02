import * as React from "react";
import { Query, Subscription } from "react-apollo";
import { adopt } from 'react-adopt';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

import { ScheduleCard } from "./ScheduleCard";
import { listCampaignSchedules } from "../../graphql/subscription";
import { listSchedules } from "../../graphql/queries";
import Title from '../../components/Title';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Schedules = (props) => {
  console.log('Schedules props: ', props);
  const classes = useStyles();


  const accounts_per_schedule = props.location.state && props.location.state.campaign && props.location.state.campaign.accounts_per_schedule ? props.location.state.campaign.accounts_per_schedule : 100;
  const Composed = adopt({
    listSchedulesQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listCampaignSchedules(props.location.state.campaign.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Query query={listSchedules(10) } >
        { render }
      </Query>
    ),
    listDelistedSchedulesCampaignAccountsQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listCampaignSchedules(props.location.state.campaign.id,true)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Query query={listSchedules(10, true) } >
        { render }
      </Query>
    ),
  })


  return (
    <Composed>
      {({ listSchedulesQuery: { data, loading }, listDelistedSchedulesCampaignAccountsQuery }) => {
        if (
          loading ||
          !data ||
          !data.schedule ||
          !data.schedule ||
          listDelistedSchedulesCampaignAccountsQuery.loading ||
          !listDelistedSchedulesCampaignAccountsQuery.data ||
          !listDelistedSchedulesCampaignAccountsQuery.data.schedule 
        ) {
          return null;
        }
        console.log('data: ', data);
        console.log('listDelistedSchedulesCampaignAccountsQuery: ', listDelistedSchedulesCampaignAccountsQuery);


        return (
          <div className={classes.root}>
            <Title>Schedules</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-schedule', {campaign: props.location.state.campaign})}>Add Schedule</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign && props.location.state.sailebot ?
                data.schedule.filter(item => item.campaign_id === props.location.state.campaign.id ).map(x => (
                  <ScheduleCard apolloClient={props.client} schedule_campaign_accounts_to_remove={listDelistedSchedulesCampaignAccountsQuery.data.schedule} sailebot={props.location.state.sailebot} schedule={x} accounts_per_schedule={accounts_per_schedule} campaign={props.location.state.campaign} requirement={props.location.state.requirement} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.schedule.filter(item => item ).map(x => (
                  <ScheduleCard apolloClient={props.client} schedule_campaign_accounts_to_remove={[]} schedule={x} accounts_per_schedule={accounts_per_schedule} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Schedules
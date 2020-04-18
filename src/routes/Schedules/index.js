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
  })


  return (
    <Composed>
      {({ listSchedulesQuery: { data, loading } }) => {
        if (
          loading ||
          !data ||
          !data.schedule ||
          !data.schedule
        ) {
          return null;
        }


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
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                data.schedule.filter(item => item.campaign_id === props.location.state.campaign.id ).map(x => (
                  <ScheduleCard schedule={x} accounts_per_schedule={accounts_per_schedule} campaign={props.location.state.campaign} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.schedule.filter(item => item ).map(x => (
                  <ScheduleCard schedule={x} accounts_per_schedule={accounts_per_schedule} name={x.name} key={x.id}  history={props.history} />
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
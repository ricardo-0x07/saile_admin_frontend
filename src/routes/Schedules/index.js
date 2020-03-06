import * as React from "react";
import { Query } from "react-apollo";

import { ScheduleCard } from "./ScheduleCard";
import { listSchedules } from "../../graphql/queries";
import Title from '../../components/Title';



const Schedules = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listSchedules(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.schedule ||
          !data.schedule
        ) {
          return null;
        }

        console.log(data.schedule);

        return (
          <div>
            <Title>Schedules</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                data.schedule.filter(item => item.campaign_id === props.location.state.campaign.id ).map(x => (
                  <ScheduleCard schedule={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.schedule.filter(item => item ).map(x => (
                  <ScheduleCard schedule={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Schedules
import * as React from "react";
import { Query } from "react-apollo";

import { EventCard } from "./EventCard";
import { listEvents } from "../../graphql/queries";


const Events = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listEvents(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.event ||
          !data.event
        ) {
          return null;
        }

        console.log(data.event);

        return (
          <div
            style={{
              display: "grid",
              gridEventColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {
              props.location.state && props.location.state.contact  && props.location.state.contact ?
              data.event.filter(item => item.contact_id === props.location.state.contact.id ).map(x => (
                <EventCard event={x} name={x.name} key={x.id} history={props.history}/>
              ))
              :
              data.event.filter(item => item ).map(x => (
                <EventCard event={x} name={x.name} key={x.id}  history={props.history} />
              ))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default Events
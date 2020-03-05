import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { SaileBotCard } from "./SaileBotCard";
import { listSaileBots } from "../../graphql/queries";


const SaileBots = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listSaileBots(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.sailebot ||
          !data.sailebot
        ) {
          return null;
        }

        console.log(data.sailebot);

        return (
          <div
            style={{
              display: "grid",
              gridSaileBotColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {
              props.location.state && props.location.state.client  && props.location.state.client ?
              data.sailebot.filter(item => item.client_id === props.location.state.client.id ).map(x => (
                <SaileBotCard sailebot={x} name={x.name} key={x.id} history={props.history}/>
              ))
              :
              data.sailebot.filter(item => item ).map(x => (
                <SaileBotCard sailebot={x} name={x.name} key={x.id}  history={props.history} />
              ))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default SaileBots
import * as React from "react";
import { Query } from "react-apollo";

import { RequirementCard } from "./RequirementCard";
import { listRequirements } from "../../graphql/queries";


const Requirements = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listRequirements(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.requirement ||
          !data.requirement
        ) {
          return null;
        }

        console.log(data.requirement);

        return (
          <div
            style={{
              display: "grid",
              gridRequirementColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {
              props.location.state && props.location.state.sailebot  && props.location.state.sailebot ?
              data.requirement.filter(item => item.sailebot_id === props.location.state.sailebot.id ).map(x => (
                <RequirementCard requirement={x} name={x.name} key={x.id} history={props.history}/>
              ))
              :
              data.requirement.filter(item => item ).map(x => (
                <RequirementCard requirement={x} name={x.name} key={x.id}  history={props.history} />
              ))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default Requirements
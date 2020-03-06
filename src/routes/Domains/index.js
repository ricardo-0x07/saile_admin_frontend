import * as React from "react";
import { Query } from "react-apollo";

import { DomainCard } from "./DomainCard";
import { listDomains } from "../../graphql/queries";
import Title from '../../components/Title';



const Domains = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listDomains(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.domain ||
          !data.domain
        ) {
          return null;
        }

        console.log(data.domain);

        return (
          <div>
            <Title>Domains</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.sailebot  && props.location.state.sailebot ?
                data.domain.filter(item => item.sailebot_id === props.location.state.sailebot.id ).map(x => (
                  <DomainCard domain={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.domain.filter(item => item ).map(x => (
                  <DomainCard domain={x} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Domains
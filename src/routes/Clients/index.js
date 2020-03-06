import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ClientCard } from "./ClientCard";
import { listClients } from "../../graphql/queries";
import Title from '../../components/Title';



const Clients = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listClients(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.client ||
          !data.client
        ) {
          return null;
        }

        console.log(data.client);

        return (
          <div>
            <Title>Clients</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.company  && props.location.state.company ?
                data.client.filter(item => item.company_id === props.location.state.company.id ).map(x => (
                  <ClientCard client={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.client.filter(item => item ).map(x => (
                  <ClientCard client={x} name={x.name} key={x.id}  history={props.history}/>
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Clients
import * as React from "react";
import { Query } from "react-apollo";

import { AccountCard } from "./AccountCard";
import { listAccounts } from "../../graphql/queries";
import Title from '../../components/Title';


const Accounts = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listAccounts(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.account ||
          !data.account
        ) {
          return null;
        }

        console.log(data.account);

        return (
          <div>
            <Title>Accounts</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.sailebot  && props.location.state.sailebot ?
                data.account.filter(item => item.sailebot_id === props.location.state.sailebot.id ).map(x => (
                  <AccountCard account={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.account.filter(item => item ).map(x => (
                  <AccountCard account={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Accounts
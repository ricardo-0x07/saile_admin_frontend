import * as React from "react";
import { Query } from "react-apollo";

import { ContactCard } from "./ContactCard";
import { listContacts } from "../../graphql/queries";


const Contacts = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listContacts(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.contact ||
          !data.contact
        ) {
          return null;
        }

        console.log(data.contact);

        return (
          <div
            style={{
              display: "grid",
              gridContactColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {
              props.location.state && props.location.state.account  && props.location.state.account ?
              data.contact.filter(item => item.account_id === props.location.state.account.id ).map(x => (
                <ContactCard contact={x} name={x.name} key={x.id} history={props.history}/>
              ))
              :
              data.contact.filter(item => item ).map(x => (
                <ContactCard contact={x} name={x.name} key={x.id}  history={props.history} />
              ))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default Contacts
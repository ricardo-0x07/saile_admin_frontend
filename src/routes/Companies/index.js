import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { CompanyCard } from "./CompanyCard";
import { listCompanies } from "../../graphql/queries";


const Companies = (props) => {
  return (
    <Query
      query={listCompanies(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.company ||
          !data.company
        ) {
          return null;
        }

        console.log(data.company);

        return (
          <div
            style={{
              display: "grid",
              gridCompanyColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {data.company.map(x => (
              <CompanyCard company={x} history={props.history} key={x.id} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Companies
import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { CompanyCard } from "./CompanyCard";
import { listCompanies } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Companies = (props) => {
  return (
    <Query
      query={listCompanies(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        if (
          loading ||
          !data ||
          !data.company ||
          !data.company
        ) {
          return null;
        }


        return (
          <div>
            <Title>Companies</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {data.company.map(x => (
                <CompanyCard company={x} history={props.history} key={x.id} />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Companies
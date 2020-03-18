import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ClientCard } from "./ClientCard";
import { listClients } from "../../graphql/queries";
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



const Clients = (props) => {
  const classes = useStyles();
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
          <div className={classes.root}>
            <Title>Clients</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-client')}>Add Client</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
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
import * as React from "react";
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import { ClientCard } from "./ClientCard";
import { listClients, listCompanyUserClients } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Clients = (props) => {
  console.log('props: ', props)
  const classes = useStyles();
  const Composed = adopt({
    clientsQuery: props.location.state && props.location.state.company && props.location.state.company.id ?
    ({ render }) => (
      <Query query={listCompanyUserClients(props.location.state.company.id)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listClients(10) } >
        { render }
      </Query>
    ),
  })

  return (
    <Composed>
      {({ clientsQuery: {data, loading} }) => {
        if (
          loading ||
          !data ||
          !data.client ||
          !data.client
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>Clients</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-client', {company: props.location.state.company})}>Add Client</Button>
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
    </Composed>
  );
};

// export default Clients

export default connect(
  state => ({
    admin: state.admin,
    routing: state.routing
  })
)(Clients);

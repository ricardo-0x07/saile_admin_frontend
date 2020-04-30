import * as React from "react";
import { Subscription } from "react-apollo";
import { connect } from 'react-redux';
import { ClientCard } from "./ClientCard";
import { listClients } from "../../graphql/subscription";
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
  return (
    <Subscription
    subscription={listClients(10)}
    >
      {({ data, loading }) => {
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
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-client')}>Add Client</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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
    </Subscription>
  );
};

// export default Clients

export default connect(
  state => ({
    admin: state.admin,
    routing: state.routing
  })
)(Clients);

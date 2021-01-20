import * as React from "react";
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import { ClientCard } from "./ClientCard";
import { /*listClients,*/ listCompanyUserClients, listNullCompanyIdClients, totalCompanyClients, totalNullCompanyClients } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import Pagination from '@material-ui/lab/Pagination';

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
  let total = 1;
  let limit = props.location.state && props.location.state.company && props.location.state.company.id ? 1 : 10;
  
  const [state, setState] = React.useState({
    reload: false,
    page: 1
  });
  const { page } = state;
  const handleChange = (event, value) => {
    setState({ page: value})
  };
  const Composed = adopt({
    totalClientsQuery: props.location.state && props.location.state.company && props.location.state.company.id ?
    ({ render }) => (
      <Query query={totalCompanyClients(props.location.state.company.id)} >
        { render }
      </Query>
    )
    : ({ render }) => (
      <Query query={totalNullCompanyClients()} >
        { render }
      </Query>
    ), 
    clientsQuery: props.location.state && props.location.state.company && props.location.state.company.id ?
    ({ render }) => (
      <Query query={listCompanyUserClients(props.location.state.company.id, limit, (page-1) * limit)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listNullCompanyIdClients(limit, (page-1) * limit) } >
        { render }
      </Query>
    ),
  })

  return (
    <Composed>
      {({ clientsQuery: {data, loading}, totalClientsQuery }) => {
        if (
          loading ||
          !data ||
          !data.client ||
          !data.client
        ) {
          return null;
        }
        console.log('clientsQuery data: ', data)

        if (!totalClientsQuery.loading) {
          console.log('totalClientsQuery: ', totalClientsQuery)
          total =  Math.ceil(totalClientsQuery.data.client_aggregate.aggregate.count/limit)
        }

        return (
          <div className={classes.root}>
            <Title>Clients</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-client', {company: props.location.state.company})}>Add Client</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                data.client.filter(item => item ).map(x => (
                  <ClientCard client={x} name={x.name} key={x.id}  history={props.history} company={props.location.state.company}/>
                ))
              }
            </div>
            <div className={classes.root}>
              <Pagination count={total} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
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

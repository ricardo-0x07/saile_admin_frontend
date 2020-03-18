import * as React from "react";
import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import { gql, useQuery } from '@apollo/client';
// import { useQuery, useMutation } from '@apollo/react-hooks'


import { SaileBotCard } from "./SaileBotCard";
import { listSaileBots, GET_ALL_SAILEBOTS } from "../../graphql/queries";
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
// export const GET_ALL_CLIENTS =gql`
//     query ListClients($limit: Int!, $offset: Int) {
//         client(limit: $limit, offset: $offset) {
//             NAICS
//             address
//             city
//             country
//             created_at
//             domain
//             email
//             email_domain
//             employees
//             id
//             is_company
//             name
//             phone
//             revenue
//             state
//             updated_at
//             website
//     }
//   }
// `;



const SaileBots = (props) => {
  const classes = useStyles();
  // const { sailebot_lists_loading, error, sailebot_lists_data } = useQuery(GET_ALL_CLIENTS, {
  //   variables: { limit: 10, offset: 0 },
  // })
  // console.log('sailebot_lists_loading: ', sailebot_lists_loading);
  // console.log('error: ', error);
  // console.log('sailebot_lists_data: ', sailebot_lists_data);
  // console.log('props: ', props);
  return (
    <Query
      query={listSaileBots(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.sailebot ||
          !data.sailebot
        ) {
          return null;
        }

        console.log(data.sailebot);

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.client  && props.location.state.client ? props.location.state.client.name : ''} SaileBots</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-sailebot', {client: props.location.state.client})}>Add SaileBot</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              
              {
                props.location.state && props.location.state.client  && props.location.state.client ?
                data.sailebot.filter(item => item.client_id === props.location.state.client.id ).map(x => (
                  <SaileBotCard sailebot={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.sailebot.filter(item => item ).map(x => (
                  <SaileBotCard sailebot={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default SaileBots
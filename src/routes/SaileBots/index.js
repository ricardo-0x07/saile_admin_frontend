import * as React from "react";
import { Query } from "react-apollo";
import { SaileBotCard } from "./SaileBotCard";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import { listSaileBots, listClientSaileBots } from "../../graphql/queries";
import Title from '../../components/Title';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));




const SaileBots = (props) => {
  const classes = useStyles();
  const Composed = adopt({
    sailebotsQuery: props.location.state && props.location.state.client && props.location.state.client.id ?
    ({ render }) => (
      <Query query={listClientSaileBots(props.location.state.client.id)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listSaileBots(10) } >
        { render }
      </Query>
    ),
  })
  console.log('props.location.state: ', props.location.state)
  return (
    <Composed>
      {({ sailebotsQuery: {data, loading} }) => {
        if (
          loading ||
          !data ||
          !data.sailebot ||
          !data.sailebot
        ) {
          return null;
        }
        console.log('data.sailebot: ', data.sailebot)
        

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.client  && props.location.state.client ? props.location.state.client.name : 'All'} SaileBots</Title>
            {
              props.location.state && props.location.state.client  && props.location.state.client && 
              <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-sailebot', {client: props.location.state.client})}>Add SaileBot</Button>
            }
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: 10
              }}
            >
              
              {
                props.location.state && props.location.state.client  && props.location.state.client ?
                data.sailebot.filter(item => item.client_id === props.location.state.client.id ).map(x => (
                  <SaileBotCard sailebot={x} name={x.name} key={x.id} history={props.history} client={props.location.state.client} company={props.location.state.company}/>
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
    </Composed>
  );
};

export default SaileBots
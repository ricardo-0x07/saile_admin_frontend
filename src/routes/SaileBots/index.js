import * as React from "react";
import { Subscription } from "react-apollo";
import { SaileBotCard } from "./SaileBotCard";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import { listSaileBots, listClientSaileBots } from "../../graphql/subscription";
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
    sailebotsQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listClientSaileBots(props.location.state.client.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listSaileBots(10) } >
        { render }
      </Subscription>
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
                  <SaileBotCard sailebot={x} name={x.name} key={x.id} history={props.history} client={props.location.state.client}/>
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
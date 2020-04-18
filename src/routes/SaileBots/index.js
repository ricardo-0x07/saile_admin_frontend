import * as React from "react";
import { Subscription } from "react-apollo";
import { SaileBotCard } from "./SaileBotCard";
import { listSaileBots } from "../../graphql/subscription";
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




const SaileBots = (props) => {
  const classes = useStyles();
  return (
    <Subscription
      subscription={listSaileBots(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
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
            <Title>{props.location.state && props.location.state.client  && props.location.state.client ? props.location.state.client.name : ''} SaileBots</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-sailebot', {client: props.location.state.client})}>Add SaileBot</Button>
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
    </Subscription>
  );
};

export default SaileBots
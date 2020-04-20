import * as React from "react";
import { Subscription } from "react-apollo";
import { AccountCard } from "./AccountCard";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import { listAccounts, listScheduleAccounts } from "../../graphql/subscription";



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Accounts = (props) => {
  const classes = useStyles();

  const Composed = adopt({
    accountsScubsciption: props.location.state && props.location.state.schedule && props.location.state.schedule.id ?
    ({ render }) => (
      <Subscription subscription={listScheduleAccounts(props.location.state.schedule.id, 100)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listAccounts(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ accountsScubsciption: { data, loading } }) => {
        if (
          loading ||
          !data ||
          (!data.account && !data.schedule_account )
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.schedule  && props.location.state.schedule ? props.location.state.schedule.name : '' } Schedule Accounts</Title>
            {/* <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-account', {schedule: props.location.state.schedule})}>Add Account</Button> */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.schedule  && props.location.state.schedule ?
                data.schedule_account.map(x => (
                  <AccountCard account={x.account} name={x.account.name} key={x.account.id} history={props.history} schedule={props.location.state.schedule}/>
                ))
                :
                data.account.filter(item => item ).map(x => (
                  <AccountCard account={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Accounts
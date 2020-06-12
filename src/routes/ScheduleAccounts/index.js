import * as React from "react";
import { Subscription } from "react-apollo";
import { AccountCard } from "./AccountCard";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { adopt } from 'react-adopt';
import { listAccounts, totalScheduleAccounts, listScheduleAccounts } from "../../graphql/subscription";



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Accounts = (props) => {
  const classes = useStyles();
  const limit = 10
  let total = 10
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    // value = value * total;
    setPage(value);
  };
  const Composed = adopt({
    totalScheduleAccountsScubsciption: ({ render }) => (
      <Subscription subscription={totalScheduleAccounts(props.location.state.schedule.id)} >
        { render }
      </Subscription>
    ),
    accountsScubsciption: props.location.state && props.location.state.schedule && props.location.state.schedule.id ?
    ({ render }) => (
      <Subscription subscription={listScheduleAccounts(props.location.state.schedule.id, limit, (page-1) * limit)} >
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
      {({ accountsScubsciption: { data, loading }, totalScheduleAccountsScubsciption }) => {
        if (
          loading ||
          !data ||
          (!data.account && !data.schedule_account )
        ) {
          return null;
        }
        console.log('data.schedule_account: ', data.schedule_account)
        if (!totalScheduleAccountsScubsciption.loading) {
          console.log('totalScheduleAccountsScubsciption: ', totalScheduleAccountsScubsciption)
          total = Math.ceil(totalScheduleAccountsScubsciption.data.schedule_account_aggregate.aggregate.count/limit)
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
                  <AccountCard account={x.account} name={x.account.name} key={x.account.id} history={props.history} schedule={props.location.state.schedule} sailebot={props.location.state.sailebot}/>
                ))
                :
                data.account.filter(item => item ).map(x => (
                  <AccountCard account={x} name={x.name} key={x.id}  history={props.history} />
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

export default Accounts
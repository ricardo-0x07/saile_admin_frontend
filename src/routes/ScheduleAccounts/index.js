import * as React from "react";
import { Query } from "react-apollo";
import { AccountCard } from "./AccountCard";
import Title from '../../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { adopt } from 'react-adopt';
import { listAccounts, totalScheduleAccounts, listScheduleAccounts } from "../../graphql/queries";



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
  let total = 1
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    // value = value * total;
    setPage(value);
  };
  const Composed = adopt({
    totalScheduleAccountsScubsciption: ({ render }) => (
      <Query query={totalScheduleAccounts(props.location.state.schedule.id)} >
        { render }
      </Query>
    ),
    accountsScubsciption: props.location.state && props.location.state.schedule && props.location.state.schedule.id ?
    ({ render }) => (
      <Query query={listScheduleAccounts(props.location.state.schedule.id, limit, (page-1) * limit)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listAccounts(10) } >
        { render }
      </Query>
    ),
  })

  return (
    <Composed>
      {({ accountsScubsciption: { data, refetch, loading, error }, totalScheduleAccountsScubsciption }) => {
        console.log('data: ', data);
        console.log('loading: ', loading);
        console.log('error: ', error);
        console.log('refetch: ', refetch);
        // const { loading, data, refetch, fetchMore }  = accountsQuery
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
                  <AccountCard
                    account={x.account}
                    name={x.account.name}
                    campaign_id={props.location.state.schedule.campaign_id}
                    key={x.account.id} history={props.history}
                    schedule={props.location.state.schedule}
                    sailebot={props.location.state.sailebot}
                    updateReload={() => {
                      refetch();
                    }}
                  />
                ))
                :
                data.account.filter(item => item ).map(x => (
                  <AccountCard 
                    account={x}
                    name={x.name}
                    key={x.id}
                    history={props.history}
                    updateReload={() => {
                      refetch();
                    }}
                  />
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
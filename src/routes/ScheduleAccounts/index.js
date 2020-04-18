import * as React from "react";
import { Subscription, Mutation } from "react-apollo";
import { AccountCard } from "./AccountCard";
import Title from '../../components/Title';
import AccountsCSVReader from '../../components/AccountsCSVReader';
import ContactsCSVReader from '../../components/ContactsCSVReader';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
import { listAccounts, listScheduleAccounts, listCampaignAccounts, listAllCampaignAccounts, getAccountByExtrenalId, get_accounts_by_campaign_id } from "../../graphql/subscription";
import { createAccount, createCampaignAccount, updateAccount, createContact, updateContact, } from "../../graphql/mutations";



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Accounts = (props) => {
  const classes = useStyles();
  const accounts_csv_key_map = {
    name: 'Account: Account Name',
    address: 'Account: Billing Street',
    domain: '',
    email: '',
    employees: 'Account: Employees',
    phone: 'Account: Main Phone',
    revenue: 'Account: Revenue ($mil)',
    state  : 'Account: Billing State/Province',
    website  : 'Account: Website',
    email_domain: 'Account: Email Domain',
    NAICS: 'Account: Primary US NAICS Code',
    city: 'Account: Billing City',
    country: 'Account: Billing Country',
    is_scheduled: '',
    ex_id: 'Account: Account ID',
  };

  const contacts_csv_key_map = {
    bounce_type: '',
    email: 'Email',
    firstname: 'First Name',
    gender: 'Gender',
    is_ema_eligible: 'EMA Eligible?',
    is_eva_eligible: 'EVA Eligible?',
    lastname: 'Last Name',
    member_status: 'Member Status',
    phone: '',
    position: '',
    role: '',
    sam_status: '',
    source: '',
    title: 'Title',
    ex_id: 'Contact ID',
    ex_account_id: 'Account ID',
    ex_member_id: 'Member ID',
    linkedin: 'LinkedIn URL',
    city: 'Billing City',
    state: 'Billing State/Province',
    country: 'Billing Country',
  };

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
                  <AccountCard account={x.account} name={x.account.name} key={x.account.id} history={props.history}/>
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
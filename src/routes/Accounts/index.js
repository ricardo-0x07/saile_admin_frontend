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
    employees: 'Account: Employees',
    phone: 'Account: Main Phone',
    revenue: 'Account: Revenue ($mil)',
    state  : 'Account: Billing State/Province',
    website  : 'Account: Website',
    email_domain: 'Account: Email Domain',
    NAICS: 'Account: Primary US NAICS Code',
    city: 'Account: Billing City',
    country: 'Account: Billing Country',
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
    role: 'Role',
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
    accountsQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listCampaignAccounts(props.location.state.campaign.id, 100)} >
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
      {({ accountsQuery: { data, loading } }) => {
        if (
          loading ||
          !data ||
          (!data.account && !data.campaign_account )
        ) {
          return null;
        }

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.campaign  && props.location.state.campaign ? props.location.state.campaign.name : '' } Accounts</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-account', {campaign: props.location.state.campaign})}>Add Account</Button>
            {
              props.location.state && props.location.state.campaign && props.location.state.campaign.id && 
              <>
                <ContactsCSVReader location={props.location} contacts_csv_key_map={contacts_csv_key_map} campaign_id={props.location.state.campaign.id} label={'Contacts'} />
                <AccountsCSVReader location={props.location} accounts_csv_key_map={accounts_csv_key_map} campaign_id={props.location.state.campaign.id} label={'Accounts'} />
              </>
            }
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                data.campaign_account.map(x => (
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
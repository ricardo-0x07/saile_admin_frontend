import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import { Query, Mutation } from "react-apollo";
import { AccountCard } from "./AccountCard";
import Title from '../../components/Title';
// import AccountsCSVReader from '../../components/AccountsCSVReader';
// import ContactsCSVReader from '../../components/ContactsCSVReader';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
// import CampaignSimpleSelect from './CampaignSimpleSelect';
import { ListAccounts, ListCampaignAccounts, totalCampaignAccounts } from "../../graphql/queries";
// import { ListAccounts, ListCampaignAccounts, listAllCampaignAccounts, totalCampaignAccounts } from "../../graphql/queries";
import { updateSingleCampaignAccount, } from "../../graphql/mutations";

import debounce from 'lodash/debounce' // 1
// import IntegrationReactSelect from './AccountsSelect'
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const Accounts = (props) => {
  const classes = useStyles();
  // const handleSelectChange= async (item) => {
  //   console.log('item: ', item)
  // }
  let total = 10;
  const limit = 5;
  let _page = 1
  // let search_term = `%${''}%`
  

  const [state, setState] = React.useState({
    reload: false,
    page: 1,
    searchQuery: '',
    search_term: `%${''}%`,
    email_domain_search_term: `%${''}%`,
    campaign_id: props.location.state.campaign !== undefined ? props.location.state.campaign.id : null,
  });
  const { page, search_term, email_domain_search_term } = state;
  _page = page
  // const accounts_csv_key_map = {
  //   name: 'Account: Account Name',
  //   address: 'Account: Billing Street',
  //   street: 'Account: Billing Street',
  //   employees: 'Account: Employees',
  //   phone: 'Account: Main Phone',
  //   revenue: 'Account: Revenue ($mil)',
  //   state  : 'Account: Billing State/Province',
  //   website  : 'Account: Website',
  //   email_domain: 'Account: Email Domain',
  //   NAICS: 'Account: Primary US NAICS Code',
  //   city: 'Account: Billing City',
  //   country: 'Account: Billing Country',
  //   ex_id: 'Account: Account ID',
  //   d_u_n_s_number: 'Account: D-U-N-S® Number',
  //   postal_code: 'Account: Postal Code',
  //   industry: 'Account: Vertical',
  // };

  // const contacts_csv_key_map = {
  //   bounce_type: '',
  //   email: 'Email',
  //   firstname: 'First Name',
  //   gender: 'Gender',
  //   is_ema_eligible: 'EMA Eligible?',
  //   is_eva_eligible: 'EVA Eligible?',
  //   lastname: 'Last Name',
  //   member_status: 'Member Status',
  //   phone: '',
  //   position: '',
  //   role: 'Role',
  //   sam_status: '',
  //   source: '',
  //   title: 'Title',
  //   ex_id: 'Contact ID',
  //   ex_account_id: 'Account ID',
  //   ex_member_id: 'Member ID',
  //   linkedin: 'LinkedIn URL',
  //   city: 'Billing City',
  //   state: 'Billing State/Province',
  //   country: 'Billing Country',
    
  // };

  const handleChange = (event, value) => {
    setState({ page: value, email_domain_search_term: `%${''}%`, search_term: `%${''}%`, searchQuery: ''})
  };

  // const handleClientChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log('name: ', name)
  //   console.log('value: ', value)
  //   setState({ [name]: value, email_domain_search_term: `%${''}%`, search_term: `%${''}%`, searchQuery: '', page: 1})
  // };
  
  // const handleEmailDomainChange = (event, value) => {
  //   setState({ page: value, email_domain_search_term: `%${''}%`, searchQuery: ''})
  // };

  const handleSearchChange = (fetchMore, data) => (e)=> { 
    e.preventDefault();
    let search_term = e.target.elements.search_term.value;
    // let email_domain_search_term = e.target.elements.email_domain_search_term.value;
    console.log('event: ', e)
    console.log('search_term: ', search_term)
    // console.log('email_domain_search_term: ', email_domain_search_term)
    updateFilter(search_term, fetchMore)
  }
// 

  const updateFilter = debounce(async (searchQuery, fetchMore) => { // 6
    console.log('this.props.onSearch(val)')
    console.log('searchQuery: ', searchQuery)
    console.log('searchQuery.length>4: ', searchQuery.length>4)
    console.log('search_term: ', search_term)
    console.log('email_domain_search_term: ', email_domain_search_term)
    await fetchMore({
      query: ListCampaignAccounts, // 10
      variables: {
        campaign_id: props.location.state.campaign.id,
        search_term: `%${searchQuery}%`,
        limit,
        offset: (_page-1) * limit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log('previousResult: ', previousResult)
        console.log('fetchMoreResult: ', fetchMoreResult)
        return Object.assign(
          {}, 
          previousResult,
          { 
            campaign_account: [...fetchMoreResult.campaign_account]
          }
        )
      }
    });      
    // setState({page: _page, search_term: `%${searchQuery}%`, searchQuery})

  }, 500)

  // const moveCampaignAccount = async (updateSingleCampaignAccountMutation, to_campaign_id, from_campaign_id, campaign_accounts, updateReload, to_campaign_accounts) => {
  //   console.log(updateSingleCampaignAccountMutation);
  //   console.log("from_campaign_id: ", from_campaign_id);
  //   console.log("to_campaign_id: ", to_campaign_id);
  //   console.log("to_campaign_accounts: ", to_campaign_accounts);
  //   const existing_to_campaign_account_ids = to_campaign_accounts.map(ca => ca.account_id);
  //   console.log("existing_to_campaign_account_ids: ", existing_to_campaign_account_ids);    
  //   const move_campaign_accounts_results = await campaign_accounts.map(async account => {
  //     console.log("account.account_id: ", account.account_id)
  //     console.log("from_campaign_id: ", from_campaign_id)
  //     console.log("to_campaign_id: ", to_campaign_id)
  //     // const campaign_accounts_affected = {
  //     //   from_campaign_id,
  //     //   to_campaign_id,
  //     //   account_id: account.id,
  //     // };
  //     let campaign_accounts_affected = [];
  //     if(!existing_to_campaign_account_ids.includes(account.account_id)) {
  //       campaign_accounts_affected = await updateSingleCampaignAccountMutation({
  //         variables: {
  //           objects: 
  //             {
  //               campaign_id: to_campaign_id,
  //             },
  //             campaign_id: from_campaign_id,
  //             account_id: account.account_id,
  //         }
  //       });        
  //     }
  //     return campaign_accounts_affected;
  //   })
  //   console.log("move_campaign_accounts_results: ", move_campaign_accounts_results)        
  //   updateReload()           
  // }

  const Composed = adopt({
    updateSingleCampaignAccountMutation: ({ render }) => (
      <Mutation mutation={updateSingleCampaignAccount } >
        { render }
      </Mutation> 
    ),
    totalCampaignAccountsQuery: ({ render }) => (
      <Query query={totalCampaignAccounts(props.location.state.campaign.id)} >
        { render }
      </Query>
    ),
    accountsQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Query
        query={ListCampaignAccounts}
        variables= {{
          campaign_id: props.location.state.campaign.id,
          search_term: search_term,
          limit,
          offset: (_page-1) * limit,
        }}
        fetchPolicy="cache-and-network"
      >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query
        query={ListAccounts}
        variables= {{
          search_term: search_term,
          limit,
          offset: (_page-1) * limit,
        }}
        fetchPolicy="cache-and-network"
      >
        { render }
      </Query>
    ),
  })
  const _data = { campaign_account: []}
  return (
    <Composed>
      {({ accountsQuery, totalCampaignAccountsQuery, updateSingleCampaignAccountMutation }) => {
        console.log('accountsQuery: ', accountsQuery)
        const { loading, data, refetch, fetchMore }  = accountsQuery
        console.log('data: ', data)
        console.log('search_term: ', search_term)
        console.log('email_domain_search_term: ', email_domain_search_term)
        console.log('_page: ', _page)
        console.log('limit: ', limit)
        console.log('loading: ', loading)
        console.log('props: ', props)
        // if (!props.location.state.sailebot) {
        //   props.history.goBack()
        // }

        // if (
        //   loading ||
        //   !data ||
        //   (!data.account && !data.campaign_account )
        // ) {
        //   _data.campaign_account = [];
        // }
        if (!totalCampaignAccountsQuery.loading) {
          console.log('totalCampaignAccountsQuery: ', totalCampaignAccountsQuery)
          total =  Math.ceil(totalCampaignAccountsQuery.data.campaign_account_aggregate.aggregate.count/limit)
        }
        _data.campaign_account = (loading || !data || (!data.account && !data.campaign_account)) ? [] : data.campaign_account
        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.campaign  && props.location.state.campaign ? props.location.state.campaign.name : '' } Accounts</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-account', {campaign: props.location.state.campaign})}>Add Account</Button>
            {
              // props.location.state.sailebot && props.location.state.campaign && _data.campaign_account.length > 0 &&
              // <Query
              //   query={listAllCampaignAccounts(state.campaign_id)}
              // >
              //   {({ data, loading , error }) => {
              //     if (loading) return null;
              //     if (error) return `Error! ${error}`;
              //     console.log("to ListCampaignAccounts data: ", data)
              //     return (
              //       <div>  
              //         <CampaignSimpleSelect client_id={props.location.state.sailebot.client_id} label="Client Campaigns" name="campaign_id" onChange={handleClientChange} value={state.campaign_id}/>
              //         <Button variant="contained" size="small" onClick={() => moveCampaignAccount(updateSingleCampaignAccountMutation, state.campaign_id, props.location.state.campaign.id, _data.campaign_account, refetch, data.campaign_account)}>Move Accounts</Button>
              //       </div>
              //     );
              //   }}
              // </Query>
            }
            
            {
              // props.location.state && props.location.state.campaign && props.location.state.campaign.id
              // && 
              
              // <IntegrationReactSelect
              //       placeholder='Search Accounts to add'
              //       name='aselectedAccounts'
              //       handleSelectChange={handleSelectChange}
              //       variant="outlined"
              //       campaign_id={props.location.state.campaign.id}
              //       sailebot={props.location.state.sailebot}
              // />  
            }            
            {
              // props.location.state && props.location.state.campaign && props.location.state.campaign.id && 
              // <>
              //   <ContactsCSVReader history={props.history} location={props.location} contacts_csv_key_map={contacts_csv_key_map} campaign_id={props.location.state.campaign.id} label={'Contacts'} sailebot={props.location.state.sailebot} requirement={props.location.state.requirement}/>
              //   <AccountsCSVReader history={props.history} location={props.location} accounts_csv_key_map={accounts_csv_key_map} campaign_id={props.location.state.campaign.id} label={'Accounts'} sailebot={props.location.state.sailebot} requirement={props.location.state.requirement}/>
              // </>
            }
            <form onSubmit={handleSearchChange(fetchMore, data)}>
            {/* <form> */}
              <TextField
                  name="search_term"
                  label="Search Account By Name" 
                  variant="filled" 
                  margin="normal" 
                  fullWidth
              />                    
            </form>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                _data.campaign_account.map(x => (
                  <AccountCard
                    account={x.account}
                    id={x.id}
                    name={x.account.name}
                    key={x.account.id}
                    status={x.status}
                    history={props.history}
                    campaign={props.location.state.campaign}
                    sailebot={props.location.state.sailebot}
                    updateReload={() => {
                      refetch();
                    }}
                  />
                ))
                :
                _data.account.filter(item => item ).map(x => (
                  <AccountCard 
                    account={x}
                    id={x.id}
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
              <Pagination count={total} page={_page} onChange={handleChange} variant="outlined" shape="rounded" />
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Accounts
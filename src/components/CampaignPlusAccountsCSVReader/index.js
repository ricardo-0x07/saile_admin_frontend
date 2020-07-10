import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { createAccount, createCampaignAccount, createUpdateCampaign } from "../../graphql/mutations";
import { getClientCampaignAccounts } from "../../graphql/queries";

// var _ = require('lodash');
const buttonRef = React.createRef()

export default class CSVReader1 extends Component {

  onFileLoad = (data) => {
    if (this.props.label === 'Accounts') {
      
    } else {
      
    }
  }

  onError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  openDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  getAccountCSVData = async (data, createUpdateCampaignMutation, createAccountMutation, createCampaignAccountMutation, clientCampaignAccountQuery) => {
    console.log('data.length: ', data.length)
    console.log('clientCampaignAccountQuery: ', clientCampaignAccountQuery)
    console.log('this.props.sailebot: ', this.props.sailebot)
    const existing_campaign_accounts = clientCampaignAccountQuery.data ? clientCampaignAccountQuery.data.campaign_account.map(acc => acc.account_id) : []

    let accounts = data.map(account => {

      return Object.entries(this.props.accounts_csv_key_map).reduce((acc, [key, value]) => {
        if (key === 'campaign_name') {
          acc['campaign_name'] = account.data[value];
        } else {
          acc[key] = account.data[value];
        }
        
        return acc
      }, {})
    });
    // accounts = _.uniqBy(accounts, 'ex_id');
    // accounts = _.uniqBy(accounts, 'name');
    // const campaign_id = this.props.location.state.campaign.id
    console.log('accounts[0]: ', accounts[0])
    console.log('accounts.length: ', accounts.length)
    console.log('existing_campaign_accounts.length: ', existing_campaign_accounts.length)
    // await accounts.slice(0,1).map(async account => {
      const results = await accounts.map(async account => {
      try {
        let campaign_response = await createUpdateCampaignMutation({
          variables: {
            objects: {
              name: account.campaign_name,
              requirement_id: this.props.requirement_id
            }
          }
        });
        // console.log('campaign_response.data.insert_campaign.returning[0].id: ', campaign_response.data.insert_campaign.returning[0].id)
        let campaign_accounts_response = []
        let accounts_response = []
        if (campaign_response.data.insert_campaign.returning.length > 0 && 'id' in campaign_response.data.insert_campaign.returning[0] && campaign_response.data.insert_campaign.returning[0].id > 0) {
          const campaign_id = campaign_response.data.insert_campaign.returning[0].id
          // console.log('campaign_id: ', campaign_id)
          // console.log('account: ', account)
          delete account.campaign_name;
          // console.log('account: ', account)
          const {status, street, city, state, country, ...account_} = account;
          // console.log('status: ', status)

          accounts_response = await createAccountMutation({
            variables: {
              objects: {...account_, address: `${street}, ${city}, ${state}, ${country}`, street, city, state, country}
            }
          });
          // console.log('accounts_response.data.insert_account.returning.length: ', accounts_response.data.insert_account.returning.length)

          campaign_accounts_response = await createCampaignAccountMutation({
            variables: {
              objects: accounts_response.data.insert_account.returning.filter(acc => !existing_campaign_accounts.includes(acc.id)).map(account => {
                return { 
                  campaign_id,
                  account_id: account.id,
                  is_delisted: status === 'Actionable Opportunity' || status === 'Remove' ? true :false
                }
              })
            }
          });
          // console.log('campaign_accounts_response.data.insert_campaign_account.returning.length: ', campaign_accounts_response.data.insert_campaign_account.returning.length)
        }

                            
        return {campaign_response, accounts_response, campaign_accounts_response}
      } catch (error) {
        console.log(' error: ', error)
        console.log(' error message: ', error.message)
        return {account, error}
      }
    });   
    console.log('results: ', results)  
    
  }


  render() {
    console.log("this.props: ", this.props)
    const Composed = adopt({
      clientCampaignAccountQuery: ({ render }) => (
        <Query query={getClientCampaignAccounts(this.props.sailebot.client_id)} >
          { render }
        </Query>
      ),
      createUpdateCampaignMutation: ({ render }) => (
          <Mutation mutation={ createUpdateCampaign } >
            { render }
          </Mutation> 
      ),
      createAccountMutation: ({ render }) => (
        <Mutation mutation={ createAccount } >
          { render }
        </Mutation> 
      ),
      createCampaignAccountMutation: ({ render }) => (
          <Mutation mutation={ createCampaignAccount } >
            { render }
          </Mutation> 
      ),
    })
    return (
      <Composed>
        {({ clientCampaignAccountQuery, createUpdateCampaignMutation, createAccountMutation, createCampaignAccountMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  this.getAccountCSVData(loaded_data, createUpdateCampaignMutation, createAccountMutation, createCampaignAccountMutation, clientCampaignAccountQuery)
                }}
                onError={this.onError}
                noClick
                noDrag
                config={{header: true,}}
              >
                {({file}) => (
                  <>
                    <aside style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                      <button
                        type="button"
                        onClick={this.openDialog}
                        style={{
                          width: '40%',
                          borderRadius: 0,
                          marginLeft: 0,
                          marginRight: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        Browse {this.props.label ? this.props.label : ''} CSV file
                      </button>
                      <div
                        style={{
                          width: '60%',
                          height: 45,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: '#ccc',
                          marginTop: 5,
                          marginBottom: 5,
                          paddingLeft: 13,
                          paddingTop: 3,
                          lineHeight: 2.2,
                        }}
                      >
                        {file.name}
                      </div>
                    </aside>
                  </>
                )}
              </CSVReader>
            </>
          );
        }}
      </Composed>
    )
  }
}
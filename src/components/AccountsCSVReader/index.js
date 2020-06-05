import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
// import { Mutation } from "react-apollo";
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { createAccount, createCampaignAccount } from "../../graphql/mutations";
import { getClientCampaignAccounts } from "../../graphql/queries";

var _ = require('lodash');
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
  
  getAccountCSVData = async (data, createAccountMutation, createCampaignAccountMutation, clientCampaignAccountQuery) => {
    console.log('data.length: ', data.length)
    console.log('clientCampaignAccountQuery: ', clientCampaignAccountQuery)
    console.log('this.props.sailebot: ', this.props.sailebot)
    const existing_campaign_accounts = clientCampaignAccountQuery.data ? clientCampaignAccountQuery.data.campaign_account.map(acc => acc.account_id) : []
    console.log('existing_campaign_accounts.includes(4959): ', existing_campaign_accounts.includes(4959))
    console.log('existing_campaign_accounts.includes(100000000): ', existing_campaign_accounts.includes(100000000))

    let accounts = data.map(account => {

      return Object.entries(this.props.accounts_csv_key_map).reduce((acc, [key, value]) => {
        acc[key] = account.data[value];
        return acc
      }, {})
    });
    // accounts = _.uniqBy(accounts, 'ex_id');
    // accounts = _.uniqBy(accounts, 'name');
    const campaign_id = this.props.location.state.campaign.id
    console.log('accounts.length: ', accounts.length)
    await _.chunk(accounts, 10).map(async accounts_batch => {
      try {
        let accounts_response = await createAccountMutation({
          variables: {
            objects: accounts_batch
          }
        });
        console.log('accounts_response.data.insert_account.returning.length: ', accounts_response.data.insert_account.returning.length)
        let campaign_accounts_response = await createCampaignAccountMutation({
          variables: {
            objects: accounts_response.data.insert_account.returning.filter(acc => !existing_campaign_accounts.includes(acc.id)).map(account => {
              return { campaign_id, account_id: account.id }
            })
          }
        });
        console.log('campaign_accounts_response.data.insert_campaign_account.returning.length: ', campaign_accounts_response.data.insert_campaign_account.returning.length)
                            
        return accounts_response
      } catch (error) {
        console.log('createContactMutation error: ', error)
        console.log('createContactMutation error message: ', error.message)
        return {accounts_batch, error}
      }
    });     

    // const campaign_accounts_response = await createAccountMutation({
    //   variables: {
    //     objects: accounts
    //   }
    // });
    
    // await createCampaignAccountMutation({
    //   variables: {
    //     objects: accounts_response.data.insert_account.returning.map(account => {
    //       return { campaign_id, account_id: account.id }
    //     })
    //   }
    // });
    
  }


  render() {
    const Composed = adopt({
      clientCampaignAccountQuery: ({ render }) => (
        <Query query={getClientCampaignAccounts(this.props.sailebot.client_id)} >
          { render }
        </Query>
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
        {({ clientCampaignAccountQuery, createAccountMutation, createCampaignAccountMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  this.getAccountCSVData(loaded_data, createAccountMutation, createCampaignAccountMutation, clientCampaignAccountQuery)
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
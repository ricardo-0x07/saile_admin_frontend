import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { listAccounts, listScheduleAccounts, listAllCampaignAccounts, getAccountByExtrenalId, get_accounts_by_campaign_id } from "../../graphql/queries";
import { createAccount, createCampaignAccount, updateAccount, createContact, updateContact, } from "../../graphql/mutations";

const buttonRef = React.createRef()

export default class CSVReader1 extends Component {

  onFileLoad = (data) => {
    console.log('--------------------------------------------------')
    console.log(data)
    // this.props.getCSVData(data);
    if (this.props.label === 'Accounts') {
      
    } else {
      
    }
    console.log('--------------------------------------------------')
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
  
  getAccountCSVData = async (data, createAccountMutation, createCampaignAccountMutation) => {

    console.log('data: ', data);
    const accounts = data.map(account => {
      console.log('account.data: ', account.data);

      return Object.entries(this.props.accounts_csv_key_map).reduce((acc, [key, value]) => {
        console.log('key: ', key);
        console.log('value: ', value);
        acc[key] = account.data[value];
        return acc
      }, {})
    });
    console.log('accounts: ', accounts);
    const accounts_response = await createAccountMutation({
      variables: {
        objects: accounts
      }
    });
    console.log('accounts_response: ', accounts_response);
    const campaign_id = this.props.location.state.campaign.id
    const campaign_accounts_response = await createCampaignAccountMutation({
      variables: {
        objects: accounts_response.data.insert_account.returning.map(account => {
          return { campaign_id, account_id: account.id }
        })
      }
    });
    console.log('campaign_accounts_response: ', campaign_accounts_response);
    
  }


  render() {
    const { campaign_id } = this.props
    const Composed = adopt({
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
        {({ createContactMutation, createAccountMutation, createCampaignAccountMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  console.log('this.props.label: ', this.props.label);
                  this.getAccountCSVData(loaded_data, createAccountMutation, createCampaignAccountMutation)
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
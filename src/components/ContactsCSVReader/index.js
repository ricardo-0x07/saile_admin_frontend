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
  
  getContactCSVData = async (data, createContactMutation, campaign_accounts_data) => {

    console.log('data: ', data);
    let contacts = data.map(contact => {
      // console.log('contact.data: ', contact.data);

      return Object.entries(this.props.contacts_csv_key_map).reduce((acc, [key, value]) => {
        acc[key] = contact.data[value];
        return acc
      }, {})
    })
    console.log('contacts: ', contacts);
    console.log('campaign_accounts_data: ', campaign_accounts_data);
    const processed = campaign_accounts_data.account.reduce( ( acc, account ) => {
      const batch = contacts.filter(contact => contact.ex_account_id === account.ex_id).map(con => {
        con['account_id'] = account.id;
        return con
      })
      return [...acc, ...batch]
    }, [])
    console.log('processed: ', processed);


    const contacts_response = await createContactMutation({
      variables: {
        objects: processed
      }
    });
    console.log('contacts_response: ', contacts_response);
  }

  render() {
    const { campaign_id } = this.props
    const Composed = adopt({
      accountsQuery: ({ render }) => (
        <Query query={listAllCampaignAccounts(campaign_id)} >
          { render }
        </Query>
      ),
      createContactMutation: ({ render }) => (
        <Mutation mutation={ createContact } >
          { render }
        </Mutation> 
      ),
    })
    return (
      <Composed>
        {({ accountsQuery: { data, loading }, createContactMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  console.log('this.props.label: ', this.props.label);
                  this.getContactCSVData(loaded_data, createContactMutation, data) 
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
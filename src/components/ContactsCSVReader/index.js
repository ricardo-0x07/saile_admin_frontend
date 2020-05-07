import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import { listAllCampaignAccounts } from "../../graphql/queries";
import { createContact, createCampaignContact, } from "../../graphql/mutations";


var _ = require('lodash');
const buttonRef = React.createRef()

export default class CSVReader1 extends Component {

  onFileLoad = (data) => {
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
  
  getContactCSVData = async (data, createContactMutation, createCampaignContactMutation, campaign_accounts_data) => {

    let contacts = data.map(contact => {

      return Object.entries(this.props.contacts_csv_key_map).reduce((acc, [key, value]) => {
        acc[key] = contact.data[value];
        return acc
      }, {})
    })
    let processed = campaign_accounts_data.campaign_account.reduce( ( acc, account ) => {
      const batch = contacts.filter(contact => contact.ex_account_id === account.account.ex_id).map(con => {
        con['account_id'] = account.account.id;
        return con
      })
      return [...acc, ...batch]
    }, [])
    processed = _.uniq(processed, 'ex_id');
    processed = _.uniq(processed, 'ex_member_id');
    processed = _.filter(processed, con => con.account_id !== '');
    processed = _.filter(processed, con => con.account_id !== null);
    processed = _.filter(processed, con => con.account_id !== undefined);
    processed = _.filter(processed, con => con.email !== undefined);
    processed = _.filter(processed, con => con.email !== '');
    processed = _.filter(processed, con => con.email !== null);
    processed = _.filter(processed, con => con.ex_id !== '');
    processed = _.filter(processed, con => con.ex_account_id !== '');
    const { campaign_id } = this.props
    await _.chunk(processed, 100).map(async contacts_batch => {
      try {
        let results = await  createContactMutation({
          variables: {
            objects: contacts_batch
          }
        });
        await createCampaignContactMutation({
          variables: {
            objects: results.data.insert_contact.returning.map( contact => {
              return { campaign_id, account_id: contact.account_id, contact_id: contact.id }
            })
          }
        });                        
        return results
      } catch (error) {
        console.log('createContactMutation error: ', error)
        return {contacts_batch, error}
      }
    });     

    // const campaign_id = this.props.location.state.campaign.id

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
      createCampaignContactMutation: ({ render }) => (
        <Mutation mutation={ createCampaignContact } >
          { render }
        </Mutation> 
      ),
    })
    return (
      <Composed>
        {({ accountsQuery: { data, loading }, createContactMutation, createCampaignContactMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  if (!loading) {
                    this.getContactCSVData(loaded_data, createContactMutation, createCampaignContactMutation, data)                     
                  }
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
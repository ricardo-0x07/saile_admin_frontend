import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import { listAllCampaignAccounts } from "../../graphql/queries";
import { createUpdateContact, createUpdateCampaignContact, createContactAccount, createContactCampaignAccount, createUpdateCampaign } from "../../graphql/mutations";
import { getClientCampaignAccounts } from "../../graphql/queries";


// var _ = require('lodash');
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
  
  getContactCSVData = async (data, createUpdateContactMutation, createUpdateCampaignContactMutation, campaign_accounts_data, clientCampaignAccountQuery, createUpdateCampaignMutation, createContactAccountMutation, createContactCampaignAccountMutation) => {
    let contacts = data.map(contact => {

      return Object.entries(this.props.contacts_csv_key_map).reduce((acc, [key, value]) => {
        if (key === 'campaign_name') {
          acc['campaign_name'] = contact.data[value];
        } else if (key === 'email'){
          acc['email_domain'] = contact.data[value].split('@')[1];
          acc[key] = contact.data[value];
        } else if (key === 'email_domain'){
          if (value in contact.data) {
            acc['email_domain'] = contact.data[value];
          }
        } else {
          acc[key] = contact.data[value];
        }
        
        return acc
      }, {})
    });
    console.log('contacts[0]: ', contacts[0])
    console.log('contacts.length: ', contacts.length)
    try {
      const campaign_create_results = await contacts.filter(item =>  item['email_domain'] !== undefined && item['name'] !== undefined).map(async contact => {
        let campaign_response = await createUpdateCampaignMutation({
          variables: {
            objects: {
              name: contact.campaign_name,
              requirement_id: this.props.requirement_id
            }
          }
        });
        const campaign_id = campaign_response.data.insert_campaign.returning[0].id
        return {id: campaign_id, contact}
      });
      console.log('campaign_create_results.length: ', campaign_create_results.length)
  
      const accounts_create_results = await campaign_create_results.map(async promise => {
        console.log('promise: ', promise)
        const campaign = await promise.then(res => res);
        console.log('campaign: ', campaign)
        const campaign_id = campaign.id
        console.log('campaign_id: ', campaign_id)
        const { contact } = campaign
        delete contact.campaign_name;
        const { name, email_domain, status, firstname, lastname, email, title } = contact;
        console.log('status: ', status)
  
        let accounts_response = await createContactAccountMutation({
          variables: {
            objects: {name, email_domain }
          }
        });
        return {
          id: accounts_response.data.insert_account.returning[0].id,
          campaign_id,
          firstname, lastname, email, title,
          status: status === 'Actionable Opportunity' ? 'ActionableOpportunity': status === 'Remove' ? 'Remove' : status === 'Opt Out' ? 'OptOut' :'Active'
        }
      })
      console.log('accounts_create_results.length: ', accounts_create_results.length)
      
      const create_campaign_account_results = await accounts_create_results.map(async promise => {
        const account = await promise.then(res => res);
        const { firstname, lastname, email, title, status } = account;
        await createContactCampaignAccountMutation({
          variables: {
              objects: { 
                campaign_id: account.campaign_id,
                account_id: account.id,
              }
          }
        });  
        // return campaign_accounts_response.data.insert_campaign_account.returning
        return {
          firstname, lastname, email, title, status,
          account_id:  account.id,
          campaign_id: account.campaign_id
        }
      })
      const create_contact_results = await create_campaign_account_results.map(async promise => {
        const contact = await promise.then(res => res);
        console.log('contact: ', contact)
        const { firstname, lastname, email, title, status, account_id, campaign_id } = contact;
        console.log('email: ', email)

        let results = await  createUpdateContactMutation({
          variables: {
            objects: { firstname, lastname, email, title, account_id }
          }
        });

        return {
          contact_id: results.data.insert_contact.returning[0].id,
          account_id,
          campaign_id,
          status,
        }
      });

      await create_contact_results.map(async promise => {
        const contact = await promise.then(res => res);
        console.log('contact: ', contact)
        const { account_id, campaign_id, contact_id, status  } = contact
        const campaign_contact = await createUpdateCampaignContactMutation({
          variables: {
            objects: { 
              campaign_id,
              account_id,
              contact_id,
              status,
              is_delisted: status === 'ActionableOpportunity' || status === 'Remove' || status === 'OptOut' ? true :false
            }
          }
        });                        
        return campaign_contact;
      });
        
    } catch (error) {
      console.log(' error: ', error)
      console.log(' error message: ', error.message)
     
    }
  }

  render() {
    const { campaign_id } = this.props
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
      createContactAccountMutation: ({ render }) => (
        <Mutation mutation={ createContactAccount } >
          { render }
        </Mutation> 
      ),
      createContactCampaignAccountMutation: ({ render }) => (
          <Mutation mutation={ createContactCampaignAccount } >
            { render }
          </Mutation> 
      ),
      accountsQuery: ({ render }) => (
        <Query query={listAllCampaignAccounts(campaign_id)} >
          { render }
        </Query>
      ),
      createUpdateContactMutation: ({ render }) => (
        <Mutation mutation={ createUpdateContact } >
          { render }
        </Mutation> 
      ),
      createUpdateCampaignContactMutation: ({ render }) => (
        <Mutation mutation={ createUpdateCampaignContact } >
          { render }
        </Mutation> 
      ),
    })
    return (
      <Composed>
        {({ accountsQuery: { data, loading }, createUpdateContactMutation, createUpdateCampaignContactMutation, clientCampaignAccountQuery, createUpdateCampaignMutation, createContactAccountMutation, createContactCampaignAccountMutation }) => {
          return (
            <>
              <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5>
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  if (!loading) {
                    this.getContactCSVData(loaded_data, createUpdateContactMutation, createUpdateCampaignContactMutation, data, clientCampaignAccountQuery, createUpdateCampaignMutation, createContactAccountMutation, createContactCampaignAccountMutation)                     
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
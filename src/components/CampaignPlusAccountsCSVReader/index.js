import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';

import { createUpdateAccount, createUpdateCampaignAccount, createUpdateCampaign, delistCampaignAccountByName, delistCampaignAccountByEmailDomain } from "../../graphql/mutations";
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
  
  getAccountCSVData = async (data, createUpdateCampaignMutation, createAccountMutation, createUpdateCampaignAccountMutation, clientCampaignAccountQuery, delistCampaignAccountByNameMutation, delistCampaignAccountByEmailDomainMutation) => {
    console.log('data.length: ', data.length);
    console.log('clientCampaignAccountQuery: ', clientCampaignAccountQuery)
    console.log('this.props.sailebot: ', this.props.sailebot)

    await _.chunk(data, 100).map(async data_batch => {
      console.log('data_batch.length: ', data_batch.length)
      let accounts = data_batch.map(account => {

        return Object.entries(this.props.accounts_csv_key_map).reduce((acc, [key, value]) => {
          if (key === 'campaign_name') {
            acc['campaign_name'] = account.data[value];
          } else {
            acc[key] = account.data[value];
          }
          
          return acc
        }, {})
      });
      console.log('accounts[0]: ', accounts[0])
      console.log('accounts.length: ', accounts.length)
  
        
      try {
        const campaign_create_results = await accounts.map(async account => {
          let campaign_response = await createUpdateCampaignMutation({
            variables: {
              objects: {
                name: account.campaign_name,
                requirement_id: this.props.requirement_id
              }
            }
          });
          const campaign_id = campaign_response.data.insert_campaign.returning[0].id
          return {id: campaign_id, account}
        });
        console.log('campaign_create_results[0]: ', campaign_create_results[0])
  
        const accounts_create_results = await campaign_create_results.map(async promise => {
          console.log('promise: ', promise)
          const campaign = await promise.then(res => res);
          console.log('campaign: ', campaign)
          const campaign_id = campaign.id
          console.log('campaign_id: ', campaign_id)
          const { account } = campaign
          delete account.campaign_name;
          const {status, street, city, state, country, ...account_} = account;
          console.log('status: ', status)
    
          return createAccountMutation({
            variables: {
              objects: {...account_, address: `${street}, ${city}, ${state}, ${country}`, street, city, state, country}
            }
          }).then(accounts_response => {
            console.log('accounts_response: ', accounts_response)
            const { id } = accounts_response.data.insert_account.returning[0];
            console.log('account_id: ', id)
            return {
              id,
              campaign_id,
              // status: accounts_response.data.insert_account.returning[0].status,
              status: status === 'Actionable Opportunity' ? 'ActionableOpportunity': status === 'Remove' ? 'Remove' :'Active'
            }
          });
        })
        console.log('accounts_create_results.length: ', accounts_create_results.length)
        console.log('accounts_create_results[0]: ', accounts_create_results[0])
        
        const create_campaign_account_results = await accounts_create_results.map(async promise => {
          console.log('promise: ', promise);
          return promise.then(async account => {
            console.log('account: ', account);
            const { status } = account;
            if (account.id === 95165) {
              console.log('TEST')
              console.log('account.id: ', account.id);
              console.log('status: ', status);   
              console.log('account: ', account);
            }
            const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
            console.log('is_delisted: ', is_delisted);
            let campaign_accounts_response = await createUpdateCampaignAccountMutation({
              variables: {
                  objects: { 
                    campaign_id: account.campaign_id,
                    account_id: account.id,
                    status: status,
                    is_delisted: is_delisted
                  }
              }
            });  
  
            console.log('campaign_accounts_response: ', campaign_accounts_response)
            return campaign_accounts_response.data.insert_campaign_account.returning
          });
        })
  
        const delist_campaign_account_byName_results = await create_campaign_account_results.map(async promise => {
          console.log('promise: ', promise);
          return promise.then(async _account => {
            if(_account.length === 0) {
              return false
            }
            const account = _account[0];
            console.log('account: ', account);
            const { status } = account;
            if (account.id === 95165) {
              console.log('TEST')
              console.log('account.id: ', account.id);
              console.log('status: ', status);   
              console.log('account: ', account);
            }
            console.log('account.account: ', account.account);
            console.log('account.account.name: ', account.account.name);
            const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
            console.log('is_delisted: ', is_delisted);
            if(is_delisted === true) {
              let campaign_accounts_response = await delistCampaignAccountByNameMutation({
                variables: {
                  name:  account.account.name,
                  campaign_id: account.campaign_id,
                }
              });  
              console.log('campaign_accounts_response: ', campaign_accounts_response)
              return campaign_accounts_response.data
            } else {
              return false;
            }
          });
        })
  
        const delist_campaign_account_byEmailDomain_results = await create_campaign_account_results.map(async promise => {
          console.log('promise: ', promise);
          return promise.then(async _account => {
            if(_account.length === 0) {
              return false
            }
            const account = _account[0];
            console.log('account: ', account);
            const { status } = account;
            if (account.id === 95165) {
              console.log('TEST')
              console.log('account.id: ', account.id);
              console.log('status: ', status);   
              console.log('account: ', account);
            }
            console.log('account.account: ', account.account);
            console.log('account.account.email_domain: ', account.account.email_domain);
            const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
            console.log('is_delisted: ', is_delisted);
            if(is_delisted === true) {
              let campaign_accounts_response = await delistCampaignAccountByEmailDomainMutation({
                variables: {
                  email_domain:  account.account.email_domain,
                  campaign_id: account.campaign_id,
                }
              });  
              console.log('campaign_accounts_response: ', campaign_accounts_response)
              return campaign_accounts_response.data
            } else {
              return false;
            }
          });
        })
  
  
        console.log('create_campaign_account_results: ', create_campaign_account_results)
        console.log('delist_campaign_account_byName_results: ', delist_campaign_account_byName_results)
        console.log('delist_campaign_account_byEmailDomain_results: ', delist_campaign_account_byEmailDomain_results)
  
                            
      } catch (error) {
        console.log(' error: ', error)
        console.log(' error message: ', error.message)
      }
      setTimeout(15000);
    });

    // let accounts = data.map(account => {

    //   return Object.entries(this.props.accounts_csv_key_map).reduce((acc, [key, value]) => {
    //     if (key === 'campaign_name') {
    //       acc['campaign_name'] = account.data[value];
    //     } else {
    //       acc[key] = account.data[value];
    //     }
        
    //     return acc
    //   }, {})
    // });
    // console.log('accounts[0]: ', accounts[0])
    // console.log('accounts.length: ', accounts.length)

      
    // try {
    //   const campaign_create_results = await accounts.map(async account => {
    //     let campaign_response = await createUpdateCampaignMutation({
    //       variables: {
    //         objects: {
    //           name: account.campaign_name,
    //           requirement_id: this.props.requirement_id
    //         }
    //       }
    //     });
    //     const campaign_id = campaign_response.data.insert_campaign.returning[0].id
    //     return {id: campaign_id, account}
    //   });
    //   console.log('campaign_create_results[0]: ', campaign_create_results[0])

    //   const accounts_create_results = await campaign_create_results.map(async promise => {
    //     console.log('promise: ', promise)
    //     const campaign = await promise.then(res => res);
    //     console.log('campaign: ', campaign)
    //     const campaign_id = campaign.id
    //     console.log('campaign_id: ', campaign_id)
    //     const { account } = campaign
    //     delete account.campaign_name;
    //     const {status, street, city, state, country, ...account_} = account;
    //     console.log('status: ', status)
  
    //     return createAccountMutation({
    //       variables: {
    //         objects: {...account_, address: `${street}, ${city}, ${state}, ${country}`, street, city, state, country}
    //       }
    //     }).then(accounts_response => {
    //       console.log('accounts_response: ', accounts_response)
    //       const { id } = accounts_response.data.insert_account.returning[0];
    //       console.log('account_id: ', id)
    //       return {
    //         id,
    //         campaign_id,
    //         // status: accounts_response.data.insert_account.returning[0].status,
    //         status: status === 'Actionable Opportunity' ? 'ActionableOpportunity': status === 'Remove' ? 'Remove' :'Active'
    //       }
    //     });
    //   })
    //   console.log('accounts_create_results.length: ', accounts_create_results.length)
    //   console.log('accounts_create_results[0]: ', accounts_create_results[0])
      
    //   const create_campaign_account_results = await accounts_create_results.map(async promise => {
    //     console.log('promise: ', promise);
    //     return promise.then(async account => {
    //       console.log('account: ', account);
    //       const { status } = account;
    //       if (account.id === 95165) {
    //         console.log('TEST')
    //         console.log('account.id: ', account.id);
    //         console.log('status: ', status);   
    //         console.log('account: ', account);
    //       }
    //       const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
    //       console.log('is_delisted: ', is_delisted);
    //       let campaign_accounts_response = await createUpdateCampaignAccountMutation({
    //         variables: {
    //             objects: { 
    //               campaign_id: account.campaign_id,
    //               account_id: account.id,
    //               status: status,
    //               is_delisted: is_delisted
    //             }
    //         }
    //       });  

    //       console.log('campaign_accounts_response: ', campaign_accounts_response)
    //       return campaign_accounts_response.data.insert_campaign_account.returning
    //     });
    //   })

    //   const delist_campaign_account_byName_results = await create_campaign_account_results.map(async promise => {
    //     console.log('promise: ', promise);
    //     return promise.then(async _account => {
    //       if(_account.length === 0) {
    //         return false
    //       }
    //       const account = _account[0];
    //       console.log('account: ', account);
    //       const { status } = account;
    //       if (account.id === 95165) {
    //         console.log('TEST')
    //         console.log('account.id: ', account.id);
    //         console.log('status: ', status);   
    //         console.log('account: ', account);
    //       }
    //       console.log('account.account: ', account.account);
    //       console.log('account.account.name: ', account.account.name);
    //       const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
    //       console.log('is_delisted: ', is_delisted);
    //       if(is_delisted === true) {
    //         let campaign_accounts_response = await delistCampaignAccountByNameMutation({
    //           variables: {
    //             name:  account.account.name,
    //             campaign_id: account.campaign_id,
    //           }
    //         });  
    //         console.log('campaign_accounts_response: ', campaign_accounts_response)
    //         return campaign_accounts_response.data
    //       } else {
    //         return false;
    //       }
    //     });
    //   })

    //   const delist_campaign_account_byEmailDomain_results = await create_campaign_account_results.map(async promise => {
    //     console.log('promise: ', promise);
    //     return promise.then(async _account => {
    //       if(_account.length === 0) {
    //         return false
    //       }
    //       const account = _account[0];
    //       console.log('account: ', account);
    //       const { status } = account;
    //       if (account.id === 95165) {
    //         console.log('TEST')
    //         console.log('account.id: ', account.id);
    //         console.log('status: ', status);   
    //         console.log('account: ', account);
    //       }
    //       console.log('account.account: ', account.account);
    //       console.log('account.account.email_domain: ', account.account.email_domain);
    //       const is_delisted = status === 'ActionableOpportunity' || status === 'Remove' ? true :false
    //       console.log('is_delisted: ', is_delisted);
    //       if(is_delisted === true) {
    //         let campaign_accounts_response = await delistCampaignAccountByEmailDomainMutation({
    //           variables: {
    //             email_domain:  account.account.email_domain,
    //             campaign_id: account.campaign_id,
    //           }
    //         });  
    //         console.log('campaign_accounts_response: ', campaign_accounts_response)
    //         return campaign_accounts_response.data
    //       } else {
    //         return false;
    //       }
    //     });
    //   })


    //   console.log('create_campaign_account_results: ', create_campaign_account_results)
    //   console.log('delist_campaign_account_byName_results: ', delist_campaign_account_byName_results)
    //   console.log('delist_campaign_account_byEmailDomain_results: ', delist_campaign_account_byEmailDomain_results)

                          
    // } catch (error) {
    //   console.log(' error: ', error)
    //   console.log(' error message: ', error.message)
    // }
       
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
        <Mutation mutation={ createUpdateAccount } >
          { render }
        </Mutation> 
      ),
      createUpdateCampaignAccountMutation: ({ render }) => (
          <Mutation mutation={ createUpdateCampaignAccount } >
            { render }
          </Mutation> 
      ),
      delistCampaignAccountByNameMutation: ({ render }) => (
        <Mutation mutation={ delistCampaignAccountByName } >
          { render }
        </Mutation> 
    ),
    delistCampaignAccountByEmailDomainMutation: ({ render }) => (
      <Mutation mutation={ delistCampaignAccountByEmailDomain } >
        { render }
      </Mutation> 
  ),
})
    return (
      <Composed>
        {({ clientCampaignAccountQuery, createUpdateCampaignMutation, createAccountMutation, createUpdateCampaignAccountMutation, delistCampaignAccountByNameMutation, delistCampaignAccountByEmailDomainMutation }) => {
          return (
            <>
              {/* <h5>{this.props.label ? this.props.label : ''} Bulk Upload</h5> */}
              <CSVReader
                ref={buttonRef}
                onFileLoad={(loaded_data) => {
                  this.getAccountCSVData(loaded_data, createUpdateCampaignMutation, createAccountMutation, createUpdateCampaignAccountMutation, clientCampaignAccountQuery, delistCampaignAccountByNameMutation, delistCampaignAccountByEmailDomainMutation)
                }}
                onError={this.onError}
                noClick
                noDrag
                config={{header: true,}}
              >
                {({file}) => (
                  <>
                    <aside style={{display: 'flex', flexDirection: 'column', margin: 10}}>
                      <button
                        type="button"
                        onClick={this.openDialog}
                        style={{
                          width: '100%',
                          borderRadius: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                      >
                        Browse {this.props.label ? this.props.label : ''} CSV file
                      </button>
                      <div
                        style={{
                          width: '100%',
                          height: 20,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: '#ccc',
                          marginTop: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          marginBottom: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                          paddingTop: 3,
                          lineHeight: 2.2,
                        }}
                      >
                        {file && file.name ? file.name : ""}
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
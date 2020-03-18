import * as R from 'ramda'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { createAccount, createCampaignAccount, updateAccount } from "./graphql/mutations";
import { GET_ALL_CAMPAIGNS,  GET_ALL_SAILEBOTS } from "./graphql/queries";





export default function AppContainer({ children }) {
    const { account_lists_loading, account_lists_data } = useQuery(GET_ALL_CAMPAIGNS, {
      variables: { limit: 10, offset: 0 },
    })
    const { sailebot_lists_loading, sailebot_lists_data } = useQuery(GET_ALL_SAILEBOTS, {
      variables: { limit: 10, offset: 0 },
    })

    const [createCampaignAccountMutation, createCampaignAccountResult] = useMutation(createCampaignAccount, {
        update: (cache, { data: { createCampaignAccount_ } }) => {
          const query = GET_ALL_CAMPAIGNS 
          const { accounts } = cache.readQuery({ query })
    
          cache.writeQuery({
            query,
            data: { accounts: R.concat(accounts, [createCampaignAccount_]) },
          })
        },
    })
    
    const [createAccountMutation, createAccountResult] = useMutation(createAccount, {
        update: (cache, { data: { createAccount_ } }) => {
          const query = GET_ALL_CAMPAIGNS 
          const { accounts } = cache.readQuery({ query })
    
          cache.writeQuery({
            query,
            data: { accounts: R.concat(accounts, [createAccount_]) },
          })
        },
    })
    
    const [updateAccountMutation, updateAccountResult] = useMutation(updateAccount, {
        update: (cache, { data: { updateAccount_ } }) => {
          const query = GET_ALL_CAMPAIGNS 
          const { accounts } = cache.readQuery({ query })
    
          cache.writeQuery({
            query,
            data: { accounts: R.concat(accounts, [updateAccount_]) },
          })
        },
    })
    
    return children({
        accounts: { account_lists_loading, account_lists_data },
        sailebots: { sailebot_lists_loading, sailebot_lists_data },
        createCampaignAccount: { mutation: createCampaignAccountMutation, result: createCampaignAccountResult },
        createAccount: { mutation: createAccountMutation, result: createAccountResult },
        updateAccount: { mutation: updateAccountMutation, result: updateAccountResult },
      })    
}

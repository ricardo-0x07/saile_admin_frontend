import gql from 'graphql-tag';

export const GET_ALL_CLIENTS =gql`
    query ListClients($limit: Int!, $offset: Int) {
        client(limit: $limit, offset: $offset) {
            NAICS
            address
            city
            country
            created_at
            domain
            email
            email_domain
            employees
            id
            is_company
            name
            phone
            revenue
            state
            updated_at
            website
    }
}
`;
export const listClients = (limit) => {
    return gql`
        query ListClients {
            client(limit: ${limit}, offset: 0) {
                NAICS
                address
                city
                country
                created_at
                domain
                email
                email_domain
                employees
                id
                is_company
                name
                phone
                revenue
                state
                updated_at
                website
                firstname
                lastname
                company_id
            }
        }
    `;
}

export const listCompanyUserClients = (company_id) => {
    return gql`
        query ListCompanyUserClients {
            client(where: {company_id: {_eq: ${company_id}}}) {
                NAICS
                address
                city
                country
                created_at
                domain
                email
                email_domain
                employees
                id
                is_company
                name
                phone
                revenue
                state
                updated_at
                website
                firstname
                lastname
                company_id
                company {
                    id
                    name
                    email_domain
                    website
                    address
                    street
                    city
                    state
                    country
                    industry
                    phone
                }
                sailebots {
                    client_id
                    email
                    fullname
                    id
                    no_targets
                    name
                    phone
                    title
                }
            }
        }
    `;
}


export const listCompanies = (limit) => {
    return gql`
        query ListCompanies {
            company(limit: ${limit}, offset: 0) {
                id
                name
                address
                street
                city
                state
                country
                email_domain
                industry
                website
                phone
                created_at
                updated_at
            }
        }
    `;
}

export const listEmailOptions = () => {
    return gql`
        query ListEmailOptions {
            email_option {
                description
                value
            }
        }
    `;
}

export const GET_ALL_SAILEBOTS = gql`
    query ListSaileBots($limit: Int, $offset: Int) {
        sailebot(limit: $limit, offset: $offset) {
            client_id
            email
            fullname
            id
            name
            no_targets
            phone
            title
            role
            company_name
            signature
            firstname
            lastname
            smtp_login
            smtp_password
            requirements {
                auto_reject
                city
                contract_no
                elasticity
                function
                geography
                id
                is_duplicate
                launch_date
                ldr_notes
                level
                max_hits_per_contact
                name
                priority
                sailebot_id
                size
                source
                state
            }
            domains {
                active
                dns
                host
                id
                ip
                name
                provider
                sailebot_id
                smtp
                smtp_login
                smtp_password
            }
        }
    }
`;
export const listSaileBots = (limit) => {
    return gql`
        query ListSaileBots {
            sailebot(limit: ${limit}, offset: 0) {
                client_id
                email
                fullname
                id
                name
                no_targets
                phone
                title
                role
                company_name
                signature
                firstname
                lastname
                smtp_login
                smtp_password
                email_service
            }
        }
    `;
}
export const GET_ALL_CAMPAIGNS = gql`
    query ListCampaigns {
        campaign(limit: Int, offset: Int) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            schedules {
                campaign_id
                daily_outbound_limit
                date
                deploy_date
                id
                name
                no_targets_per_accounts
                status
                timezone
            }
            templates {
                body_html_text
                body_text
                campaign_id
                id
                name
                subject
            }
            campaign_accounts {
                account {
                    NAICS
                    address
                    city
                    country
                    domain
                    email
                    email_domain
                    employees
                    fax
                    id
                    is_scheduled
                    name
                    phone
                    revenue
                    state
                    website
                }
            }
        }
    }
`;

export const sailebotEventCount = (sailebot_id) => {
    return gql`
        query ClientEventCount {
            event_aggregate(where: {campaign: {requirement: {sailebot_id: {_eq: ${sailebot_id}}}}}) {
                aggregate {
                count(columns: label)
                }
                nodes {
                    body
                    cc
                    contact_id
                    date
                    id
                    label
                    nlu_input_text
                    selected_intent
                    subject
                    sender
                    to
                    validated_intent
                }
            }
        }
    `;
}

export const sailebotEventCountByLabel = (sailebot_id, label_query) => {
    return gql`
        query SailebotEventCountByLabel {
            event_aggregate(where: {campaign: {requirement: {sailebot_id: {_eq: ${sailebot_id}}}}, label: {_eq: "${label_query}"}, is_inbound: {_eq: false}}) {
                aggregate {
                count(columns: label)
                }
                nodes {
                    body
                    cc
                    contact_id
                    date
                    id
                    label
                    nlu_input_text
                    selected_intent
                    subject
                    sender
                    to
                    validated_intent
                }
            }
        }
    `;
}

export const inbox_event_logs = (campaign_id=94192, is_inbound=false, after_date="2020-08-14") => {
    return gql`
        query InboxEventLogs {
            inbox_event_log(where: {campaign_id: {_eq: ${campaign_id}}, is_inbound: {_eq: ${is_inbound}}, date: {_gte: "${after_date}"}}) {
                count
                campaign_id
                date
                is_inbound
            }
        }
    `;
}


// export const listAllCampaignAccounts = (campaign_id) => {
//     return gql`
//     query ListCampaignAccounts {
//         campaign_account(where: {campaign_id: {_eq: ${campaign_id}}}) {
//             account {
//                     NAICS
//                     city
//                     domain
//                     email
//                     email_domain
//                     employees
//                     ex_id
//                     fax
//                     id
//                     is_scheduled
//                     name
//                     phone
//                     revenue
//                     state
//                     website
//             }
//             account_id
//             campaign_id
//             id
//             is_scheduled
//         }
//     }
// `;
// }

export const listCampaignAccounts = (campaign_id, limit=10, offset=0, search_term='', is_scheduled=false) => {
    return gql`
    query ListCampaignAccounts {
        campaign_account(limit:${limit}, offset:${offset}, where: {account: {name: {_ilike: "%${search_term}%"}}, campaign_id: {_eq: ${campaign_id}}}, order_by: {account_id: desc}) {
            account {
                    NAICS
                    city
                    domain
                    email
                    email_domain
                    employees
                    ex_id
                    fax
                    id
                    is_scheduled
                    name
                    phone
                    revenue
                    state
                    website
            }
            account_id
            campaign_id
            id
            is_scheduled
        }
    }
`;
}

export const ListCampaignAccounts =  gql`
query ListCampaignAccounts($campaign_id:Int!, $limit:Int!, $offset:Int!, $search_term:String!) {   
    campaign_account(limit:$limit, offset:$offset, where: {is_delisted: {_eq: false}, account: {name: {_ilike: $search_term}}, campaign_id: {_eq: $campaign_id}}, order_by: {account: {name: asc}}) {
        account {
                NAICS
                city
                domain
                email
                email_domain
                employees
                ex_id
                fax
                id
                is_scheduled
                name
                phone
                revenue
                state
                website
                NAICS
                is_scheduled
        }
        account_id
        campaign_id
        id
        is_scheduled
    }
}
`;

export const ListAccounts  = gql`
    query ListAccounts($campaign_id:Int!, $limit:Int!, $offset:Int!, $search_term:String!) {
        account(limit:$limit, offset:$offset, order_by: {name: asc}, where: {name: {_ilike: $search_term}, campaign_accounts: {is_delisted: {_eq: false}}}) {
            NAICS
            address
            city
            country
            domain
            email
            email_domain
            employees
            fax
            id
            ex_id
            is_scheduled
            name
            phone
            revenue
            state
            website
            account_campaigns {
                campaign_id
            }
            contacts {
                account_id
                bounce_type
                email
                first_outbound_done
                firstname
                gender
                id
                is_ema_eligible
                is_eva_eligible
                is_referral
                lastname
                member_status
                phone
                position
                role
                sam_status
                second_outbound_done
                source
                title
                to_followup
            }
        }
    }
`;


export const nonCampaignAccounts = (campaign_id) => {
    return gql`
    query SearchAccounts {
        account(where: {campaign_accounts: {campaign_id: {_neq: ${campaign_id}}}}) {
            address
            city
            country
            domain
            email
            email_domain
            employees
            id
            name
            revenue
            state
            website
            phone
            logo
            fax
            ex_id
        }
    }
`;
}

export const searchAccounts = (search_term, campaign_id, client_id) => {
    console.log('search_term: ', search_term)
    return gql`
    query SearchAccounts {
        account(where: {name: {_ilike: "%${search_term}%"}, campaign_accounts: {campaign_id: {_neq: ${campaign_id}}, campaign: {requirement: {sailebot: {client_id: {_neq: ${client_id}}}}}} }) {
            address
            city
            country
            domain
            email
            email_domain
            employees
            id
            name
            revenue
            state
            website
            phone
            logo
            fax
            ex_id
        }
    }
`;
}

export const listAvailableCampaignAccounts = (campaign_id, limit=100, is_scheduled=false, is_delisted=false) => {
    return gql`
    query ListAvailableCampaignAccounts {
        campaign_account(limit:${limit}, offset: 0, where: {campaign_id: {_eq: ${campaign_id}}, is_scheduled: {_eq: ${is_scheduled}}, is_delisted: {_eq: ${is_delisted}}}) {
            account {
                    NAICS
                    city
                    domain
                    email
                    email_domain
                    employees
                    ex_id
                    fax
                    id
                    is_scheduled
                    name
                    phone
                    revenue
                    state
                    website
            }
            account_id
            campaign_id
            id
            is_scheduled
        }
    }
`;
}

export const listCampaigns = (limit=10, offset=0) => {
    return gql`
    query ListCampaigns {
        campaign(limit:${limit}, offset:${offset}) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            run_status
            is_running
            to_run
            status_message
            smtp_login
            smtp_password
            email_service
            wait_days
            company_domain_id
        }
    }
`;
}

export const listCampaignTemplates = (campaign_id) => {
    return gql`
        query ListCampaignTemplates {
            template(where: {campaign_id: {_eq: ${campaign_id}}}) {
                body_html_text
                body_text
                campaign_id
                id
                name
                subject
            }
        }
    `;
}

export const listTemplates = (limit) => {
    return gql`
        query ListTemplates {
            template(limit: ${limit}, offset: 0) {
                body_html_text
                body_text
                campaign_id
                id
                name
                subject
            }
        }
    `;
}

export const listSchedules = (limit=10, is_delisted=false, offset=0, account_limit=10, account_offset=0) => {
    return gql`
        query ListSchedules {
            schedule(limit: ${limit}, offset: ${offset}) {
                campaign_id
                daily_outbound_limit
                date
                deploy_date
                id
                name
                no_targets_per_accounts
                status
                timezone
                schedule_accounts(where: {account: {campaign_accounts: {is_delisted: {_eq: ${is_delisted}}}}}) {
                    id
                    account_id
                    schedule_id
                }
            }
        }
    `;
}

// export const listCampaignSchedules = (campaign_id) => {
//     return gql`
//     query listCampaignSchedules {
//         schedule(where: {campaign_id: {_eq: ${campaign_id}}}) {
//             campaign_id
//             date
//             daily_outbound_limit
//             created_at
//             deploy_date
//             id
//             name
//             no_targets_per_accounts
//             status
//             timezone
//             updated_at
//         }
//     }
//   `;
//   }

  export const listCampaignSchedules = (campaign_id, is_delisted=false) => {
      console.log("is_delisted: ", is_delisted)
    return gql`
    query listCampaignSchedules {
        schedule(where: {campaign_id: {_eq: ${campaign_id}}}) {
            campaign_id
            date
            daily_outbound_limit
            created_at
            deploy_date
            end_date
            id
            name
            no_targets_per_accounts
            status
            timezone
            updated_at
            accounts_per_schedule
            schedule_accounts(where: {account: {campaign_accounts: {is_delisted: {_eq: ${is_delisted}}, campaign_id: {_eq: ${campaign_id}}}}}) {
                id
                account_id
                schedule_id
            }
      }
    }
  `;
  }

  export const getScheduleById = (id, campaign_id, is_delisted=true) => {
    return gql`
    query GetScheduleById {
        schedule(where: {id: {_eq: ${id}}}) {
            campaign_id
            date
            daily_outbound_limit
            created_at
            deploy_date
            end_date
            id
            name
            no_targets_per_accounts
            status
            timezone
            updated_at
            accounts_per_schedule
            schedule_accounts(where: {account: {campaign_accounts: {is_delisted: {_eq: ${is_delisted}}, campaign_id: {_eq: ${campaign_id}}}}}) {
                id
                account_id
                schedule_id
            }
      }
    }
  `;
  }
export const listAccounts = (limit=10, offset=0, search_term='') => {
    return gql`
        query ListAccounts {
            account(limit: ${limit}, offset: ${offset}, order_by: {id: desc}, where: {name: {_ilike: "%${search_term}%"}}) {
                NAICS
                address
                city
                country
                domain
                email
                email_domain
                employees
                fax
                id
                ex_id
                is_scheduled
                name
                phone
                revenue
                state
                website
                account_campaigns {
                    campaign_id
                }
            }
        }
    `;
}

export const listScheduleAccounts = (schedule_id, limit=10, offset=0) => {
    return gql`
        query ListScheduleAccounts {
            schedule_account(where: {schedule_id: {_eq: ${schedule_id}}}, limit: ${limit}, offset: ${offset}) {
                account {
                    NAICS
                    city
                    domain
                    email
                    email_domain
                    employees
                    ex_id
                    fax
                    id
                    is_scheduled
                    name
                    phone
                    revenue
                    state
                    website
                }
                account_id
                campaign_id
                id
            }
        }
    `;
}

export const listAllCampaignAccounts = (campaign_id) => {
    return gql`
        query ListAllCampaignAccounts {
            campaign_account(where: {campaign_id: {_eq: ${campaign_id}}}) {
                account {
                    NAICS
                    city
                    domain
                    email
                    email_domain
                    employees
                    ex_id
                    fax
                    id
                    is_scheduled
                    name
                    phone
                    revenue
                    state
                    website
                }
                account_id
                campaign_id
                id
                is_scheduled
            }
        }
    `;
}

export const getAccountByExtrenalId = (ex_id) => {
    return gql`
        query GetAccountByExtrenalId {
            account(where: {ex_id: {_eq: ${ex_id}}}) {
                id
            }
        }
    `;
}

export const getAccountBy_account_name_email_domain_key = (name, email_domain) => {
    return gql`
        query GetAccountByExtrenalId {
            account(where: {name: {_eq: ${name}, email_domain: {_eq: ${email_domain}}}) {
                id
            }
        }
    `;
}

export const getAccountsByCampaignId = (campaign_id) => {
    return gql`
        query GetAccountsByCampaignId {
            account(where: {account_campaigns: {campaign_id: {_eq: ${campaign_id}}}}) {
                id
                ex_id
            }
        }
    `;
}

export const getCompanyByCampaignId = (campaign_id) => {
    return gql`
        query CompanyByCampaignId {
            company(where: {clients: {sailebots: {requirements: {campaigns: {id: {_eq: ${campaign_id}}}}}}}, limit: 1) {
                id
                country
                created_at
                email_domain
                industry
                name
                phone
                state
                street
                updated_at
                website
            }
        }
    `;
}

export const getCompanyByRequirementId = (requirement_id) => {
    return gql`
        query CompanyByRequirementId {
            company(where: {clients: {sailebots: {requirements: {id: {_eq: ${requirement_id}}}}}}, limit: 1) {
                id
                country
                created_at
                email_domain
                industry
                name
                phone
                state
                street
                updated_at
                website
            }
        }
    `;
}

export const getClientCampaignAccounts = (client_id) => {
    return gql`
        query GetClientCampaignAccounts {
            campaign_account(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}}) {
                id
                campaign_id
                account_id
            }
        }
    `;
}

export const getCampaignAccount = (campaign_id, account_id) => {
    return gql`
        query GetClientCampaignAccounts {
            campaign_account(where: {campaign_id: {_eq: ${campaign_id}}, account_id: {_eq: ${account_id}}}) {
                id
                campaign_id
                account_id
                is_delisted
            }
        }
    `;
}

export const listContacts = (limit=10, offset=0, event_limit=10, event_offset=0) => {
    return gql`
        query ListContacts {
            contact(limit: ${limit}, offset: ${offset}) {
                account_id
                bounce_type
                email
                first_outbound_done
                firstname
                gender
                id
                is_ema_eligible
                is_eva_eligible
                is_referral
                lastname
                member_status
                phone
                position
                role
                sam_status
                second_outbound_done
                source
                title
                to_followup
                events(limit: ${event_limit}, offset: ${event_offset}, order_by: {date: desc}) {
                    body
                    cc
                    date
                    id
                    label
                    sender
                    subject
                    contact_id
                    to
                }
            }
        }
    `;
}

export const getContactById = (id) => {
    return gql`
        query GetContactById {
            contact(where: {id: {_eq: ${id}}}) {
                account_id
                bounce_type
                email
                first_outbound_done
                firstname
                gender
                id
                is_ema_eligible
                is_eva_eligible
                is_referral
                lastname
                member_status
                phone
                position
                role
                sam_status
                second_outbound_done
                source
                title
                to_followup
            }
        }
    `;
}

export const getContactByEmail = (email) => {
    return gql`
        query GetContactByEmail {
            contact(where: {email: {_eq: "${email}"}}) {
                account_id
                bounce_type
                email
                first_outbound_done
                firstname
                gender
                id
                is_ema_eligible
                is_eva_eligible
                is_referral
                lastname
                member_status
                phone
                position
                role
                sam_status
                second_outbound_done
                source
                title
                to_followup
            }
        }
    `;
}

export const getCampaignContact = (campaign_id, contact_id) => {
    return gql`
        query GetCampaignContact {
            campaign_contact(where: {campaign_id: {_eq: ${campaign_id}}, contact_id: {_eq: ${contact_id}}}) {
                id
                campaign_id
                contact_id
                account_id
                is_delisted
                next_date
                to_followup
                status
            }
        }
    `;
}
export const totalCampaignClarificationEvents = (campaign_id) => {
    return gql`
        query TotalCampaignClarificationEvents {
            event_aggregate(where: {campaign_id: {_eq: ${campaign_id}}, to_clarify: {_eq: true}}) {
                aggregate {
                count(columns: id, distinct: true)
                }
            }
        }
    `;
}

export const totalCampaignAccounts = (campaign_id) => {
    return gql`
        query TotalCampaignAccounts {
            campaign_account_aggregate(where: {campaign_id: {_eq: ${campaign_id}}, is_delisted: {_eq: false}}) {
                aggregate {
                    count(columns: id, distinct: true)
                }
                nodes {
                    account_id
                    id
                    campaign_id
                }
            }
        }
    `;
}

export const getCampaignAccountContactElastaicity = (campaign_id, account_id, elasticity=4) => {
    return gql`
        query GetCampaignAccountContactElastaicity {
            campaign(where: {id: {_eq: ${campaign_id}}}) {
                campaign_contacts_aggregate(where: {account_id: {_eq: ${account_id}}, campaign_id: {_eq: ${campaign_id}}}, limit: ${elasticity}) {
                    aggregate {
                        count(columns: id, distinct: true)
                    }
                }
            }
        }
    `;
}

export const listCampaignClarificationEvents = (campaign_id, limit=10, offset=0) => {
    return gql`
        query ListCampaignClarificationEvents{
            event(where: {campaign_id: {_eq: ${campaign_id}}, to_clarify: {_eq: true}}, limit: ${limit}, offset: ${offset}, order_by: {id: desc}) {
                body
                cc
                date
                id
                label
                sender
                subject
                body
                contact_id
                date
                nlu_input_text
                nlu_json_response
                selected_intent
                validated_json_response
                validated_intent
                campaign_id
                is_inbound
                to_clarify
                to
            }
        }
    `;
}
export const listClarificationEvents = (limit=10, offset=0) => {
    return gql`
        query ListContactClarificationEvents{
            event(where: { to_clarify: {_eq: true} }, limit: ${limit}, offset: ${offset}, order_by: {date: desc}) {
                body
                cc
                date
                id
                label
                sender
                subject
                body
                contact_id
                date
                nlu_input_text
                nlu_json_response
                selected_intent
                validated_json_response
                validated_intent
                campaign_id
                is_inbound
                to_clarify
                to
            }
        }
    `;
}
export const listClientSaileBots = (client_id) => {
    return gql`
        query ListClientSaileBots {
            sailebot(where: {client_id: {_eq: ${client_id}}}) {
                client_id
                email
                fullname
                id
                name
                no_targets
                phone
                title
                role
                company_name
                signature
                firstname
                lastname
                smtp_login
                smtp_password
                email_service
            }
        }
    `;
}


export const listRequirementCampaigns = (requirement_id) => {
    return gql`
    query ListCampaigns {
        campaign(where: {requirement_id: {_eq: ${requirement_id}}}) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            run_status
            is_running
            to_run
            status_message
            smtp_login
            smtp_password
            email_service
            wait_days
            company_domain_id
        }
    }
`;
}


export const listClientCampaigns = (client_id) => {
    return gql`
    query ListClientCampaigns {
        campaign(where: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            run_status
            is_running
            to_run
            status_message
            smtp_login
            smtp_password
            email_service
            wait_days
            company_domain_id
        }
    }
`;
}

export const listSailebotRequirements = (sailebot_id, campaign_limit=10, campaign_offset=0) => {
    return gql`
        query ListRequirements {
            requirement(where: {sailebot_id: {_eq: ${sailebot_id}}}) {
                auto_reject
                city
                contract_no
                elasticity
                function
                geography
                id
                is_duplicate
                launch_date
                ldr_notes
                level
                max_hits_per_contact
                name
                priority
                sailebot_id
                size
                source
                state
                job_levels
                job_functions
                titles
                campaigns(limit: ${campaign_limit}, offset: ${campaign_offset}) {
                    description
                    id
                    name
                    requirement_id
                }
            }
        }
    `;
}


export const clientEventByLabel = (client_id, label_query, limit=10, offset=0, is_inbound=true) => {
    return gql`
        query ClientEventByLabel {
            event(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, label: {_eq: "${label_query}"}, is_inbound: {_eq: ${is_inbound}}, to_clarify: {_eq: false}}, limit: ${limit}, offset: ${offset}, order_by: {date: desc}) {
                body
                cc
                contact_id
                date
                id
                label
                nlu_input_text
                selected_intent
                subject
                sender
                to
                campaign_id
                validated_intent
            }
        }
    `;
}

export const clientEventByCampaignContact = (client_id, contact_id, campaign_id) => {
    return gql`
        query ClientEventByCampaignContact {
            event(
                where: {
                    campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, 
                    contact_id: {_eq: ${contact_id}}, 
                    campaign_id: {_eq: ${campaign_id}} 
                }
                ) {
                body
                cc
                contact_id
                date
                id
                label
                nlu_input_text
                selected_intent
                subject
                sender
                to
                campaign_id
            }
        }
    `;
}




export const totalCampaignEventsByLabel = (client_id, label_query) => {
    return gql`
        query TotalCampaignClarificationEvents {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, label: {_eq: "${label_query}"}, is_inbound: {_eq: false}, to_clarify: {_eq: false}}) {
                aggregate {
                    count(columns: id, distinct: true)
                }
            }
        }
    `;
}
export const totalCampaignEvents = (client_id) => {
    return gql`
        query TotalCampaignClarificationEvents {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, to_clarify: {_eq: false}}) {
                aggregate {
                count(columns: id, distinct: true)
                }
            }
        }
    `;
}
export const clientEventCountByLabel = (client_id, label_query) => {
    return gql`
        query ClientEventCountByLabel {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, label: {_eq: "${label_query}"}, is_inbound: {_eq: false}, to_clarify: {_eq: false}}) {
                aggregate {
                    count(columns: id, distinct: true)
                }
            }
        }
    `;
}

export const companyEventCountByLabel = (company_id, label_query) => {
    return gql`
        query CompanyEventCountByLabel {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client: {company_id: {_eq: ${company_id}}}}}}, label: {_eq: "${label_query}"}, is_inbound: {_eq: false}}) {
                aggregate {
                count(columns: label)
                }
                nodes {
                    body
                    cc
                    contact_id
                    date
                    id
                    label
                    nlu_input_text
                    selected_intent
                    subject
                    sender
                    to
                    validated_intent
                }
            }
        }
    `;
}


export const clientEventCount = (client_id) => {
    return gql`
        query SailebotEventCount {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}}) {
                aggregate {
                    count(columns: label)
                }
            }
        }
    `;
}

export const clientEvent = (client_id, limit=10, offset=0) => {
    return gql`
        query SailebotEvent {
            event(where: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}, to_clarify: {_eq: false}}, limit: ${limit}, offset: ${offset}, order_by: {date: desc}) {
                body
                cc
                contact_id
                date
                id
                label
                nlu_input_text
                selected_intent
                subject
                sender
                to
                validated_intent
            }
        }
    `;
}


export const companyEventCount = (company_id) => {
    return gql`
        query SailebotEventCount {
            event_aggregate(where: {campaign: {requirement: {sailebot: {client: {company_id: {_eq: ${company_id}}}}}}}) {
                aggregate {
                count(columns: label)
                }
                nodes {
                    body
                    cc
                    contact_id
                    date
                    id
                    label
                    nlu_input_text
                    selected_intent
                    subject
                    sender
                    to
                    validated_intent
                }
            }
        }
    `;
}



export const totalScheduleAccounts = (schedule_id) => {
    return gql`
        query TotalScheduleAccounts {
            schedule_account_aggregate(where: {schedule_id: {_eq: ${schedule_id}}}) {
                aggregate {
                count(columns: id, distinct: true)
                }
            }
        }
    `;
}

export const countCampaignScheduleAccounts = (campaign_id) => {
    return gql`
        query CountCampaignScheduleAccounts  {
            schedule_account_aggregate(where: {campaign_id: {_eq: ${campaign_id}}}) {
                aggregate {
                count(columns: account_id, distinct: true)
                }
            }
        }
    `;
}

export const countCampaignAccounts = (campaign_id, is_delisted=false) => {
    return gql`
        query CountCampaignAccounts  {
            campaign_account_aggregate(where: {campaign_id: {_eq: ${campaign_id}}, is_delisted: {_eq: ${is_delisted}}}) {
                aggregate {
                    count(columns: account_id, distinct: true)
                }
                nodes {
                    account_id
                    id
                    campaign_id
                }

            }
        }
    `;
}

export const listAccountContacts = (account_id, limit=10, offset=0, event_limit=10, event_offset=0) => {
    return gql`
        query ListAccountContacts {
            contact(where: {account_id: {_eq: ${account_id}}}, limit: ${limit}, offset: ${offset}) {
                account_id
                bounce_type
                email
                first_outbound_done
                firstname
                gender
                id
                is_ema_eligible
                is_eva_eligible
                is_referral
                lastname
                member_status
                phone
                position
                role
                sam_status
                second_outbound_done
                source
                title
                to_followup
                events(limit: ${event_limit}, offset: ${event_offset}, order_by: {date: desc}) {
                    body
                    cc
                    date
                    id
                    label
                    sender
                    subject
                    contact_id
                    to
                }
            }
        }
    `;
}

export const listEvents = (limit=10, offset=0) => {
    return gql`
        query ListEvents {
            event(limit: ${limit}, offset: ${offset}, order_by: {date: desc}) {
                body
                cc
                date
                id
                label
                sender
                subject
                contact_id
                to
            }
        }
    `;
}

export const listRequirements = (limit=10, offset=0, campaign_limit=10, campaign_offset=0) => {
    return gql`
        query ListRequirements {
            requirement(limit: ${limit}, offset: ${offset}) {
                auto_reject
                city
                contract_no
                elasticity
                function
                geography
                id
                is_duplicate
                launch_date
                ldr_notes
                level
                max_hits_per_contact
                name
                priority
                sailebot_id
                size
                source
                state
                job_levels
                job_functions
                titles
                campaigns(limit: ${campaign_limit}, offset: ${campaign_offset}) {
                    description
                    id
                    name
                    requirement_id
                }
            }
        }
    `;
}

export const listDomains = (limit=10, offset=0) => {
    return gql`
        query ListDomains {
            domain(limit: ${limit}, offset: ${offset}) {
                active
                dns
                host
                id
                ip
                name
                provider
                sailebot_id
                smtp
                smtp_login
                smtp_password
            }
        }
    `;
}


export const listSailebotDomains = (sailebot_id) => {
    return gql`
        query ListSailebotDomains {
            domain(where: {sailebot_id: {_eq: ${sailebot_id}}}) {
                active
                dns
                host
                id
                ip
                name
                provider
                sailebot_id
                smtp
                smtp_login
                smtp_password
            }
        }
    `;
}

export const listCompanyDomains = (limit=10, offset=0) => {
    return gql`
        query ListCompanyDomains {
            company_domain(limit: ${limit}, offset: ${offset}) {
                id
                dns
                host
                name
                smtp
                company_id
                ip
            }
        }
    `;
}


export const listCompanyDomainsByCompanyId = (company_id) => {
    return gql`
        query ListCompanyDomains {
            company_domain(where: {company_id: {_eq: ${company_id}}}) {
                id
                dns
                host
                name
                smtp
                company_id
                ip
            }
        }
    `;
}
export const listCompanyDomainById = (id) => {
    return gql`
        query ListCompanyDomainById {
            company_domain(where: {id: {_eq: ${id}}}) {
                id
                dns
                host
                name
                smtp
                company_id
                ip
            }
        }
    `;
}

export const listCompanyDomainsByRequirementId = (requirement_id) => {
    return gql`
        query ListCompanyDomainsByRequirementId {
            company_domain(where: {campaigns: {requirement_id: {_eq: ${requirement_id}}}}) {
                id
                dns
                host
                name
                smtp
                company_id
                ip
            }
        }
    `;
}

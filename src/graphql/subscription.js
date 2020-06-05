import gql from 'graphql-tag';

export const GET_ALL_CLIENTS =gql`
    subscription ListClients($limit: Int!, $offset: Int) {
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
        subscription ListClients {
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

export const GET_ALL_SAILEBOTS = gql`
    subscription ListSaileBots($limit: Int, $offset: Int) {
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


export const listClientSaileBots = (client_id) => {
    return gql`
        subscription ListClientSaileBots {
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
            }
        }
    `;
}

export const listSaileBots = (limit) => {
    return gql`
        subscription ListSaileBots {
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
            }
        }
    `;
}
export const GET_ALL_CAMPAIGNS = gql`
    subscription ListCampaigns {
        campaign(limit: Int, offset: Int) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            run_status
            is_running
            to_run
            status_message
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
export const listCampaignAccounts = (campaign_id, limit=100, is_scheduled=false) => {
    return gql`
    subscription ListCampaignAccounts {
        campaign_account(limit:${limit}, offset: 0, where: {campaign_id: {_eq: ${campaign_id}}}) {
            account {
                    NAICS
                    city
                    domain
                    address
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

export const listCampaigns = (limit) => {
    return gql`
    subscription ListCampaigns {
        campaign(limit: ${limit}, offset: 0) {
            accounts_per_schedule
            description
            id
            name
            requirement_id
            run_status
            is_running
            to_run
            status_message
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
}

export const listRequirementCampaigns = (requirement_id) => {
    return gql`
    subscription ListCampaigns {
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
}

export const listCampaignTemplates = (campaign_id) => {
    return gql`
        subscription ListCampaignTemplates {
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
        subscription ListTemplates {
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

export const listSchedules = (limit=10, offset=0, account_limit=10, account_offset=0) => {
    return gql`
        subscription ListSchedules {
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
                accounts_per_schedule
                schedule_accounts {
                    id
                    account_id
                    schedule_id
                }
            }
        }
    `;
}

export const listCampaignSchedules = (campaign_id) => {
    return gql`
    subscription listCampaignSchedules {
        schedule(where: {campaign_id: {_eq: ${campaign_id}}}) {
            campaign_id
            date
            daily_outbound_limit
            created_at
            deploy_date
            id
            name
            no_targets_per_accounts
            status
            timezone
            updated_at
            accounts_per_schedule
            schedule_accounts {
                id
                account_id
                schedule_id
            }
      }
    }
  `;
  }
export const listAccounts = (limit=10, offset=0) => {
    return gql`
        subscription ListAccounts {
            account(limit: ${limit}, offset: ${offset}) {
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
}

export const listScheduleAccounts = (schedule_id, limit=10, offset=0) => {
    return gql`
        subscription ListScheduleAccounts {
            schedule_account(where: {schedule_id: {_eq: ${schedule_id}}}, limit: ${limit}, offset: ${offset}) {
                account {
                    NAICS
                    city
                    address
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
                id
                schedule_id
            }
        }
    `;
}

export const listAllCampaignAccounts = (campaign_id) => {
    return gql`
        subscription ListAllCampaignAccounts {
            campaign_account(where: {campaign_id: {_eq: ${campaign_id}}}) {
                account {
                    NAICS
                    city
                    domain
                    address
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
        subscription GetAccountByExtrenalId {
            account(where: {ex_id: {_eq: ${ex_id}}}) {
                id
            }
        }
    `;
}

export const get_accounts_by_campaign_id = (campaign_id=5) => {
    return gql`
        subscription GetAccountsByCampaignId {
            account(where: {account_campaigns: {campaign_id: {_eq: 5}}}) {
                id
                ex_id
            }
        }
    `;
}

export const listContacts = (limit=10, offset=0, event_limit=10, event_offset=0) => {
    return gql`
        subscription ListContacts {
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

export const listAccountContacts = (account_id, limit=10, offset=0, event_limit=10, event_offset=0) => {
    return gql`
        subscription ListAccountContacts {
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

export const sailebotEventCountByLabel = (sailebot_id, label_query) => {
    return gql`
        subscription SailebotEventCountByLabel {
            event_aggregate(where: {contact: {account: {schedule_accounts: {schedule: {campaign: {requirement: {sailebot_id: {_eq: ${sailebot_id}}}}}}}}, label: {_eq: "${label_query}"}}) {
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

export const clientEventCountByLabel = (client_id, label_query) => {
    return gql`
        subscription ClientEventCountByLabel {
            event_aggregate(where: {contact: {account: {schedule_accounts: {schedule: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}}}}}, label: {_eq: "${label_query}"}}) {
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

export const sailebotEventCount = (sailebot_id) => {
    return gql`
        subscription ClientEventCount {
            event_aggregate(where: {contact: {account: {schedule_accounts: {schedule: {campaign: {requirement: {sailebot_id: {_eq: ${sailebot_id}}}}}}}}}) {
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
        subscription SailebotEventCount {
            event_aggregate(where: {contact: {account: {schedule_accounts: {schedule: {campaign: {requirement: {sailebot: {client_id: {_eq: ${client_id}}}}}}}}}}) {
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

export const listEvents = (limit=10, offset=0) => {
    return gql`
        subscription ListEvents {
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

export const listContactEvents = (contact_id, limit=10, offset=0, event_limit=10, event_offset=0) => {
    return gql`
        subscription ListContactEvents {
            event(where: {contact_id: {_eq: ${contact_id}}}, limit: ${limit}, offset: ${offset}) {
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
        subscription ListRequirements {
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
        subscription ListDomains {
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


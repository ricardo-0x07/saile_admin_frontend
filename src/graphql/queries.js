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
export const listCampaignAccounts = (campaign_id, limit=100, is_scheduled=false) => {
    return gql`
    query ListCampaignAccounts {
        campaign_account(limit:${limit}, offset: 0, where: {campaign_id: {_eq: ${campaign_id}}}) {
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

export const listCampaigns = (limit) => {
    return gql`
    query ListCampaigns {
        campaign(limit: ${limit}, offset: 0) {
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

export const listSchedules = (limit=10, offset=0, account_limit=10, account_offset=0) => {
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
            }
        }
    `;
}

export const listCampaignSchedules = (campaign_id) => {
    return gql`
    query listCampaignSchedules {
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
        query ListAccounts {
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
                id
                schedule_id
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

export const get_accounts_by_campaign_id = (campaign_id=5) => {
    return gql`
        query GetAccountsByCampaignId {
            account(where: {account_campaigns: {campaign_id: {_eq: 5}}}) {
                id
                ex_id
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


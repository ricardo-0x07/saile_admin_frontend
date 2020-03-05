import gql from 'graphql-tag';

export const listCompanies = (limit) => {
    return gql`
        query ListCompanies {
            company(limit: ${limit}) {
                address
                email
                fax
                id
                name
                phone
                website
                clients {
                    company_id
                    id
                    name
                }
            }
        }
    `;
}

export const listClients = (limit) => {
    return gql`
        query ListClients {
            client(limit: ${limit}, offset: 0) {
                company_id
                id
                name
                sailebots {
                    client_id
                    email
                    fullname
                    id
                    name
                    no_targets
                    phone
                    title
                }
            }
        }
    `;
}


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

export const listCampaigns = (limit) => {
    return gql`
        query ListCampaigns {
            campaign(limit: ${limit}, offset: 0) {
                description
                id
                name
                requirement_id
                schedules {
                    campaign_id
                    daily_outbound_limit
                    id
                    name
                    no_targets_per_accounts
                }
                templates {
                    body_html_text
                    body_text
                    campaign_id
                    id
                    name
                    subject
                }
                accounts {
                    address
                    campaign_id
                    domain
                    email
                    employees
                    fax
                    id
                    name
                    phone
                    revenue
                    state
                    website
                }
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

export const listSchedules = (limit) => {
    return gql`
        query ListSchedules {
            schedule(limit: ${limit}, offset: 0) {
                campaign_id
                id
                name
                no_targets_per_accounts
                daily_outbound_limit
            }
        }
    `;
}

export const listAccounts = (limit=10, offset=0, target_limit=10, target_offset=0) => {
    return gql`
        query ListAccounts {
            account(limit: ${limit}, offset: ${offset}) {
                address
                domain
                email
                employees
                fax
                id
                name
                phone
                revenue
                campaign_id
                state
                website
                targets(limit: ${target_limit}, offset: ${target_offset}) {
                    account_id
                    bounce_type
                    email
                    fax
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
            }
        }
    `;
}


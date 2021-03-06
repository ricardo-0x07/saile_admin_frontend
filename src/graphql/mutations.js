import gql from 'graphql-tag';


export const createCompany = gql`
  mutation insert_company($objects: [company_insert_input!]!) {
    insert_company(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateCompany = gql`
  mutation UpdateCompany($objects: company_set_input!, $id: Int) {
    update_company(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createClient = gql`
  mutation insert_client($objects: [client_insert_input!]!) {
    insert_client(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateClient = gql`
  mutation UpdateClient($objects: client_set_input!, $id: Int) {
    update_client(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createSaileBot = gql`
  mutation InsertSaileBot($objects: [sailebot_insert_input!]!) {
    insert_sailebot(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateSaileBot = gql`
  mutation UpdateSaileBot($objects: sailebot_set_input!, $id: Int) {
    update_sailebot(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createCampaign = gql`
  mutation InsertCampaign($objects: [campaign_insert_input!]!) {
    insert_campaign(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const createUpdateCampaign = gql`
  mutation InsertCampaign($objects: [campaign_insert_input!]!) {
    insert_campaign(objects: $objects, on_conflict: {constraint: campaign_name_key, update_columns: [name]}) {
      returning {
        id
      }
    }
  }
`;

export const updateCampaign = gql`
  mutation UpdateCampaign($objects: campaign_set_input!, $id: Int) {
    update_campaign(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createTemplate = gql`
  mutation InsertTemplate($objects: [template_insert_input!]!) {
    insert_template(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateTemplate = gql`
  mutation UpdateTemplate($objects: template_set_input!, $id: Int) {
    update_template(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createAccount = gql`
  mutation InsertAccount($objects: [account_insert_input!]!) {
    insert_account(objects: $objects, on_conflict: {constraint: account_name_email_domain_key, update_columns: [NAICS, address, country, email_domain, employees, fax, name, phone, revenue, street, state, website, city]}) {
      returning {
        id
      }
    }
  }
`;

export const createUpdateAccount = gql`
  mutation InsertAccount($objects: [account_insert_input!]!) {
    insert_account(objects: $objects, on_conflict: {constraint: account_name_email_domain_key, update_columns: [email_domain, name]}) {
      returning {
        id
      }
    }
  }
`;

export const createContactAccount = gql`
  mutation InsertAccount($objects: [account_insert_input!]!) {
    insert_account(objects: $objects, on_conflict: {constraint: account_name_email_domain_key, update_columns: [name, email_domain, account_id]}) {
      returning {
        id
      }
    }
  }
`;

export const createScheduleAccount = gql`
  mutation InsertScheduleAccount($objects: [schedule_account_insert_input!]!) {
    insert_schedule_account(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const createCampaignAccount = gql`
  mutation InsertCampaignAccount($objects: [campaign_account_insert_input!]!) {
    insert_campaign_account(objects: $objects, on_conflict: {constraint: campaign_account_campaign_id_account_id_key, update_columns: [campaign_id, account_id]}) {
      returning {
        id
        status
      }
    }
  }
`;

export const createUpdateCampaignAccountChangeStatus = gql`
  mutation InsertCampaignAccount($objects: [campaign_account_insert_input!]!) {
    insert_campaign_account(objects: $objects, on_conflict: {constraint: campaign_account_campaign_id_account_id_key, update_columns: [campaign_id, account_id, status, is_delisted]}) {
      returning {
        id
        status
        is_delisted
        account_id
        campaign_id
        account { 
          name
          email_domain
        }
      }
    }
  }
`;


export const createUpdateCampaignAccount = gql`
  mutation InsertCampaignAccount($objects: [campaign_account_insert_input!]!) {
    insert_campaign_account(objects: $objects, on_conflict: {constraint: campaign_account_campaign_id_account_id_key, update_columns: [campaign_id, account_id, is_delisted, status]}) {
      returning {
        id
        status
        is_delisted
        account_id
        campaign_id
      }
    }
  }
`;

export const createContactCampaignAccount = gql`
  mutation InsertCampaignAccount($objects: [campaign_account_insert_input!]!) {
    insert_campaign_account(objects: $objects, on_conflict: {constraint: campaign_account_campaign_id_account_id_key, update_columns: [campaign_id, account_id]}) {
      returning {
        id
      }
    }
  }
`;

export const createCampaignContact = gql`
  mutation InsertCampaignContact($objects: [campaign_contact_insert_input!]!) {
    insert_campaign_contact(objects: $objects, on_conflict: {constraint: campaign_contact_campaign_id_contact_id_key, update_columns: [campaign_id, account_id, contact_id]}) {
      returning {
        id
      }
    }
  }
`;

export const createUpdateCampaignContactChangeStatus = gql`
  mutation InsertCampaignContact($objects: [campaign_contact_insert_input!]!) {
    insert_campaign_contact(objects: $objects, on_conflict: {constraint: campaign_contact_campaign_id_contact_id_key, update_columns: [campaign_id, account_id, contact_id, is_delisted, status]}) {
      returning {
        id
      }
    }
  }
`;


export const createUpdateCampaignContact = gql`
  mutation InsertCampaignContact($objects: [campaign_contact_insert_input!]!) {
    insert_campaign_contact(objects: $objects, on_conflict: {constraint: campaign_contact_campaign_id_contact_id_key, update_columns: [campaign_id, account_id, contact_id, is_delisted]}) {
      returning {
        id
      }
    }
  }
`;

export const updateCampaignContact = gql`
  mutation UpdateCampaignContact($objects: campaign_contact_set_input, $contact_id: Int!, $campaign_id: Int!) {
    update_campaign_contact(_set: $objects, where: {contact_id: {_eq: $contact_id}, campaign_id: {_eq: $campaign_id}}) {
      returning {
        id
      }
    }
  }
`;

export const updateCampaignAccount = gql`
  mutation UpdateCampaignAccount($objects: campaign_account_set_input, $id_list: [Int!]!) {
    update_campaign_account(_set: $objects, where: {id: {_in: $id_list}}) {
      affected_rows
    }
  }
`;


export const updateSingleCampaignAccount = gql`
  mutation UpdateCampaignAccount($objects: campaign_account_set_input, $account_id: Int!, $campaign_id: Int!) {
    update_campaign_account(_set: $objects, where: {account_id: {_eq: $account_id}, campaign_id: {_eq: $campaign_id}}) {
      affected_rows
    }
  }
`;

export const delistCampaignAccountByName = gql`
  mutation DelistCampaignAccountByName($name: String!, $campaign_id: Int!) {
    update_campaign_account(_set: {is_delisted: true}, where: {account: {name: {_eq: $name}}, campaign_id: {_eq: $campaign_id}}) {
      affected_rows
    }
  }
`;

export const delistCampaignAccountByEmailDomain = gql`
  mutation DelistCampaignAccountByEmailDomain($email_domain: String!, $campaign_id: Int!) {
    update_campaign_account(_set: {is_delisted: true}, where: {account: {email_domain: {_eq: $email_domain}}, campaign_id: {_eq: $campaign_id}}) {
      affected_rows
    }
  }
`;

export const updateAccount = gql`
  mutation UpdateAccount($objects: account_set_input!, $id: Int) {
    update_account(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createContact = gql`
  mutation InsertContact( $objects: [contact_insert_input!]! ) {
    insert_contact(objects: $objects, on_conflict: {constraint: contact_email_key, update_columns: [bounce_type, city, country, created_at, email, firstname, gender, is_ema_eligible, is_eva_eligible, is_referral, lastname, linkedin, member_status, phone, position, role, sam_status, source, state, title, updated_at]}) {
      returning {
        id
        account_id
      }
    }
  }
`;

export const createUpdateContact = gql`
  mutation InsertContact( $objects: [contact_insert_input!]! ) {
    insert_contact(objects: $objects, on_conflict: {constraint: contact_email_key, update_columns: [email]}) {
      returning {
        id
        account_id
      }
    }
  }
`;
export const updateContact = gql`
  mutation UpdateContact($objects: contact_set_input!, $id: Int) {
    update_contact(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        email
        firstname
        lastname
        id
        unsubscribed
      }
    }
  }
`;


export const createEvent = gql`
  mutation InsertEvent($objects: [event_insert_input!]!) {
    insert_event(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateEvent = gql`
  mutation UpdateEvent($objects: event_set_input!, $id: Int) {
    update_event(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;



export const createRequirement = gql`
  mutation InsertRequirement($objects: [requirement_insert_input!]!) {
    insert_requirement(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateRequirement = gql`
  mutation UpdateRequirement($objects: requirement_set_input!, $id: Int) {
    update_requirement(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createSchedule = gql`
  mutation InsertSchedule($objects: [schedule_insert_input!]!) {
    insert_schedule(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateSchedule = gql`
  mutation UpdateSchedule($objects: schedule_set_input!, $id: Int) {
    update_schedule(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;


export const createDomain = gql`
  mutation InsertDomain($objects: [domain_insert_input!]!) {
    insert_domain(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateDomain = gql`
  mutation UpdateDomain($objects: domain_set_input!, $id: Int) {
    update_domain(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const createCompanyDomain = gql`
  mutation InsertCompanyDomain($objects: [company_domain_insert_input!]!) {
    insert_company_domain(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateCompanyDomain = gql`
  mutation UpdateCompanyDomain($objects: company_domain_set_input!, $id: Int) {
    update_company_domain(where: {id: {_eq: $id}}, _set: $objects) {
      affected_rows
    }
  }
`;

export const deleteCampaignAccount = gql`
  mutation DeleteCampaignContacts( $account_id: Int, $campaign_id: Int) {
    delete_event(where: {contact: {contact_campaigns: {account_id: {_eq: $account_id}, campaign_id: {_eq: $campaign_id}}}}) {
      affected_rows
    }
  }
`;

export const deleteCampaignContacts = gql`
  mutation DeleteCampaignContacts( $account_id: Int, $campaign_id: Int) {
    delete_event(where: {contact: {contact_campaigns: {account_id: {_eq: $account_id}, campaign_id: {_eq: $campaign_id}}}}) {
      affected_rows
    }
  }
`;

export const deleteCampaignAccountContactEvents = gql`
  mutation DeleteCampaignAccountContactEvents( $account_id: Int, $campaign_id: Int) {
    delete_event(where: {contact: {contact_campaigns: {account_id: {_eq: $account_id}, campaign_id: {_eq: $campaign_id}}}}) {
      affected_rows
    }
  }
`;

export const deleteScheduleAccount = gql`
  mutation DeleteScheduleAccount( $account_id: Int, $campaign_id: Int) {
    delete_schedule_account(where: {account_id: {_eq: $account_id}, campaign_id: {_eq: $campaign_id}}) {
      affected_rows
    }
  }
`;

export const deleteCampaignContact = gql`
  mutation DeleteCampaignContact( $contact_id: Int, $campaign_id: Int) {
    delete_schedule_account(where: {contact_id: {_eq: $contact_id}, campaign_id: {_eq: $campaign_id}}) {
      affected_rows
    }
  }
`;

export const deleteEvent = gql`
  mutation DeleteEvent( $id: Int ) {
    delete_event(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const deleteOutboundEventByContactIdLabel = gql`
  mutation DeleteOutboundEventByContactIdLabel( $contact_id: Int, $label: String ) {
    delete_event(where: {contact_id: {_eq: $contact_id}, label: {_eq: $label}, is_inbound: {_eq: false}}) {
      affected_rows
    }
  }
`;




import gql from 'graphql-tag';


export const createCompany = gql`
  mutation insert_company($objects: [company_insert_input!]!) {
    insert_company(objects: $objects) {
      returning {
        address
        email
        fax
        id
        name
        phone
        website
      }
    }
  }
`;

export const updateCompany = gql`
  mutation UpdateCompany($objects: company_set_input!, $id: Int) {
    update_company(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        address
        email
        fax
        id
        name
        phone
        website
      }
    }
  }
`;

export const createClient = gql`
  mutation insert_client($objects: [client_insert_input!]!) {
    insert_client(objects: $objects) {
      returning {
        company_id
        id
        name
      }
    }
  }
`;

export const updateClient = gql`
  mutation UpdateClient($objects: client_set_input!, $id: Int) {
    update_client(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        company_id
        id
        name
      }
    }
  }
`;

export const createSaileBot = gql`
  mutation InsertSaileBot($objects: [sailebot_insert_input!]!) {
    insert_sailebot(objects: $objects) {
      returning {
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

export const updateSaileBot = gql`
  mutation UpdateSaileBot($objects: sailebot_set_input!, $id: Int) {
    update_sailebot(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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

export const createCampaign = gql`
  mutation InsertCampaign($objects: [campaign_insert_input!]!) {
    insert_campaign(objects: $objects) {
      returning {
        description
        id
        name
        requirement_id
      }
    }
  }
`;

export const updateCampaign = gql`
  mutation UpdateCampaign($objects: campaign_set_input!, $id: Int) {
    update_campaign(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        description
        id
        name
        requirement_id
      }
    }
  }
`;

export const createTemplate = gql`
  mutation InsertTemplate($objects: [template_insert_input!]!) {
    insert_template(objects: $objects) {
      returning {
        body_html_text
        body_text
        campaign_id
        name
        subject
      }
    }
  }
`;

export const updateTemplate = gql`
  mutation UpdateTemplate($objects: template_set_input!, $id: Int) {
    update_template(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        body_html_text
        body_text
        campaign_id
        name
        subject
      }
    }
  }
`;

export const createAccount = gql`
  mutation InsertAccount($objects: [account_insert_input!]!) {
    insert_account(objects: $objects) {
      returning {
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

export const updateAccount = gql`
  mutation UpdateAccount($objects: account_set_input!, $id: Int) {
    update_account(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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

export const createContact = gql`
  mutation InsertContact($objects: [contact_insert_input!]!) {
    insert_contact(objects: $objects) {
      returning {
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

export const updateContact = gql`
  mutation UpdateContact($objects: contact_set_input!, $id: Int) {
    update_contact(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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


export const createEvent = gql`
  mutation InsertEvent($objects: [event_insert_input!]!) {
    insert_event(objects: $objects) {
      returning {
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

export const updateEvent = gql`
  mutation UpdateEvent($objects: event_set_input!, $id: Int) {
    update_event(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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


export const createRequirement = gql`
  mutation InsertRequirement($objects: [requirement_insert_input!]!) {
    insert_requirement(objects: $objects) {
      returning {
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
    }
  }
`;

export const updateRequirement = gql`
  mutation UpdateRequirement($objects: requirement_set_input!, $id: Int) {
    update_requirement(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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
    }
  }
`;

export const createSchedule = gql`
  mutation InsertSchedule($objects: [schedule_insert_input!]!) {
    insert_schedule(objects: $objects) {
      returning {
        campaign_id
        daily_outbound_limit
        id
        name
        no_targets_per_accounts
      }
    }
  }
`;

export const updateSchedule = gql`
  mutation UpdateSchedule($objects: schedule_set_input!, $id: Int) {
    update_schedule(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        campaign_id
        daily_outbound_limit
        id
        name
        no_targets_per_accounts
      }
    }
  }
`;


export const createDomain = gql`
  mutation InsertDomain($objects: [domain_insert_input!]!) {
    insert_domain(objects: $objects) {
      returning {
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
  }
`;

export const updateDomain = gql`
  mutation UpdateDomain($objects: domain_set_input!, $id: Int) {
    update_domain(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
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
  }
`;



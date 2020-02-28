/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      name
      description
      targets {
        items {
          id
          firstname
          lastname
          gender
          title
          phone
          fax
          email
          sam_status
          bounce_type
          isema_eligible
          iseva_eligible
          member_status
          role
          position
          first_outbound_done
          second_outbound_done
          is_referral
          to_referral
          account {
            id
            name
            employees
            revenue
            phone
            fax
            email
            address
            billing_state
            billing_city
            billing_country
            website
            targets {
              nextToken
            }
          }
          campaign {
            id
            name
            description
            targets {
              nextToken
            }
            templates {
              nextToken
            }
          }
          events {
            items {
              id
              label
              date
              sender
              to
              cc
              subject
              body
            }
            nextToken
          }
        }
        nextToken
      }
      templates {
        items {
          id
          name
          subject
          body_text
          body_html_text
          campaigns {
            id
            name
            description
            targets {
              nextToken
            }
            templates {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        targets {
          items {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
          nextToken
        }
        templates {
          items {
            id
            name
            subject
            body_text
            body_html_text
            campaigns {
              id
              name
              description
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      name
      employees
      revenue
      phone
      fax
      email
      address
      billing_state
      billing_city
      billing_country
      website
      targets {
        items {
          id
          firstname
          lastname
          gender
          title
          phone
          fax
          email
          sam_status
          bounce_type
          isema_eligible
          iseva_eligible
          member_status
          role
          position
          first_outbound_done
          second_outbound_done
          is_referral
          to_referral
          account {
            id
            name
            employees
            revenue
            phone
            fax
            email
            address
            billing_state
            billing_city
            billing_country
            website
            targets {
              nextToken
            }
          }
          campaign {
            id
            name
            description
            targets {
              nextToken
            }
            templates {
              nextToken
            }
          }
          events {
            items {
              id
              label
              date
              sender
              to
              cc
              subject
              body
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        employees
        revenue
        phone
        fax
        email
        address
        billing_state
        billing_city
        billing_country
        website
        targets {
          items {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getTarget = /* GraphQL */ `
  query GetTarget($id: ID!) {
    getTarget(id: $id) {
      id
      firstname
      lastname
      gender
      title
      phone
      fax
      email
      sam_status
      bounce_type
      isema_eligible
      iseva_eligible
      member_status
      role
      position
      first_outbound_done
      second_outbound_done
      is_referral
      to_referral
      account {
        id
        name
        employees
        revenue
        phone
        fax
        email
        address
        billing_state
        billing_city
        billing_country
        website
        targets {
          items {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
          nextToken
        }
      }
      campaign {
        id
        name
        description
        targets {
          items {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
          nextToken
        }
        templates {
          items {
            id
            name
            subject
            body_text
            body_html_text
            campaigns {
              id
              name
              description
            }
          }
          nextToken
        }
      }
      events {
        items {
          id
          label
          date
          sender
          to
          cc
          subject
          body
          target {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const listTargets = /* GraphQL */ `
  query ListTargets(
    $filter: ModelTargetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTargets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        gender
        title
        phone
        fax
        email
        sam_status
        bounce_type
        isema_eligible
        iseva_eligible
        member_status
        role
        position
        first_outbound_done
        second_outbound_done
        is_referral
        to_referral
        account {
          id
          name
          employees
          revenue
          phone
          fax
          email
          address
          billing_state
          billing_city
          billing_country
          website
          targets {
            items {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
            nextToken
          }
        }
        campaign {
          id
          name
          description
          targets {
            items {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
            nextToken
          }
          templates {
            items {
              id
              name
              subject
              body_text
              body_html_text
            }
            nextToken
          }
        }
        events {
          items {
            id
            label
            date
            sender
            to
            cc
            subject
            body
            target {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      label
      date
      sender
      to
      cc
      subject
      body
      target {
        id
        firstname
        lastname
        gender
        title
        phone
        fax
        email
        sam_status
        bounce_type
        isema_eligible
        iseva_eligible
        member_status
        role
        position
        first_outbound_done
        second_outbound_done
        is_referral
        to_referral
        account {
          id
          name
          employees
          revenue
          phone
          fax
          email
          address
          billing_state
          billing_city
          billing_country
          website
          targets {
            items {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
            nextToken
          }
        }
        campaign {
          id
          name
          description
          targets {
            items {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
            nextToken
          }
          templates {
            items {
              id
              name
              subject
              body_text
              body_html_text
            }
            nextToken
          }
        }
        events {
          items {
            id
            label
            date
            sender
            to
            cc
            subject
            body
            target {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        date
        sender
        to
        cc
        subject
        body
        target {
          id
          firstname
          lastname
          gender
          title
          phone
          fax
          email
          sam_status
          bounce_type
          isema_eligible
          iseva_eligible
          member_status
          role
          position
          first_outbound_done
          second_outbound_done
          is_referral
          to_referral
          account {
            id
            name
            employees
            revenue
            phone
            fax
            email
            address
            billing_state
            billing_city
            billing_country
            website
            targets {
              nextToken
            }
          }
          campaign {
            id
            name
            description
            targets {
              nextToken
            }
            templates {
              nextToken
            }
          }
          events {
            items {
              id
              label
              date
              sender
              to
              cc
              subject
              body
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const getTemplate = /* GraphQL */ `
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
      id
      name
      subject
      body_text
      body_html_text
      campaigns {
        id
        name
        description
        targets {
          items {
            id
            firstname
            lastname
            gender
            title
            phone
            fax
            email
            sam_status
            bounce_type
            isema_eligible
            iseva_eligible
            member_status
            role
            position
            first_outbound_done
            second_outbound_done
            is_referral
            to_referral
            account {
              id
              name
              employees
              revenue
              phone
              fax
              email
              address
              billing_state
              billing_city
              billing_country
              website
            }
            campaign {
              id
              name
              description
            }
            events {
              nextToken
            }
          }
          nextToken
        }
        templates {
          items {
            id
            name
            subject
            body_text
            body_html_text
            campaigns {
              id
              name
              description
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        subject
        body_text
        body_html_text
        campaigns {
          id
          name
          description
          targets {
            items {
              id
              firstname
              lastname
              gender
              title
              phone
              fax
              email
              sam_status
              bounce_type
              isema_eligible
              iseva_eligible
              member_status
              role
              position
              first_outbound_done
              second_outbound_done
              is_referral
              to_referral
            }
            nextToken
          }
          templates {
            items {
              id
              name
              subject
              body_text
              body_html_text
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;

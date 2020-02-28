/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createTarget = /* GraphQL */ `
  mutation CreateTarget(
    $input: CreateTargetInput!
    $condition: ModelTargetConditionInput
  ) {
    createTarget(input: $input, condition: $condition) {
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
export const updateTarget = /* GraphQL */ `
  mutation UpdateTarget(
    $input: UpdateTargetInput!
    $condition: ModelTargetConditionInput
  ) {
    updateTarget(input: $input, condition: $condition) {
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
export const deleteTarget = /* GraphQL */ `
  mutation DeleteTarget(
    $input: DeleteTargetInput!
    $condition: ModelTargetConditionInput
  ) {
    deleteTarget(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createTemplate = /* GraphQL */ `
  mutation CreateTemplate(
    $input: CreateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    createTemplate(input: $input, condition: $condition) {
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
export const updateTemplate = /* GraphQL */ `
  mutation UpdateTemplate(
    $input: UpdateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    updateTemplate(input: $input, condition: $condition) {
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
export const deleteTemplate = /* GraphQL */ `
  mutation DeleteTemplate(
    $input: DeleteTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    deleteTemplate(input: $input, condition: $condition) {
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

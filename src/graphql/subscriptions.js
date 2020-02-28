/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign {
    onCreateCampaign {
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign {
    onUpdateCampaign {
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign {
    onDeleteCampaign {
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
export const onCreateTarget = /* GraphQL */ `
  subscription OnCreateTarget {
    onCreateTarget {
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
export const onUpdateTarget = /* GraphQL */ `
  subscription OnUpdateTarget {
    onUpdateTarget {
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
export const onDeleteTarget = /* GraphQL */ `
  subscription OnDeleteTarget {
    onDeleteTarget {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate {
    onCreateTemplate {
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
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate {
    onUpdateTemplate {
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
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate {
    onDeleteTemplate {
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

import Roles from './roles';
import ManageCampaign from '../routes/ManageCampaign'
import ManageClient from '../routes/ManageClient'
import ManageCompany from '../routes/ManageCompany'
import ManageSaileBot from '../routes/ManageSaileBot'
import ManageDomain from '../routes/ManageDomain'
import ManageCompanyDomain from '../routes/ManageCompanyDomain'
import ManageTemplate from '../routes/ManageTemplate'
import ManageAccount from '../routes/ManageAccount'
import ManageContact from '../routes/ManageContact'
import ManageRequirement from '../routes/ManageRequirement'
import ManageSchedule from '../routes/ManageSchedule'
import Campaigns from '../routes/Campaigns'
import Requirements from '../routes/Requirements'
import Schedules from '../routes/Schedules'
import Clients from '../routes/Clients'
import SaileBots from '../routes/SaileBots'
import Domains from '../routes/Domains'
import CompanyDomains from '../routes/CompanyDomains'
import Accounts from '../routes/Accounts'
import ScheduleAccounts from '../routes/ScheduleAccounts'
import Contacts from '../routes/Contacts'
import Events from '../routes/Events'
import CampaignContactEvents from '../routes/CampaignContactEvents'
import SailebotEvents from '../routes/SailebotEvents'
import Clarifications from '../routes/Clarifications';
import Templates from '../routes/Templates'
import Companies from '../routes/Companies';
import Deployments from '../routes/Deployments';
import ManageEvent from '../routes/ManageEvent'
import Questionnaires from '../routes/Questionnaires';

export default [
    {
        component: Accounts,
        path: '/accounts-by-campaign',
        title: 'Campaign Accounts',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ScheduleAccounts,
        path: '/accounts-by-schedule',
        title: 'Schedule Accounts',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageAccount,
        path: '/manage-account',
        title: 'Create/Edit Account',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Companies,
        path: '/',
        title: 'Companies',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Companies,
        path: '/companies',
        title: 'Companies',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageCompany,
        path: '/manage-company',
        title: 'Create/Edit Company',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: CompanyDomains,
        path: '/company-domains',
        title: 'Company Domains',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageCompanyDomain,
        path: '/manage-company-domain',
        title: 'Create/Edit Company Domain',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Clients,
        path: '/clients-by-company',
        title: 'Company Clients',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageClient,
        path: '/manage-client',
        title: 'Create/Edit Client',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Contacts,
        path: '/contacts-by-account',
        title: 'Account Contacts',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageContact,
        path: '/manage-contact',
        title: 'Create/Edit Contact',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Events,
        path: '/events-by-contact',
        title: 'Contact Events',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Clarifications,
        path: '/clarifications-by-campaign',
        title: 'Clarifications',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            // Roles.DOO,
        ]
    },
    {
        component: CampaignContactEvents,
        path: '/events-by-campaign-contact',
        title: 'Campaign Contact Events',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: SailebotEvents,
        path: '/events-by-client',
        title: 'Client Sailebot Events',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: SailebotEvents,
        path: '/events-by-sailebot',
        title: 'Sailebot Events',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageEvent,
        path: '/manage-event',
        title: 'Create/Edit Event',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Questionnaires,
        path: '/questionnaires-by-client' ,
        title: 'Client Questionnaires',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Requirements,
        path: '/requirements-by-sailebot',
        title: 'Requirement Requirement',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageRequirement,
        path: '/manage-requirement',
        title: 'Create/Edit Requirement',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component:SaileBots,
        path: '/sailebots-by-client',
        title: 'RequirementSailebot',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageSaileBot,
        path: '/manage-sailebot',
        title: 'Create/EditSailebot',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Campaigns,
        path: '/campaigns-by-requirement',
        title: 'Requirement Campaign',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageCampaign,
        path: '/manage-campaign',
        title: 'Create/Edit Campaign',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Templates,
        path: '/templates-by-campaign',
        title: 'Campaign Template',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Deployments,
        path: '/deployments',
        title: 'Campaign Deployments',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
        ]
    },
    {
        component: ManageTemplate,
        path: '/manage-template',
        title: 'Create/Edit Template',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Schedules,
        path: '/schedules-by-template',
        title: 'Campaign Schedule',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageSchedule,
        path: '/manage-schedule',
        title: 'Create/Edit Schedule',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: Domains,
        path: '/domains',
        title: 'Campaign Domain',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    },
    {
        component: ManageDomain,
        path: '/manage-domain',
        title: 'Create/Edit Domain',
        exact: true,
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.SUPPORT,
            Roles.DOO,
        ]
    }
]
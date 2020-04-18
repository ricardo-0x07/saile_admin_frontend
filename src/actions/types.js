export const LOGIN_ACTION = "LOGIN_ACTION"
export const LOGOUT_ACTION = "LOGOUT_ACTION"
const baseUrl = 'https://saile-graph-api.net'

export const Endpoints = {
    getSchema: `${baseUrl}/v1/query`,
    serverConfig: `${baseUrl}/v1alpha1/config`,
    graphQLUrl: `${baseUrl}/v1/graphql`,
    schemaChange: `${baseUrl}/v1/query`,
    query: `${baseUrl}/v1/query`,
    rawSQL: `${baseUrl}/v1/query`,
    version: `${baseUrl}/v1/version`,
    updateCheck: 'https://releases.hasura.io/graphql-engine',
    // hasuractlMigrate: `${hasuractlUrl}/apis/migrate`,
    // hasuractlMetadata: `${hasuractlUrl}/apis/metadata`,
    // hasuractlMigrateSettings: `${hasuractlUrl}/apis/migrate/settings`,
    telemetryServer: 'wss://telemetry.hasura.io/v1/ws',
};

export const globalCookiePolicy = 'same-origin';
export const ADMIN_SECRET_HEADER_KEY = 'x-hasura-admin-secret';
export const LOAD_REQUEST = 'App/ONGOING_REQUEST';
export const DONE_REQUEST = 'App/DONE_REQUEST';
export const FAILED_REQUEST = 'App/FAILED_REQUEST';
export const ERROR_REQUEST = 'App/ERROR_REQUEST';
export const CONNECTION_FAILED = 'App/CONNECTION_FAILED';
export const ADMIN_SECRET = 'ADMIN_SECRET';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*'
};

const getHeaders = () => {
    return {
        ...headers,
    };
};

const actionable_opportunity_clarification_lambda_api_endpoint = "https://8xbo18ydk7.execute-api.us-west-2.amazonaws.com/Prod/"
const referral_clarification_lambda_api_endpoint = "https://d7quhnype6.execute-api.us-west-2.amazonaws.com/Prod/"
const get_campaign_tasks_stage_lambda_api_endpoint = "https://qcm444ja4d.execute-api.us-west-2.amazonaws.com/Stage/"
// const get_campaign_tasks_prod_lambda_api_endpoint = "https://qcm444ja4d.execute-api.us-west-2.amazonaws.com/Prod/"
const describe_service_stage_lambda_api_endpoint = "https://nblsxrt1wa.execute-api.us-west-2.amazonaws.com/Stage/"
// const describe_service_prod_lambda_api_endpoint = "https://nblsxrt1wa.execute-api.us-west-2.amazonaws.com/Prod/"
const update_service_stage_lambda_api_endpoint = "https://7854mzxicj.execute-api.us-west-2.amazonaws.com/Stage";
// const update_service_prod_lambda_api_endpoint = "https://7854mzxicj.execute-api.us-west-2.amazonaws.com/Prod/";
// const deploy_campaign_prod_lambda_api_endpoint = "https://irsx06k6ef.execute-api.us-west-2.amazonaws.com/Prod/"
const deploy_campaign_stage_lambda_api_endpoint = "https://irsx06k6ef.execute-api.us-west-2.amazonaws.com/Stage/"
const list_services_campaign_ids_stage_lambda_api_endpoint = "https://awhqm7cmrh.execute-api.us-west-2.amazonaws.com/Stage";

export const getECSServicesCampaignIds = () => {
    return fetch(list_services_campaign_ids_stage_lambda_api_endpoint, {
        method: 'GET',
        headers: getHeaders(),
    })
};
export const createreferral = referral => {
    return fetch(referral_clarification_lambda_api_endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(referral)
    })
};

export const createActionableOpportunity = opportunity => {
    return fetch(actionable_opportunity_clarification_lambda_api_endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(opportunity)
    })
};

export const describeService = params => {
    console.log("params: ", params)
    return fetch(describe_service_stage_lambda_api_endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params)
    })
};

export const updateService = params => {
    return fetch(update_service_stage_lambda_api_endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params)
    })
};

export const deployCampaign = params => {
    return fetch(deploy_campaign_stage_lambda_api_endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params)
    })
};

export const getCampaignECSDeployments = () => {
    return fetch(get_campaign_tasks_stage_lambda_api_endpoint, {
        method: 'GET',
        headers: getHeaders(),
    })
};



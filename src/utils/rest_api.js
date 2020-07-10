
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



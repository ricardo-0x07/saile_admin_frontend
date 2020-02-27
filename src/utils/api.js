let api = "http://localhost:5000";
if(mode === 'production') {
    api = "/api"    
}
let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const getHeaders = () => {
    return {
        ...headers,
    };
};


// Target endpoints
export const getTargets = () => {
    return fetch(`${api}/target`, {
        method: 'GET',
        headers: getHeaders()
    })
};

export const createTarget = target => {
    return fetch(`${api}/target`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(target)
    })
};

export const updateTarget = target => {
    return fetch(`${api}/target/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(target),
        headers: getHeaders()
    })
};


// Template endpoints
export const getTemplates = () => {
    return fetch(`${api}/template`, {
        method: 'GET',
        headers: getHeaders()
    })
};

export const createTemplate = template => {
    return fetch(`${api}/template`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(template)
    })
};

export const updateTemplate = template => {
    return fetch(`${api}/template/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(template),
        headers: getHeaders()
    })
};


// Event endpoints
export const getEvents = () => {
    return fetch(`${api}/event`, {
        method: 'GET',
        headers: getHeaders()
    })
};

export const createEvent = event => {
    return fetch(`${api}/event`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(event)
    })
};

export const updateEvent = event => {
    return fetch(`${api}/event/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: getHeaders()
    })
};


// Campaign endpoints
export const getCampaigns = () => {
    return fetch(`${api}/campaign`, {
        method: 'GET',
        headers: getHeaders()
    })
};

export const createCampaign = campaign => {
    return fetch(`${api}/campaign`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(campaign)
    })
};

export const updateCampaign = campaign => {
    return fetch(`${api}/campaign/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(campaign),
        headers: getHeaders()
    })
};
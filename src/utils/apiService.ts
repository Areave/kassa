import axios from 'axios';

// axios.defaults.withCredentials = true;

const endPoint = 'https://api.dev.100czk.cz/api_v2/';

const errorHandler = (error: any) => {
    error.message = error.response.data || {
        type: 'error',
        text: error.message || 'Error'
    };
    throw error;
};

const apiPostRequest = (url: string, data?: any) => {
    return axios.post(url, data).then((data: any) => {
        return Promise.resolve(data.data)
    }).catch(error => {
        console.log(error);
        throw error;
    })
};

const getTestToken = () => {
    return axios.post('https://api.dev.100czk.cz/api_v3/get_test_kiosk_token?sid=0')
        .then((data: any) => {
            return Promise.resolve(data.data)
        }).catch(error => {
            // errorHandler(error);
        })
};
const getCollectionStatus = (sid: string, apiUrl: string) => {
    return apiPostRequest(apiUrl + 'get_collection_status?sid=' + sid);
};
const startCollection = (sid: string, apiUrl: string, data: { username: string, password: string }) => {
    return apiPostRequest(apiUrl + 'start_collection?sid=' + sid, data);
};
const closeCollection = (sid: string, apiUrl: string, data: { objects: any[] }) => {
    return apiPostRequest(apiUrl + 'close_collection?sid=' + sid, data);
};

const goHome = (apiUrl: string) => {
    return apiPostRequest(apiUrl + 'kiosk_go_home');
};

export default {
    getTestToken,
    getCollectionStatus,
    startCollection,
    closeCollection,
    goHome
};
export const localHostApi = 'http://localhost:8080/exceptionSystem';


export const onlineHostApi = 'http://132.232.2.225:8805';

export const hostApi = '/api';


//const URLS = [localHostApi, onlineHostApi];



export function apiBase() {
    return localHostApi;
    let hostname = window.location.hostname;
    let API_BASE_URL = '';
    
    if (hostname === '127.0.0.1') {
        API_BASE_URL = localHostApi;
    } else if (hostname === 'example') {
        API_BASE_URL = hostApi;
    } else if (hostname === 'test.example.com') {
        API_BASE_URL = onlineHostApi;
    }
    
    return API_BASE_URL;
}



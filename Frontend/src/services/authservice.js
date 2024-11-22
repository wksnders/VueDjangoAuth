import { apiRequest, BASE_URL } from './useAPIData';

export async function login(username, password, csrfToken = null) {
    const url = `${BASE_URL}/api-auth/login/`; 
    return apiRequest(url, 'POST', { username, password }, csrfToken);
}

export async function logout( csrfToken = null) {
    const url = `${BASE_URL}/api-auth/logout/`; 
    return apiRequest(url, 'POST',null, csrfToken);
}

export async function getUser() {
    const url = `${BASE_URL}/api-auth/login/`; 
    return apiRequest(url, 'GET');
}
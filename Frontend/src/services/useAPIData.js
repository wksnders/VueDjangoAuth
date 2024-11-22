export const BASE_URL = 'http://localhost:8000';

/**
 * Fetch the CSRF token from the server.
 * @returns {Promise<string>} The CSRF token.
 */
export async function getCsrfToken() {
    try {
        const response = await fetch(`${BASE_URL}/api-auth/csrf/`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are included
        });
        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }
        const token = response.headers.get('X-Csrftoken');
        if (!token) {
            throw new Error('CSRF token not found in response headers');
        }
        return token;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}

//csrfToken should be set when making 'POST', 'PUT', or 'DELETE'  requests
export async function apiRequest(url, method = 'GET', body = null, csrfToken = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
        if(!csrfToken){
            console.warn("csrfToken missing for",method.toUpperCase(),"request. Did you forget to set it?");
            try {
                csrfToken = await getCsrfToken();
            } catch (error) {
                console.error('Failed to get CSRF token:', error);
                throw error;
            }
        }
        headers['X-CSRFToken'] = csrfToken;
    }

    const options = {
        method,
        headers,
        credentials: 'include',
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}
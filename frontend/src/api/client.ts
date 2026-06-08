import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export function handleApiError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
        const msg = error.response.data.message;
        throw new Error(Array.isArray(msg) ? msg[0] : msg);
    }
    throw error instanceof Error ? error : new Error('Unknown error');
}

export default api;

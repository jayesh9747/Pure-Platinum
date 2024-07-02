import axios from 'axios';
import { Platform } from "react-native";
import authStore from '../auth/authStore';
import cache from '../utility/cache';

const token = authStore.getToken();

const apiClient = axios.create({
    baseURL: 'https://pureplatinum.jewelzie.com/api',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    timeout: 3000
});

const blacklistedRoutes = [
    '/auth/customer/login',
    '/auth/customer/register',
    '/add-to-cart'
];

apiClient.interceptors.request.use(request => {
    if (token) {
        request.headers['Authorization'] = `Bearer ${token._j}`;
    }
    if (['post', 'put', 'patch'].includes(request.method)) {
        if (!request.data) {
            request.data = {};
        }
        request.data.platform = Platform.OS;
        request.data.device_id = "-";
    }
    return request;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

const originalPost = apiClient.post;
apiClient.post = async (url, params, axiosConfig) => {
    try {
        const response = await originalPost(url, params, axiosConfig);

        if (response.status === 200 && !blacklistedRoutes.includes(url)) {
            await cache.store(url, response.data);
        }

        return response;
    } catch (error) {
        console.log(error);
        const cachedData = await cache.get(url);
        if (cachedData) {
            return { status: 200, data: cachedData };
        }
        return Promise.reject(error);
    }
};

export default apiClient;

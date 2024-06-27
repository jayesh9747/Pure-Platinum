import axios from 'axios';
import { Platform } from "react-native";
import authStore from '../auth/authStore';


const token = authStore.getToken();

const apiClient = axios.create({
    baseURL: 'https://pureplatinum.jewelzie.com/api',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    timeout: 3000
});


apiClient.interceptors.request.use(request => {

    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    if (['post', 'put', 'patch'].includes(request.method)) {
        if (!request.data) {
            request.data = {};
        }
        request.data.platform = Platform.OS;
        request.data.device_id = "-"
    }
    return request;
    
}, error => {
    return Promise.reject(error);
});

export default apiClient;

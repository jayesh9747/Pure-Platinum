// import axios from 'axios';
// import { Platform } from "react-native";
// import authStore from '../auth/authStore';
// import cache from '../utility/cache';

// const token = authStore.getToken();

// const apiClient = axios.create({
//     baseURL: 'https://pureplatinum.jewelzie.com/api',
//     headers: { 'Content-Type': 'application/json; charset=utf-8' },
//     timeout: 3000
// });

// const blacklistedRoutes = [
//     '/auth/customer/login',
//     '/auth/customer/register',
//     '/add-to-cart',


//     // wish list 
//     '/get-wishlist-products',
//     "/add-to-wishlist",
//     '/delete-from-wishlist',
//     'delete-all-from-wishlist',
//     '/transfer-to-cart'

// ];

// apiClient.interceptors.request.use(request => {
//     if (token) {
//         request.headers['Authorization'] = `Bearer ${token._j}`;
//     }
//     // console.log(token);
//     if (['post', 'put', 'patch'].includes(request.method)) {
//         if (!request.data) {
//             request.data = {};
//         }
//         request.data.platform = Platform.OS;
//         request.data.device_id = "-";
//     }
//     return request;
// }, error => {
//     return Promise.reject(error);
// });

// apiClient.interceptors.response.use(response => {
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

// const originalPost = apiClient.post;
// apiClient.post = async (url, params, axiosConfig) => {
//     try {
//         const response = await originalPost(url, params, axiosConfig);

//         if (response.status === 200 && !blacklistedRoutes.includes(url)) {
//             await cache.store(url, response.data);
//         }

//         return response;
//     } catch (error) {
//         console.log(error);
//         const cachedData = await cache.get(url);
//         if (cachedData) {
//             return { status: 200, data: cachedData };
//         }
//         return Promise.reject(error);
//     }
// };

// export default apiClient;



// import axios from 'axios';
// import { Platform } from "react-native";
// import authStore from '../auth/authStore';
// import cache from '../utility/cache';

// const token = authStore.getToken();

// const apiClient = axios.create({
//     baseURL: 'https://pureplatinum.jewelzie.com/api',
//     headers: { 'Content-Type': 'application/json; charset=utf-8' },
//     timeout: 3000
// });

// const blacklistedRoutes = [
//     '/auth/customer/login',
//     '/auth/customer/register',


//     // wish list 
//     '/get-wishlist-products',
//     "/add-to-wishlist",
//     '/delete-from-wishlist',
//     'delete-all-from-wishlist',
//     '/transfer-to-cart',

//     // cart endpoints
//     '/add-to-cart',
//     '/update-cart',
//     '/delete-from-cart',
//     '/get-cart-products',
//     '/delete-all-from-cart'


// ];

// apiClient.interceptors.request.use(async request => {
//     if (token) {
//         request.headers['Authorization'] = `Bearer ${token._j}`;
//     }

//     if (['post', 'put', 'patch'].includes(request.method)) {
//         if (!request.data) {
//             request.data = {};
//         }
//         request.data.platform = Platform.OS;
//         request.data.device_id = "-";
//     }

//     // Generate a cache key using the URL and request body
//     const cacheKey = request.url + JSON.stringify(request.data || {});
//     const cachedResponse = await cache.get(cacheKey);

//     if (cachedResponse) {
//         console.log("this is called from cache")
//         request.adapter = () => {
//             return Promise.resolve({
//                 data: cachedResponse,
//                 status: 200,
//                 statusText: 'OK',
//                 headers: request.headers,
//                 config: request,
//                 request: {}
//             });
//         };
//     }

//     return request;
// }, error => {
//     return Promise.reject(error);
// });

// apiClient.interceptors.response.use(async response => {
//     const url = response.config.url;
//     const data = response.config.data ? JSON.parse(response.config.data) : null;
//     const cacheKey = url + JSON.stringify(data || {});

//     if (response.status === 200 && !blacklistedRoutes.includes(url)) {
//         await cache.store(cacheKey, response.data);
//     }

//     return response;
// }, async error => {
//     const url = error.config.url;
//     const data = error.config.data ? JSON.parse(error.config.data) : null;
//     const cacheKey = url + JSON.stringify(data || {});

//     const cachedData = await cache.get(cacheKey);
//     if (cachedData) {
//         return {
//             status: 200,
//             data: cachedData,
//             headers: error.config.headers,
//             config: error.config,
//             request: error.request
//         };
//     }

//     return Promise.reject(error);
// });

// export default apiClient;


// import axios from 'axios';
// import { Platform } from "react-native";
// import authStore from '../auth/authStore';

// const token = authStore.getToken();

// console.log(token);

// const apiClient = axios.create({
//     baseURL: 'https://pureplatinum.jewelzie.com/api',
//     headers: { 'Content-Type': 'application/json; charset=utf-8' },
//     timeout: 3000
// });

// apiClient.interceptors.request.use(request => {
//     console.log(token);
//     if (token) {
//         request.headers['Authorization'] = `Bearer ${token._j}`;
//     }

//     if (['post', 'put', 'patch'].includes(request.method)) {
//         if (!request.data) {
//             request.data = {};
//         }
//         request.data.platform = Platform.OS;
//         request.data.device_id = "-";
//     }

//     return request;
// }, error => {
//     return Promise.reject(error);
// });

// apiClient.interceptors.response.use(response => {
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

// export default apiClient;



// import axios from 'axios';
// import { Platform } from 'react-native';
// import authStore from '../auth/authStore';

// let token;

// // Function to retrieve the token if not already retrieved
// const ensureToken = async () => {
//     if (!token) {
//         token = await authStore.getToken();
//     }
// };

// const apiClient = axios.create({
//     baseURL: 'https://pureplatinum.jewelzie.com/api',
//     headers: { 'Content-Type': 'application/json; charset=utf-8' },
//     timeout: 3000
// });

// // Add request interceptor
// apiClient.interceptors.request.use(
//     async (request) => {
//         await ensureToken();
//         console.log("heelool",token)
//         if (token) {
//             request.headers['Authorization'] = `Bearer ${token}`;
//         }

//         if (['post', 'put', 'patch'].includes(request.method)) {
//             if (!request.data) {
//                 request.data = {};
//             }
//             request.data.platform = Platform.OS;
//             request.data.device_id = '-';
//         }

//         return request;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor
// apiClient.interceptors.response.use(
//     (response) => {
//         // Response processing can be added here if needed in the future
//         return response;
//     },
//     (error) => {
//         // Error handling or processing can be added here if needed in the future
//         return Promise.reject(error);
//     }
// );

// export default apiClient;


import axios from 'axios';
import { Platform } from 'react-native';
import authStore from '../auth/authStore';
import cache from '../utility/cache';


// Function to retrieve the token
const getToken = async () => {
    const token = await authStore.getToken();
    return token;
};

const apiClient = axios.create({
    baseURL: 'https://pureplatinum.jewelzie.com/api',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    timeout: 3000
});



const whitelistedRoutes = ['/get-categories', '/get-customer'];


// Add request interceptor
apiClient.interceptors.request.use(
    async (request) => {
        const token = await getToken();
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }

        if (['post', 'put', 'patch'].includes(request.method)) {
            if (!request.data) {
                request.data = {};
            }
            request.data.platform = Platform.OS;
            request.data.device_id = '-';
        }

        return request;
    },
    (error) => {

        return Promise.reject(error);
    }
);

// Add response interceptor with cache layer
// apiClient.interceptors.response.use(
//     async (response) => {
//         const url = response.config.url;
//         const data = response.config.data ? JSON.parse(response.config.data) : null;
//         const cacheKey = url + JSON.stringify(data || {});

//         if (response.status === 200 && whitelistedRoutes.includes(url)) {
//             await cache.store(cacheKey, response.data);
//         }

//         return response;
//     },
//     async (error) => {
//         const url = error.config.url;
//         const data = error.config.data ? JSON.parse(error.config.data) : null;
//         const cacheKey = url + JSON.stringify(data || {});

//         const cachedData = await cache.get(cacheKey);
//         if (cachedData) {
//             return {
//                 status: 200,
//                 data: cachedData,
//                 headers: error.config.headers,
//                 config: error.config,
//                 request: error.request
//             };
//         }

//         return Promise.reject(error);
//     }
// );

export default apiClient;

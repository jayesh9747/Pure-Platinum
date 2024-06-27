import apiClient from "./apiclient";

const endpoint = '/get-categories';

// GET Category 
const getCategories = () => apiClient.post(endpoint);


export default {
    getCategories,
}

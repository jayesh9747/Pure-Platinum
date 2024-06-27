import apiClient from "./apiclient";

const endpoint = '/get-category-products';

// GET Category 
const getCategoryProducts = (values) => apiClient.post(endpoint,{
    category_code: "EV",
    items: "12",
    page: 1,
});

export default {
    getCategoryProducts,
}

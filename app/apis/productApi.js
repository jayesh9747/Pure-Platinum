import apiClient from "./apiclient";


// @GET Category 
const getCategoryProducts = (values) => apiClient.post('/get-category-products', {
    category_code: "EV",
    items: "12",
    page: 1,
});


// @GET SpotLight Products 
const getSpotlightProducts = () => apiClient.post('/get-spotlights', {});


// @GET specific ProductItem
const getSpecificProductItem = (product_id) => apiClient.post('/get-product-details', { product_id });


export default {
    getCategoryProducts,
    getSpotlightProducts,
    getSpecificProductItem
}

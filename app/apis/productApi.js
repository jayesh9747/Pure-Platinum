import apiClient from "./apiclient";


// @GET Category 
const getCategoryProducts = ({ category_code, page, ...filteredOptions }) => apiClient.post('/get-category-products', {
    category_code: category_code,
    items: "10",
    page: page,
    ...filteredOptions
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

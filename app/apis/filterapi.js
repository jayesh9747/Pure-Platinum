import apiClient from "./apiclient";


const filterProducts = (category_code) => apiClient.post("/get-default-filters", { category_code });


export default {
    filterProducts,
}
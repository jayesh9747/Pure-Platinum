import apiClient from "./apiclient";


const AddToWishList = ({ product_id, size_id, metal_id, diamond_id }) => apiClient.post("/add-to-wishlist", {
    product_id,
    size_id,
    metal_id,
    diamond_id,
});

const DeleteProductFromWishList = (wishlist_id) => { '/delete-from-wishlist', { wishlist_id } };

const GetWishListProducts = () => apiClient.post('/get-wishlist-products', {});

const DeleteAllItemFromWishList = () => apiClient.post('delete-all-from-wishlist', {});


export default {
    AddToWishList,
    DeleteProductFromWishList,
    GetWishListProducts,
    DeleteAllItemFromWishList
}
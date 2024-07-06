import apiClient from "./apiclient";


const AddToWishList = ({ product_id, size_id, metal_id, diamond_id }) => apiClient.post("/add-to-wishlist", {
    product_id,
    size_id,
    metal_id,
    diamond_id,
});

const GetWishListProducts = () => apiClient.post('/get-wishlist-products', {});

const DeleteProductFromWishList = (wishlist_id) => apiClient.post('/delete-from-wishlist', { wishlist_id });


const DeleteAllItemFromWishList = () => apiClient.post('delete-all-from-wishlist', {});


const TransferProductToCart = (wishlist_id) => apiClient.post('/transfer-to-cart', { wishlist_id });


export default {
    AddToWishList,
    DeleteProductFromWishList,
    GetWishListProducts,
    DeleteAllItemFromWishList,
    TransferProductToCart
}
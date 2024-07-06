// import apiClient from "./apiclient";

// const AddToCart = ({ product_id, size_id, metal_id, diamond_id, color, quantity, remark }) => apiClient.post("/add-to-cart", {
//     product_id,
//     size_id,
//     metal_id,
//     diamond_id,
//     color,
//     quantity,
//     remark
// });

// const DeleteProductFromCart = (cart_id) => { '/delete-from-cart', { cart_id } };

// const UpdateProductCart = ({ product_id, size_id, metal_id, diamond_id, color, quantity, remark, cart_id }) => apiClient.post("/update-cart", {
//     product_id,
//     size_id,
//     metal_id,
//     diamond_id,
//     color,
//     quantity,
//     remark,
//     cart_id
// });

// const GetCartProducts = () => apiClient.post('/get-cart-products', {});

// const DeleteAllItemFromCart = () => apiClient.post('/delete-all-from-cart', {});



// export default {
//     AddToCart,
//     DeleteProductFromCart,
//     UpdateProductCart,
//     GetCartProducts,
//     DeleteAllItemFromCart
// }


import apiClient from './apiclient';

const AddToCart = ({ product_id, size_id, metal_id, diamond_id, color, quantity, remark }) => 
    apiClient.post("/add-to-cart", {
        product_id,
        size_id,
        metal_id,
        diamond_id,
        color,
        quantity,
        remark
    });

const DeleteProductFromCart = (cart_id) => 
    apiClient.post('/delete-from-cart', { cart_id });

const UpdateProductCart = ({ product_id, size_id, metal_id, diamond_id, color, quantity, remark, cart_id }) => 
    apiClient.post("/update-cart", {
        product_id,
        size_id,
        metal_id,
        diamond_id,
        color,
        quantity,
        remark,
        cart_id
    });

const GetCartProducts = () => 
    apiClient.post('/get-cart-products', {});

const DeleteAllItemFromCart = () => 
    apiClient.post('/delete-all-from-cart', {});

export default {
    AddToCart,
    DeleteProductFromCart,
    UpdateProductCart,
    GetCartProducts,
    DeleteAllItemFromCart
};

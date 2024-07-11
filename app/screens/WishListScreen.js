import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import color from '../config/color';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import wishListApi from '../apis/wishListApi';
import useWishListStore from '../hooks/useWishListStore';
import ProductItem from '../components/ProductItem';

import { showToast } from '../components/ToastMessage';

const WishList = () => {
    const products = useWishListStore(state => state.products);
    const removeProduct = useWishListStore(state => state.removeProduct);
    const clearWishList = useWishListStore(state => state.clearWishList);
    const setProducts = useWishListStore(state => state.setProducts);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleWishListProducts = async () => {
        setLoading(true);
        try {
            const result = await wishListApi.GetWishListProducts();
            setProducts(result.data.data.products);
            console.log("Fetched wishlist products", result.data.data.products);
        } catch (error) {
            console.log("Failed to fetch product from server", error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const removeAllProductFromWishList = async () => {
        const originalProducts = [...products];
        clearWishList();

        try {
            const result = await wishListApi.DeleteAllItemFromWishList();
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log("Failed to delete products from API", error);
            showToast("error", `${error.response.data.message}`);
            setProducts(originalProducts);
        }
    };


    useEffect(() => {
        handleWishListProducts();
    }, []);

    const handleRemoveProduct = async (wishlist_id) => {
        const originalProducts = [...products];
        removeProduct(wishlist_id);

        try {
            const result = await wishListApi.DeleteProductFromWishList(wishlist_id);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log("Failed to delete product from API", error);
            showToast("error", `${error.response.data.message}`);
            setProducts(originalProducts); // Restore original products if API call fails
        }
    };

    const handleMoveToCart = async (wishlist_id) => {
        const originalProducts = [...products];
        removeProduct(wishlist_id);

        try {
            const result = await wishListApi.TransferProductToCart(wishlist_id);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log("Failed to transfer product to cart", error);
            showToast("success", `${error.response.data.message}`);
            setProducts(originalProducts); // Restore original products if API call fails
            Alert.alert("Error", "Failed to transfer product to cart. Please try again.");
        }
    };

    const displayedProducts = products;

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : displayedProducts.length === 0 ? (
                <Text style={styles.emptyCartText}>Your wishlist is empty</Text>
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>ITEMS ({displayedProducts.length})</Text>
                        <TouchableOpacity onPress={removeAllProductFromWishList} style={styles.clearCartContainer}>
                            <MaterialCommunityIcons name="delete" size={25} color={color.medium} />
                            <Text style={styles.headerText}>DELETE ALL</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={displayedProducts}
                        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                        refreshing={refreshing}
                        onRefresh={handleWishListProducts}
                        renderItem={({ item }) => (

                            <ProductItem
                                item={item}
                                navigation={navigation}
                                handleFirstButtonPress={handleRemoveProduct}
                                handleSecondButtonPress={handleMoveToCart}
                                firstButtonText="Remove"
                                secondButtonText="Add to Cart"
                            />

                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    clearCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.medium,
    },
    productContainer: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productCategory: {
        fontSize: 14,
        color: '#777',
    },
    productType: {
        fontSize: 14,
        color: '#777',
    },
    removeButton: {
        flex: 1,
        padding: 5,
        backgroundColor: color.secondary,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    wishlistButton: {
        flex: 1,
        backgroundColor: color.secondary,
        padding: 15,
        alignItems: 'center',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: color.primary,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default WishList;

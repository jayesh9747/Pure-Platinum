
import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Button } from 'react-native';
import useWishListStore from '../hooks/useWishListStore';
import color from '../config/color';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CartScreen = () => {
    const products = useWishListStore(state => state.products);
    const removeProduct = useWishListStore(state => state.removeProduct);
    const { clearWishList } = useWishListStore();
    const navigation = useNavigation();

    const handleRemoveProduct = (productId) => {
        removeProduct(productId);
    };

    

    return (
        <View style={styles.container}>
            {products.length === 0 ? (
                <Text style={styles.emptyCartText}>Your WishList is empty</Text>
            )


                :

                (
                    <>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>ITEMS({products.length})</Text>
                            <TouchableOpacity onPress={clearWishList} style={styles.clearCartContainer}>
                                <>
                                    <MaterialCommunityIcons name={"delete"} size={25} color={color.medium} />
                                    <Text style={styles.headerText}>DELETE ALL</Text>
                                </>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={products}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (

                                <>
                                    <ProductCard product={item} navigation={navigation} />
                                    <View style={styles.productContainer}>
                                        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                                        <View style={styles.productDetails}>
                                            <Text style={styles.productTitle}>{item.title}</Text>
                                            <TouchableOpacity onPress={() => handleRemoveProduct(item.id)} style={styles.removeButton}>
                                                <Text style={styles.removeButtonText}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )}
                        />
                    </>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    clearCartContainer: {
        flexDirection: "row"
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777'
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
        color: color.medium
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
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
    removeButton: {
        marginTop: 5,
        padding: 5,
        backgroundColor: '#ff0000',
        borderRadius: 3,
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
});

export default CartScreen;

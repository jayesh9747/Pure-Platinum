import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import color from '../config/color';
import AppSlider from '../components/AppSlider';
import AppRadioButton from '../components/AppRadioButton';
import Screen from '../components/Screen';
import _ from 'lodash';
import productApi from '../apis/productApi';
import AppTable from '../components/AppTable';
import useCartStore from '../hooks/useCartStore';
import useWishListStore from '../hooks/useWishListStore';
import cartApi from '../apis/cartApi';
import wishListApi from '../apis/wishListApi';

const ProductViewScreen = ({ route }) => {
    const { productId } = route?.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [metalOptions, setMetalOptions] = useState([]);
    const [diamondQualityOptions, setDiamondQualityOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({ metal: '', diamondQuality: '', size: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);


    const addProductToCart = useCartStore(state => state.addProduct);
    const removeProductFromCart = useCartStore(state => state.removeProduct);
    const addProductToWishList = useWishListStore(state => state.addProduct);
    const removeProductFromWishList = useWishListStore(state => state.removeProduct);


    const loadProduct = async () => {
        try {
            const result = await productApi.getSpecificProductItem(productId);
            const productData = result.data?.data;
            setProduct(productData);

            if (productData) {
                const metalOptions = _.uniq(productData.product_fields.map(item => item.metal.name));
                const diamondQualityOptions = _.uniq(_.flatMap(productData.product_fields, item => item.diamonds.map(diamond => diamond.name)));
                const sizeOptions = _.uniq(_.flatMap(productData.product_fields, item => item.sizes.map(size => size.value)));

                setMetalOptions(metalOptions);
                setDiamondQualityOptions(diamondQualityOptions);
                setSizeOptions(sizeOptions);

                // Set default selected options
                setSelectedOptions({
                    metal: metalOptions[0] || '',
                    diamondQuality: diamondQualityOptions[0] || '',
                    size: sizeOptions[0] || ''
                });
            }

            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    };


    const handleAddToCart = async () => {
        const { size } = selectedOptions;
        const diamond_id = selectedProduct?.diamonds[0]?.id;
        const metal_id = selectedProduct?.metal?.id;
        const size_id = _.find(selectedProduct.size, { "value": size });
        const quantity = 1;
        try {
            const result = await cartApi.AddToCart({ product_id: productId, diamond_id, metal_id, size_id, quantity });
            console.log(result.data)
            addProductToCart({ productId, selectedProduct, selectedOptions });
        } catch (error) {
            console.log(error.response.data);
            removeProductFromCart(productId);
        }
    };

    const handleAddToWishList = async () => {
        const { size } = selectedOptions;
        const diamond_id = selectedProduct?.diamonds[0]?.id;
        const metal_id = selectedProduct?.metal?.id;
        const size_id = _.find(selectedProduct.size, { "value": size });
        try {
            const result = await wishListApi.AddToWishList({ product_id: productId, diamond_id, metal_id, size_id });
            console.log(result.data.message);
            addProductToWishList({ productId, product });
        } catch (error) {
            console.log(error.response.data);
            removeProductFromWishList(productId);
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    useEffect(() => {
        if (selectedOptions.metal && selectedOptions.diamondQuality && selectedOptions.size) {
            const selectedProduct = product?.product_fields.find(
                (item) =>
                    item.metal.name === selectedOptions.metal &&
                    item.diamonds.some(diamond => diamond.name === selectedOptions.diamondQuality) &&
                    item.sizes.some(size => size.value === selectedOptions.size)
            );
            setSelectedProduct(selectedProduct);
        } else {
            setSelectedProduct(null);
        }
    }, [selectedOptions, product]);

    const handleSelectionChange = (updatedOptions) => {
        setSelectedOptions(prevOptions => ({
            metal: updatedOptions.metal || metalOptions[0] || prevOptions.metal,
            diamondQuality: updatedOptions.diamondQuality || diamondQualityOptions[0] || prevOptions.diamondQuality,
            size: updatedOptions.size || sizeOptions[0] || prevOptions.size,
        }));
    };

    const getFilteredProductDetails = (product) => {
        if (!product) return [];

        const details = {
            "diamond_wt": product.diamond_wt,
            "gold_wt": product.gold_wt,
            "platinum_wt": product.platinum_wt,
            "stone_wt": product.stone_wt,
            "stone_pieces": product.stone_pieces,
            "gross_wt": product.gross_wt,
            "certificate_charges": product.certificate_charges,
            "in_stock": product.in_stock,
        };

        const filteredObject = Object.entries(details)
            .filter(([key, value]) => value !== null && value !== undefined)
            .reduce((acc, [key, value]) => {
                acc[key] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;
                return acc;
            }, {});

        return [filteredObject];
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.error}>
                <Text>Error loading products.</Text>
            </View>
        );
    }

    return (
        <Screen>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <AppSlider images={product?.images} />

                    <View style={styles.productCodeContainer}>
                        <Text style={styles.productCode}>Code: {product?.code}</Text>
                    </View>

                    <AppRadioButton
                        sizeOptions={sizeOptions}
                        diamondQualityOptions={diamondQualityOptions}
                        metalOptions={metalOptions}
                        selectedOptions={selectedOptions}
                        onSelectionChange={handleSelectionChange}
                    />

                    <AppTable
                        title="ProductType"
                        data={[
                            {
                                'Gender': product.gender === 'M' ? "Male" : "Female",
                                "Jewelry Type": product.jewellery_type.name
                            }
                        ]}
                    />

                    {selectedProduct ? (
                        <>
                            <AppTable title={"Product Details"} data={getFilteredProductDetails(selectedProduct)} />
                            <AppTable title={"Diamonds Details"} data={selectedProduct?.diamonds} />
                        </>
                    ) : (
                        <Text style={styles.errorText}>This combination is not available.</Text>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishList}>
                        <Text style={styles.buttonText}>WISHLIST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.buttonText}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    productCodeContainer: {
        margin: 10,
        backgroundColor: color.light,
    },
    productCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.medium,
        margin: 10,
        textAlign: "center",
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
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
    }
});

export default ProductViewScreen;

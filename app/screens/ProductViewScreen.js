// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
// import color from '../config/color';
// import AppSlider from '../components/AppSlider';
// import AppRadioButton from '../components/AppRadioButton';
// import Screen from '../components/Screen';
// import _ from 'lodash';
// import productApi from '../apis/productApi';
// import AppTable from '../components/AppTable';
// import useCartStore from '../hooks/useCartStore';
// import useWishListStore from '../hooks/useWishListStore';
// import cartApi from '../apis/cartApi';
// import wishListApi from '../apis/wishListApi';

// const ProductViewScreen = ({ route }) => {
//     const { productId } = route?.params;
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isInCart, setIsInCart] = useState(false);
//     const [isInWishList, setIsInWishList] = useState(false);
//     const [error, setError] = useState(false);
//     const [metalOptions, setMetalOptions] = useState([]);
//     const [diamondQualityOptions, setDiamondQualityOptions] = useState([]);
//     const [sizeOptions, setSizeOptions] = useState([]);
//     const [selectedOptions, setSelectedOptions] = useState({ metal: '', diamondQuality: '', size: '' });
//     const [selectedProduct, setSelectedProduct] = useState(null);


//     const addProductToCart = useCartStore(state => state.addProduct);
//     const removeProductFromCart = useCartStore(state => state.removeProduct);
//     const addProductToWishList = useWishListStore(state => state.addProduct);
//     const removeProductFromWishList = useWishListStore(state => state.removeProduct);
//     const cartProducts = useCartStore(state => state.products);




//     const loadProduct = async () => {
//         try {
//             setLoading(true);
//             const result = await productApi.getSpecificProductItem(productId);
//             const productData = result.data?.data;
//             setProduct(productData);

//             if (productData) {
//                 const metalOptions = _.uniq(productData.product_fields.map(item => item.metal.name));
//                 const diamondQualityOptions = _.uniq(_.flatMap(productData.product_fields, item => item.diamonds.map(diamond => diamond.name)));
//                 const sizeOptions = _.uniq(_.flatMap(productData.product_fields, item => item.sizes.map(size => size.value)));

//                 setMetalOptions(metalOptions);
//                 setDiamondQualityOptions(diamondQualityOptions);
//                 setSizeOptions(sizeOptions);

//                 // Set default selected options
//                 setSelectedOptions({
//                     metal: metalOptions[0] || '',
//                     diamondQuality: diamondQualityOptions[0] || '',
//                     size: sizeOptions[0] || ''
//                 });
//             }

//             setLoading(false);
//             setError(false);
//         } catch (error) {
//             setError(true);
//             setLoading(false);
//             console.log(error);
//         }
//     };


//     const handleAddToCart = async () => {
//         const { size } = selectedOptions;
//         const diamond_id = selectedProduct?.diamonds[0]?.id;
//         const metal_id = selectedProduct?.metal?.id;
//         const size_id = _.find(selectedProduct.sizes, { "value": size }).id;
//         const quantity = 1;
//         console.log("selected options", selectedOptions);
//         console.log("selected product  ", selectedProduct);
//         try {
//             const result = await cartApi.AddToCart({ product_id: productId, diamond_id, metal_id, size_id, quantity });
//             console.log("when i add product in cart ", result.data)
//             addProductToCart({ product, ...selectedOptions });
//             setIsInCart(true);
//         } catch (error) {
//             console.log(error.response.data);
//             setIsInCart(false);
//             removeProductFromCart(productId);
//         }
//     };

//     const handleAddToWishList = async () => {
//         const { size } = selectedOptions;
//         const diamond_id = selectedProduct?.diamonds[0]?.id;
//         const metal_id = selectedProduct?.metal?.id;
//         const size_id = _.find(selectedProduct.size, { "value": size });
//         try {
//             const result = await wishListApi.AddToWishList({ product_id: productId, diamond_id, metal_id, size_id });
//             console.log(result.data.message);
//             addProductToWishList({ productId, product });
//         } catch (error) {
//             console.log(error.response.data);
//             removeProductFromWishList(productId);
//         }
//     };

//     // pls correct this 
//     const handleRemoveProduct = async (cart_id) => {

//         try {
//             await cartApi.DeleteProductFromCart(cart_id);
//             removeProductFromCart(productId);
//         } catch (error) {
//             console.log("Failed to delete product from cart", error);
//             removeProductFromCart()
//             Alert.alert("Error", "Failed to remove product. Please try again.");
//         }
//     };

//     useEffect(() => {
//         loadProduct();
//     }, [productId]);

//     useEffect(() => {
//         const filteredOptions = _.pickBy(selectedOptions, option => !_.isEmpty(option));

//         if (!_.isEmpty(filteredOptions)) {
//             const selectedProduct = product?.product_fields.find((item) => {
//                 const matchesMetal = filteredOptions.metal ? item.metal.name === filteredOptions.metal : true;
//                 const matchesDiamondQuality = filteredOptions.diamondQuality
//                     ? item.diamonds.some(diamond => diamond.name === filteredOptions.diamondQuality)
//                     : true;
//                 const matchesSize = filteredOptions.size
//                     ? item.sizes.some(size => size.value === filteredOptions.size)
//                     : true;

//                 return matchesMetal && matchesDiamondQuality && matchesSize;
//             });

//             setSelectedProduct(selectedProduct);
//         } else {
//             setSelectedProduct(null);
//         }
//     }, [selectedOptions, product]);


//     useEffect(() => {
//         const productInCart = cartProducts.some(cartItem => cartItem.productId === productId);
//         setIsInCart(productInCart);
//     }, [cartProducts, productId]);

//     const handleSelectionChange = (updatedOptions) => {
//         setSelectedOptions(prevOptions => ({
//             metal: updatedOptions.metal || metalOptions[0] || prevOptions.metal,
//             diamondQuality: updatedOptions.diamondQuality || diamondQualityOptions[0] || prevOptions.diamondQuality,
//             size: updatedOptions.size || sizeOptions[0] || prevOptions.size,
//         }));
//     };

//     const getFilteredProductDetails = (product) => {
//         if (!product) return [];

//         const details = {
//             "diamond_wt": product.diamond_wt,
//             "gold_wt": product.gold_wt,
//             "platinum_wt": product.platinum_wt,
//             "stone_wt": product.stone_wt,
//             "stone_pieces": product.stone_pieces,
//             "gross_wt": product.gross_wt,
//             "certificate_charges": product.certificate_charges,
//             "in_stock": product.in_stock,
//         };

//         const filteredObject = Object.entries(details)
//             .filter(([key, value]) => value !== null && value !== undefined)
//             .reduce((acc, [key, value]) => {
//                 acc[key] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;
//                 return acc;
//             }, {});

//         return [filteredObject];
//     };

//     if (loading) {
//         return (
//             <View style={styles.loader}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.error}>
//                 <Text>Error loading products.</Text>
//             </View>
//         );
//     }

//     return (
//         <Screen>
//             <View style={styles.container}>
//                 <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                     <AppSlider images={product?.images} />

//                     <View style={styles.productCodeContainer}>
//                         <Text style={styles.productCode}>Code: {product?.code}</Text>
//                     </View>

//                     <AppRadioButton
//                         sizeOptions={sizeOptions}
//                         diamondQualityOptions={diamondQualityOptions}
//                         metalOptions={metalOptions}
//                         selectedOptions={selectedOptions}
//                         onSelectionChange={handleSelectionChange}
//                     />

//                     <AppTable
//                         title="ProductType"
//                         data={[
//                             {
//                                 'Gender': product.gender === 'M' ? "Male" : "Female",
//                                 "Jewelry Type": product.jewellery_type.name
//                             }
//                         ]}
//                     />

//                     {selectedProduct ? (
//                         <>
//                             {getFilteredProductDetails(selectedProduct).length > 0 && (
//                                 <AppTable title={"Product Details"} data={getFilteredProductDetails(selectedProduct)} />
//                             )}
//                             {selectedProduct?.diamonds && selectedProduct.diamonds.length > 0 && (
//                                 <AppTable title={"Diamonds Details"} data={selectedProduct.diamonds} />
//                             )}
//                         </>
//                     ) : (
//                         <Text style={styles.errorText}>This combination is not available.</Text>
//                     )}
//                 </ScrollView>

//                 <View style={styles.footer}>
//                     {isInCart ? (
//                         <>
//                             <TouchableWithoutFeedback onPress={handleRemoveProduct}>
//                                 <View style={styles.Button}>
//                                     <Text style={styles.buttonText}>Remove </Text>
//                                 </View>
//                             </TouchableWithoutFeedback>
//                             <TouchableWithoutFeedback onPress={() => console.log("place order")}>
//                                 <View style={styles.placeorderButton}>
//                                     <Text style={styles.buttonText}>PLACE ORDER</Text>
//                                 </View>
//                             </TouchableWithoutFeedback>
//                         </>
//                     ) : (
//                         <>
//                             <TouchableWithoutFeedback onPress={handleAddToWishList}>
//                                 <View style={styles.Button}>
//                                     <Text style={styles.buttonText}>WISHLIST</Text>
//                                 </View>
//                             </TouchableWithoutFeedback>
//                             <TouchableWithoutFeedback onPress={handleAddToCart}>
//                                 <View style={styles.placeorderButton}>
//                                     <Text style={styles.buttonText}>ADD TO CART</Text>
//                                 </View>
//                             </TouchableWithoutFeedback>
//                         </>
//                     )}
//                 </View>
//             </View>
//         </Screen>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     loader: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     scrollViewContent: {
//         paddingBottom: 60,
//     },
//     productCodeContainer: {
//         margin: 10,
//         backgroundColor: color.light,
//     },
//     productCode: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: color.medium,
//         margin: 10,
//         textAlign: "center",
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         borderTopWidth: 1,
//         borderColor: '#ccc',
//     },
//     wishlistButton: {
//         flex: 1,
//         backgroundColor: color.secondary,
//         padding: 15,
//         alignItems: 'center',
//     },
//     addToCartButton: {
//         flex: 1,
//         backgroundColor: color.primary,
//         padding: 15,
//         alignItems: 'center',
//     },
//     Button: {
//         flex: 1,
//         backgroundColor: color.primary,
//         padding: 15,
//         margin: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     error: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     errorText: {
//         color: 'red',
//         textAlign: 'center',
//         marginVertical: 10,
//         fontSize: 16,
//     },
//     removeProduct: {
//         alignContent: "center",
//         alignSelf: "center",
//         paddingHorizontal: 10
//     },
//     placeorderButton: {
//         flex: 4 / 3,
//         backgroundColor: color.secondary,
//         padding: 15,
//         margin: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//     }
// });


// export default ProductViewScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
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
import { showToast } from '../components/ToastMessage';

const ProductViewScreen = ({ route }) => {
    const { productId } = route?.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishList, setIsInWishList] = useState(false);
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
    const cartProducts = useCartStore(state => state.products);

    const loadProduct = async () => {
        try {
            setLoading(true);
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
        const size_id = _.find(selectedProduct.sizes, { "value": size }).id;
        const quantity = 1;
        console.log("selected options", selectedOptions);
        console.log("selected product  ", selectedProduct);
        try {
            const result = await cartApi.AddToCart({ product_id: productId, diamond_id, metal_id, size_id, quantity });
            showToast("success", `${result.data.message}`);
            addProductToCart({ product, ...selectedOptions });
            setIsInCart(true);
        } catch (error) {
            console.log(error.response.data);
            showToast("fail", `${error.response.data}`);
            setIsInCart(false);
            removeProductFromCart(productId);
        }
    };

    const handleAddToWishList = async () => {
        const { size } = selectedOptions;
        const diamond_id = selectedProduct?.diamonds[0]?.id;
        const metal_id = selectedProduct?.metal?.id;
        const size_id = _.find(selectedProduct.sizes, { "value": size }).id;
        try {
            const result = await wishListApi.AddToWishList({ product_id: productId, diamond_id, metal_id, size_id });
            showToast("success", `${result.data.message}`);
            addProductToWishList({ productId, product });
        } catch (error) {
            showToast("fail", `${error.response.data}`);
            removeProductFromWishList(productId);
        }
    };

    const handleRemoveProduct = async (cart_id) => {
        try {
            const result = await cartApi.DeleteProductFromCart(cart_id);
            removeProductFromCart(productId);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log("Failed to delete product from cart", error);
            removeProductFromCart(productId);
            showToast("fail", "Failed to remove product. Please try again.");
        }
    };

    useEffect(() => {
        loadProduct();
    }, [productId]);

    useEffect(() => {
        const filteredOptions = _.pickBy(selectedOptions, option => !_.isEmpty(option));

        if (!_.isEmpty(filteredOptions)) {
            const selectedProduct = product?.product_fields.find((item) => {
                const matchesMetal = filteredOptions.metal ? item.metal.name === filteredOptions.metal : true;
                const matchesDiamondQuality = filteredOptions.diamondQuality
                    ? item.diamonds.some(diamond => diamond.name === filteredOptions.diamondQuality)
                    : true;
                const matchesSize = filteredOptions.size
                    ? item.sizes.some(size => size.value === filteredOptions.size)
                    : true;

                return matchesMetal && matchesDiamondQuality && matchesSize;
            });

            setSelectedProduct(selectedProduct);
        } else {
            setSelectedProduct(null);
        }
    }, [selectedOptions, product]);

    useEffect(() => {
        const productInCart = cartProducts.some(cartItem => cartItem.productId === productId);
        setIsInCart(productInCart);
    }, [cartProducts, productId]);

    const handleSelectionChange = (updatedOptions) => {
        setSelectedOptions(prevOptions => ({
            metal: updatedOptions.metal || prevOptions.metal,
            diamondQuality: updatedOptions.diamondQuality || prevOptions.diamondQuality,
            size: updatedOptions.size || prevOptions.size,
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
                            {getFilteredProductDetails(selectedProduct).length > 0 && (
                                <AppTable title={"Product Details"} data={getFilteredProductDetails(selectedProduct)} />
                            )}
                            {selectedProduct?.diamonds && selectedProduct.diamonds.length > 0 && (
                                <AppTable title={"Diamonds Details"} data={selectedProduct.diamonds} />
                            )}
                        </>
                    ) : (
                        <Text style={styles.errorText}>This combination is not available.</Text>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    {isInCart ? (
                        <>
                            <TouchableWithoutFeedback onPress={() => handleRemoveProduct(productId)}>
                                <View style={styles.Button}>
                                    <Text style={styles.buttonText}>Remove</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => console.log("place order")}>
                                <View style={styles.placeorderButton}>
                                    <Text style={styles.buttonText}>PLACE ORDER</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    ) : (
                        <>
                            <TouchableWithoutFeedback onPress={handleAddToWishList}>
                                <View style={styles.Button}>
                                    <Text style={styles.buttonText}>WISHLIST</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={handleAddToCart}>
                                <View style={styles.placeorderButton}>
                                    <Text style={styles.buttonText}>ADD TO CART</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    )}
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
    Button: {
        flex: 1,
        backgroundColor: color.primary,
        padding: 15,
        margin: 5,
        borderRadius: 5,
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
    },
    removeProduct: {
        alignContent: "center",
        alignSelf: "center",
        paddingHorizontal: 10
    },
    placeorderButton: {
        flex: 4 / 3,
        backgroundColor: color.secondary,
        padding: 15,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    }
});

export default ProductViewScreen;

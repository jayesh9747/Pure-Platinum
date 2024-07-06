// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
// import CategoryCard from '../components/CategoryCard';
// import CollectionCard from '../components/CollectionCard';
// import categoriesApi from '../apis/category';
// import productApi from '../apis/productApi';
// import routes from '../navigations/routes';
// import AppText from '../components/AppText';
// import { ActivityIndicator } from 'react-native-paper';

// const HomeScreen = ({ navigation }) => {
//     const [categories, setCategories] = useState([]);
//     const [spotlightProducts, setSpotlightProducts] = useState([]);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const ImageUri = 'http://pureplatinum.jewelzie.com/public/storage/common/default.png';

//     const loadData = async () => {
//         setLoading(true);
//         setError(false);

//         try {
//             const [categoriesResponse, spotlightProductsResponse] = await Promise.all([
//                 categoriesApi.getCategories(),
//                 productApi.getSpotlightProducts()
//             ]);

//             setCategories(categoriesResponse.data?.data || []);
//             setSpotlightProducts(spotlightProductsResponse.data?.data || []);
//         } catch (error) {
//             setError(true);
//             console.log(error.response.data);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const renderContent = (data, errorText, renderItem) => {
//         if (loading) {
//             return (
//                 <View style={styles.centeredView}>
//                     <ActivityIndicator style={styles.centeredText} animating={loading} />
//                 </View>
//             );
//         }

//         if (error) {
//             return (
//                 <View style={styles.centeredView}>
//                     <AppText style={styles.centeredText}>{errorText}</AppText>
//                 </View>
//             );
//         }

//         return data.map(renderItem);
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <Image source={require('../assets/home-logo.jpg')} style={styles.headerImage} />
//             </View>

//             <Text style={styles.headerText}>SHOP BY CATEGORY</Text>
//             <View style={styles.categoriesScrollView}>
//                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//                     {renderContent(
//                         categories,
//                         'Error loading categories.',
//                         category => (
//                             <CategoryCard
//                                 key={category.id}
//                                 title={category.category_code}
//                                 imageSource={{uri: ImageUri}}
//                                 onPress={() => {
//                                     navigation.navigate(routes.PRODUCT_LIST, { categoryCode: "pscb" });
//                                 }}
//                             />
//                         )
//                     )}
//                 </ScrollView>
//             </View>

//             <View style={styles.priceContainer}>
//                 <Text style={styles.priceText}>Current Platinum 950: ₹ 2911/- per gm</Text>
//             </View>

//             <Text style={styles.headerText}>Medley Collections</Text>
//             <View style={styles.productCardContainer}>
//                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//                     {renderContent(
//                         spotlightProducts,
//                         'Error loading Medley Collections.',
//                         product => (
//                             <CollectionCard
//                                 key={product.id}
//                                 imageUrl={product.imageUrl}
//                                 discount={product.discount}
//                                 productName={product.name}
//                                 onPress={() => { navigation.navigate(routes.PRODUCT_LIST, { data: product.products }); }}
//                             />
//                         )
//                     )}
//                 </ScrollView>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
//     categoriesScrollView: {
//         height: 180,
//         paddingTop: 5,
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     productCardContainer: {
//         paddingTop: 5,
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 250,
//         marginBottom: 8
//     },
//     centeredView: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     centeredText: {
//         textAlign: 'center',
//     },
//     header: {
//         padding: 10,
//         alignItems: 'center',
//     },
//     headerImage: {
//         width: '100%',
//         height: 160,
//         borderRadius: 10,
//         resizeMode: 'cover',
//     },
//     headerText: {
//         fontSize: 20,
//         marginTop: 10,
//         paddingLeft: 10,
//         fontWeight: 'bold',
//     },
//     priceContainer: {
//         backgroundColor: '#ff6f61',
//         padding: 15,
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     priceText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     productCardTitle: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         marginBottom: 10,
//     },
//     viewAllText: {
//         color: '#007BFF',
//         fontWeight: 'bold',
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import CollectionCard from '../components/CollectionCard';
import categoriesApi from '../apis/category';
import productApi from '../apis/productApi';
import routes from '../navigations/routes';
import AppText from '../components/AppText';
import { ActivityIndicator } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [spotlightProducts, setSpotlightProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const ImageUri = 'http://pureplatinum.jewelzie.com/public/storage/common/default.png';

    const loadData = async () => {
        setLoading(true);
        setError(false);

        try {
            const [categoriesResponse, spotlightProductsResponse] = await Promise.all([
                categoriesApi.getCategories(),
                productApi.getSpotlightProducts()
            ]);

            setCategories(categoriesResponse.data?.data || []);
            setSpotlightProducts(spotlightProductsResponse.data?.data || []);
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await loadData();
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData().catch(error => console.log(error));
    }, []);

    const renderContent = (data, errorText, renderItem) => {
        if (loading) {
            return (
                <View style={styles.centeredView}>
                    <ActivityIndicator style={styles.centeredText} animating={loading} />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centeredView}>
                    <AppText style={styles.centeredText}>{errorText}</AppText>
                </View>
            );
        }

        return data.map(renderItem);
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.header}>
                <Image source={require('../assets/home-logo.jpg')} style={styles.headerImage} />
            </View>

            <Text style={styles.headerText}>SHOP BY CATEGORY</Text>
            <View style={styles.categoriesScrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {renderContent(
                        categories,
                        'Error loading categories.',
                        category => (
                            <CategoryCard
                                key={category.id}
                                title={category.category_code}
                                imageSource={{ uri: ImageUri }}
                                onPress={() => {
                                    navigation.navigate(routes.PRODUCT_LIST, { categoryCode: category.category_code });
                                }}
                            />
                        )
                    )}
                </ScrollView>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Current Platinum 950: ₹ 2911/- per gm</Text>
            </View>

            <Text style={styles.headerText}>Medley Collections</Text>
            <View style={styles.productCardContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {renderContent(
                        spotlightProducts,
                        'Error loading Medley Collections.',
                        product => (
                            <CollectionCard
                                key={product.id}
                                imageUrl={product.imageUrl}
                                discount={product.discount}
                                productName={product.name}
                                onPress={() => { navigation.navigate(routes.PRODUCT_LIST, { data: product.products }); }}
                            />
                        )
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    categoriesScrollView: {
        height: 180,
        paddingTop: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productCardContainer: {
        paddingTop: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        marginBottom: 8
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    headerImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    headerText: {
        fontSize: 20,
        marginTop: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    priceContainer: {
        backgroundColor: '#ff6f61',
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    priceText: {
        color: '#fff',
        fontSize: 16,
    },
    productCardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    viewAllText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;

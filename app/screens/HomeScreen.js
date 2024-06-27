import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import CollectionCard from '../components/CollectionCard';
import categoriesApi from '../apis/category';
import routes from '../navigations/routes';
import AppText from '../components/AppText';

import { ActivityIndicator } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const response = await categoriesApi.getCategories();
            // console.log("this is category product data",response.data.data)
            setLoading(false);
            setError(false);
            setCategories(response.data?.data);
        } catch (error) {
            setError(true);
            console.log(error.response)
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const products = [
        {
            imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            discount: 'Make to Order',
            productName: 'Product 1',
        },
        {
            imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            discount: 'Make to Order',
            productName: 'Product 2',
        },
    ];

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../assets/home-logo.jpg')} style={styles.headerImage} />
            </View>


            {/* Shop By Category */}
            <Text style={styles.headerText}>SHOP BY CATEGORY</Text>
            <View style={styles.categoriesScrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {loading && (
                        <View style={styles.centeredView}>
                            <ActivityIndicator style={styles.centeredText} animating={loading} />
                        </View>
                    )}
                    {error && (
                        <View style={styles.centeredView}>
                            <AppText style={styles.centeredText}>Error loading categories.</AppText>
                        </View>
                    )}
                    {!loading && !error && categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            title={category.category_code}
                            imageSource={require('../assets/logo.png')}
                            onPress={() => {
                                navigation.navigate(routes.PRODUCT_LIST, { categoryCode: category.category_code});
                            }}
                        />
                    ))}
                </ScrollView>
            </View>


            {/* Price Container */}
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Current Platinum 950: ₹ 2911/- per gm</Text>
            </View>

            <View style={styles.productCardContainer}>
                <View style={styles.productCardTitle}>
                    <Text style={styles.sectionTitle}>Medley Collection</Text>
                    <Text style={styles.viewAllText}>view all</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {products.map((product, index) => (
                        <CollectionCard
                            key={index}
                            imageUrl={product.imageUrl}
                            discount={product.discount}
                            productName={product.productName}
                            onPress={() => { console.log('Product pressed:', product.productName); }}
                        />
                    ))}
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
        justifyContent: "center",

    },
    categoriesScrollView: {
        height: 180,
        paddingTop: 5,
        flex: 1,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredText: {
        textAlign: 'center',
        paddingLeft:175
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
    productCardContainer: {
        padding: 10,
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

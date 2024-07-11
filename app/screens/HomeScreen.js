import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import categoriesApi from '../apis/category';
import productApi from '../apis/productApi';
import AppText from '../components/AppText';
import { ActivityIndicator } from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import CategoryListCard from '../components/CategoryListCard';
const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [spotlightProducts, setSpotlightProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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
            console.log(error.response?.data);
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
        loadData();
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

        return data?.map(renderItem);
    };

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.header}>
                <Image source={require('../assets/home-logo.jpg')} style={styles.headerImage} />
            </View>

            <Text style={styles.headerText}>SHOP BY CATEGORY</Text>
            <View style={styles.categoriesScrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {renderContent(
                        categories,
                        'Try Again, Refresh Again!',
                        category => (
                            <CategoryListCard key={category.id} item={category} navigation={navigation} />
                        )
                    )}
                </ScrollView>
            </View>

            {spotlightProducts.length > 0 && <Text style={styles.headerText}>Medley Collections</Text>}
            {spotlightProducts.map(spotlight => (
                <View key={spotlight.id} style={styles.spotlightContainer}>
                    <Text style={styles.spotlightTitle}>{spotlight.name}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {spotlight.products.map(item => (
                            <ProductCard key={item.id} product={item} navigation={navigation} />
                        ))}
                    </ScrollView>
                </View>
            ))}
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
    spotlightContainer: {
        paddingVertical: 10,
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
    spotlightTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
});

export default HomeScreen;

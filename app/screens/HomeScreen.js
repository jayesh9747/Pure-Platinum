
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Card from '../components/Card';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {

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
        // Add more products here
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.headerImage} />
            </View>

            <Text style={styles.headerText}>SHOP BY CATEGORY</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <Card title="Ring" imageSource={require('../assets/logo.png')} onPress={() => { }} />
                <Card title="Chain" imageSource={require('../assets/logo.png')} onPress={() => { }} />
                <Card title="Couple Band" imageSource={require('../assets/logo.png')} onPress={() => { }} />
            </ScrollView>

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
                        <ProductCard
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

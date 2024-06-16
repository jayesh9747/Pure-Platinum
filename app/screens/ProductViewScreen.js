
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import color from '../config/color';
import CheckboxGroup from '../components/CheckboxGroup';
import AppTable from '../components/AppTable';

const ProductViewScreen = () => {
    const productImageUri = 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg';
    const sizeOptions = [11, 18, 20, 19, 21, 22, 23, 45, 69, 78];
    const diamondQualityOptions = ["si-43", "VVS-EF", "Si-ch"];
    const metalOptions = ["Platinum Rose Gold", "Platinum"];

    const productDetails = [
        { 'Code': 'PPRO3151D', 'Product weight': '2.80 gms', 'Size': '11' },
    ];

    const metalDetails = [
        { 'Metal': 'Platinum+Rose Gold', 'Gold Wt': '0.24 gms', 'Platinum Wt': '2.55 gms' },
    ];

    const diamondDetails = [
        { 'Shape': 'ROUND', 'Weight': '0.012', 'Quality': 'SI-IJ', 'Diamonds Pcs': '1', 'Diamond Size': '1.40' },
        { 'Shape': 'ROUND', 'Weight': '0.019', 'Quality': 'SI-IJ', 'Diamonds Pcs': '1', 'Diamond Size': '1.60' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={{ uri: productImageUri }} style={styles.productImage} />

                <View style={styles.productCodeContainer}>
                    <Text style={styles.productCode}>Code: PPRO3151D</Text>
                </View>

                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE METAL</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup title="Metal:" options={metalOptions} />
                    </ScrollView>
                </View>

                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE DIAMOND QUALITY</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup title="Diamond Quality:" options={diamondQualityOptions} />
                    </ScrollView>
                </View>

                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE SIZE</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup title="Size:" options={sizeOptions} />
                    </ScrollView>
                </View>

                <AppTable title="PRODUCT DETAILS" data={productDetails} />
                <AppTable title="METAL DETAILS" data={metalDetails} />
                <AppTable title="DIAMOND DETAILS" data={diamondDetails} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.wishlistButton}>
                    <Text style={styles.buttonText}>WISHLIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
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
    optionSection: {
        margin: 8,
        marginBottom: 5
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
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

export default ProductViewScreen;


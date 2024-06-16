// ProductCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ProductCard = ({ imageUrl, discount, productName, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{discount}</Text>
                </View>
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
                <Text style={styles.productName}>{productName}</Text>
            </View>
        </TouchableWithoutFeedback>

    );
};


const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        margin: 4,
        backgroundColor: '#fff',
        position: 'relative',
        alignItems: 'center',
        width: 200,
        height: 240
    },
    discountTag: {
        position: 'absolute',
        top: 20,
        left: 0,
        backgroundColor: '#ff6347',
        padding: 5,
        borderTopEndRadius: 100,
        borderBottomEndRadius: 100,
        zIndex: 1
    },
    discountText: {
        color: '#fff',
        fontSize: 15,
    },
    productImage: {
        marginTop: 0,
        width: 180,
        height: 180,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductCard;

// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Card = ({ title, imageSource, onPress }) => {
    return (
        <TouchableWithoutFeedback  onPress={onPress}>
            <View style={styles.card}>
                <Image source={imageSource} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        margin: 5,
        padding: 8,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 5,
        marginBottom: 5,
        // resizeMode:'contain'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Card;

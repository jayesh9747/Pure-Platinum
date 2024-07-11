import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import color from '../config/color';

const ProductItem = ({
  item,
  navigation,
  handleFirstButtonPress,
  handleSecondButtonPress,
  firstButtonText,
  secondButtonText
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetail', { productId: item.product_id })}>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.product?.images[0]?.image_url }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Code: {item.product?.code || item.product?.name || "No Name"}</Text>
          <Text style={styles.productCategory}>Categories: {item.product?.category?.name}</Text>
          <Text style={styles.productType}>Product Type: {item.product?.product_type}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleFirstButtonPress(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>{firstButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSecondButtonPress(item?.id)} style={styles.button}>
              <Text style={styles.buttonText}>{secondButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  productContainer: {
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
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
  productCategory: {
    fontSize: 14,
    color: '#777',
  },
  productType: {
    fontSize: 14,
    color: '#777',
  },
  button: {
    flex: 1,
    padding: 5,
    backgroundColor: color.secondary, // Update with actual color
    borderRadius: 3,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProductItem;

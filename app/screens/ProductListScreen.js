import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import productsApi from '../apis/productApi'; // Ensure the correct path
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryCode } = route.params;

  console.log("this is category code", categoryCode);

  const navigation = useNavigation();

  const loadProducts = async () => {

    try {
      const result = await productsApi.getCategoryProducts();
      console.log("this is category product",result)
      setLoading(false);
      setError(false);
      setProducts(result.data.data.category_products);
    } catch (error) {
      setError(true);
      console.log(error)
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {

    console.log(error)
    return (
      <View style={styles.error}>
        <Text>Error loading products.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  row: {
    flex: 1,
    justifyContent: "space-between"
  },
  separator: {
    height: 0,
    marginVertical: 0,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductListScreen;

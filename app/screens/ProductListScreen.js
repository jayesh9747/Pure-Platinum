import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Dimensions } from 'react-native';
import productsApi from '../apis/productApi'; // Ensure the correct path
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductListScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryCode, data } = route.params;

  const navigation = useNavigation();

  const loadProducts = async () => {
    try {
      const result = await productsApi.getCategoryProducts(categoryCode);
      setLoading(false);
      setError(false);
      setProducts(result.data.data.category_products);
    } catch (error) {
      setError(true);
      console.log(error)
    }
  };

  useEffect(() => {
    if (data) {
      setProducts(data);
      setLoading(false);
    } else {
      loadProducts();
    }
  }, []);

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
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
      keyExtractor={item => item.id.toString()}
      numColumns={Math.floor(width / 180)}
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
    height: 10,
    marginVertical: -5,
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

import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import productsApi from '../apis/productApi'; // Ensure the correct path
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import color from '../config/color';
import FilterScreen from './FilterScreen';

const { width } = Dimensions.get('window');

const ProductListScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const { categoryCode, data } = route.params;

  const navigation = useNavigation();

  const loadProducts = async () => {
    try {
      if (categoryCode) {
        console.log("this is category code", categoryCode);
        const result = await productsApi.getCategoryProducts(categoryCode);
        console.log(result.data);
        setLoading(false);
        setError(false);
        setProducts(result.data.data.category_products);
      } else {
        setError(false);
        setProducts(data);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      console.log(error)
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
    return (
      <View style={styles.error}>
        <Text>Error loading products.</Text>
      </View>
    );
  }

  return (

    <>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => console.log("touched")}>
          <View style={styles.Button}>
            <Text style={styles.buttonText}>SORT</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleOpenModal}>
          <View style={styles.Button}>
            <Text style={styles.buttonText}>FILTER</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()}
        numColumns={Math.floor(width / 180)}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        refreshing={refreshing}
        onRefresh={loadProducts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FilterScreen modalVisible={modalVisible} category_code={categoryCode || "pscb"}   onClose={handleCloseModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: -5,
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
  },
  header: {
    position: 'static',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  Button: {
    flex: 1,
    padding: 5,
    margin: 3,
    borderRadius: 5,
    borderBottomColor: "#",
    alignItems: 'center',
  },
  buttonText: {
    color: color.medium,
    fontSize: 18,
    alignSelf: "center",
    textAlign: 'center'
  },

});

export default ProductListScreen;

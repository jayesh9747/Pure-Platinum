import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import productsApi from '../apis/productApi'; // Ensure the correct path
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import color from '../config/color';
import FilterScreen from './FilterScreen';
import NoItem from '../components/NoItem';

const { width } = Dimensions.get('window');

const ProductListScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const { categoryCode, data } = route.params;
  const navigation = useNavigation();

  const loadProducts = async (newPage = 1) => {
    try {
      if (categoryCode) {
        
        setLoading(true);
        const result = await productsApi.getCategoryProducts({ category_code: categoryCode, page: newPage, ...selectedOptions });
        const productsWithPage = result.data.data.products.map(product => ({
          ...product,
          page: newPage,
        }));
        setLoading(false);

        if (newPage === 1) {
          setProducts(productsWithPage);
        } else {
          setProducts(prevProducts => [...prevProducts, ...productsWithPage]);
        }

        setHasMore(result.data.data.products.length > 0);
        setLoading(false);
        setError(false);
      } else {
        setError(false);
        setProducts(data);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      console.log(error.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    loadProducts(1);
  }, [selectedOptions]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading && page === 1) {
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

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loading} />;
  };


  return (
    <>

      {products.length < 1 &&
        <NoItem message={"No product available!"} />
      }

      {products.length > 0 &&
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => console.log("Touched")}>
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
      }

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        keyExtractor={item => `${item.page}-${item.id}`} // Ensure unique keys by combining page number and product ID
        numColumns={Math.floor(width / 180)}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        refreshing={refreshing}
        onRefresh={() => loadProducts(1)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FilterScreen modalVisible={modalVisible} category_code={categoryCode || "pscb"} onClose={handleCloseModal} onset={setSelectedOptions} />
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
  loading: {
    padding: 10,
  },
});

export default ProductListScreen;

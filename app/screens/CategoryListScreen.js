import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import CategoryListCard from '../components/CategoryListCard';
import NoItem from '../components/NoItem';
const { width } = Dimensions.get('window');

const CategoryListScreen = ({ route, navigation }) => {
    const { subCategories } = route.params;

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!subCategories || subCategories.length === 0) {
            navigation.goBack();
        }
    }, [subCategories]);

    return (
        <View style={styles.container}>
            {subCategories && subCategories.length > 0 ? (
                <FlatList
                    data={subCategories}
                    keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                    refreshing={refreshing}
                    renderItem={({ item }) => (
                        <CategoryListCard item={item} navigation={navigation} />
                    )}
                    contentContainerStyle={styles.FlatList}
                    columnWrapperStyle={styles.row}
                    numColumns={Math.floor(width / 180)}
                />
            ) : (
                <NoItem message="No subcategories available." />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: '#555',
    },
    FlatList: {
        padding: 5,
        marginTop: -5,
    },
    row: {
        flex: 1,
        justifyContent: "space-between"
    }
});

export default CategoryListScreen;


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductViewScreen from '../screens/ProductViewScreen';

const Stack = createNativeStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductViewScreen}
                options={{ title: 'Product Details' }}
            />
        </Stack.Navigator>
    );
}

export default HomeNavigator;

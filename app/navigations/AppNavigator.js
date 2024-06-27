import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeNavigator from './HomeNavigator';
import CartScreen from '../screens/CartScreen';
import WishListScreen from '../screens/WishListScreen'
import AccountScreen from '../screens/AccountScreen';




const Tab = createBottomTabNavigator();

function AppNavigator(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeScreen"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
                    title: 'Pure Platinum',
                    headerShown: false
                }} />
            <Tab.Screen
                name="Wishlist"
                component={WishListScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="heart" size={size} color={color} />
                }} />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="cart" size={size} color={color} />
                }} />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size} color={color} />
                }} />
        </Tab.Navigator>
    );
}

export default AppNavigator;
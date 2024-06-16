import React from 'react';
import { View, Text } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import routes from "./routes";
import HomeScreen from '../screens/HomeScreen'
import AppButton from '../components/AppButton';


const Tab = createBottomTabNavigator();

function AppNavigator(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />
                }} />
            <Tab.Screen
                name="Wishlist"
                component={AppButton}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="heart" size={size} color={color} />
                }} />
            <Tab.Screen
                name="Cart"
                component={AppButton}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="cart" size={size} color={color} />
                }} />
            <Tab.Screen
                name="Account"
                component={AppButton}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size} color={color} />
                }} />    
        </Tab.Navigator>
    );
}

export default AppNavigator;
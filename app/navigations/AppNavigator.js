import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import HomeNavigator from './HomeNavigator';
import CartScreen from '../screens/CartScreen';
import WishListScreen from '../screens/WishListScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons style={{ paddingLeft : 20,marginTop:2}} name="menu" size={24} />
    </TouchableOpacity>
);

function AppNavigator({ navigation }) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeScreen"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
                    title: 'Pure Platinum',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishListScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="heart" size={size} color={color} />,
                    title: 'Wishlist',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="cart" size={size} color={color} />,
                    title: 'Cart',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
                    title: 'Account',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TestScreen from '../screens/TestScreen';


const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>

            <Drawer.Screen name="Home" component={AppNavigator} />
            <Drawer.Screen name="ExtraScreen1" component={LoginScreen} />
            <Drawer.Screen name="ExtraScreen2" component={TestScreen} />

        </Drawer.Navigator>
    );
}

export default AppDrawerNavigator;

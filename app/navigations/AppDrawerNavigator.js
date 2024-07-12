import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/LoginScreen';
import CategoryNavigator from './CategoryNavigator';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
  return (
    <>
      <Drawer.Navigator screenOptions={{ headerShown: false }} >
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="Categories" component={CategoryNavigator} />
        <Drawer.Screen name="ExtraScreen1" component={LoginScreen} />
        <Drawer.Screen name="ExtraScreen2" component={ForgotPasswordScreen} />
      </Drawer.Navigator>
    </>
  );
}

export default AppDrawerNavigator;

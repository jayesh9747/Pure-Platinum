import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="t1" component={LoginScreen} />
      <Drawer.Screen name="t2" component={WelcomeScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

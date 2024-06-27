import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import ScreenA from '../screens/ScreenA';
import ScreenB from '../screens/ScreenB';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="ScreenA" component={ScreenA} />
      <Drawer.Screen name="ScreenB" component={ScreenB} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './AppNavigator';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import TestScreen from '../screens/TestScreen';
// import CategoryNavigator from './CategoryNavigator';


// const Drawer = createDrawerNavigator();

// function AppDrawerNavigator() {
//     return (
//         <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <CategoryNavigator {...props} />} >

//             <Drawer.Screen name="Home" component={AppNavigator} />
//             <Drawer.Screen name="ExtraScreen1" component={LoginScreen} />
//             <Drawer.Screen name="ExtraScreen2" component={TestScreen} />

//         </Drawer.Navigator>
//     );
// }

// export default AppDrawerNavigator;


import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TestScreen from '../screens/TestScreen';
import CategoryNavigator from './CategoryNavigator';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OfflineNotice from '../components/OfflineNotice';

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

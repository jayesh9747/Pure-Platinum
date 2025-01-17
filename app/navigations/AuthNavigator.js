import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';


const Stack = createNativeStackNavigator();


const AuthNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='forgetPassword' component={ForgotPasswordScreen} />

        </Stack.Navigator>
    )
}


export default AuthNavigator;
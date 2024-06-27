import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';


import navigationTheme from './app/navigations/navigationtheme';
import AuthNavigator from './app/navigations/AuthNavigator';
import AppNavigator from './app/navigations/AppNavigator';

import authStorage from './app/auth/authStore';
import AuthContext from './app/auth/context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setReady] = useState(false);
  const [token, setToken] = useState(null);

  const restoreToken = async () => {
    const authToken = await authStorage.getToken();
    console.log(authToken);
    if (authToken) setToken(authToken);
  };

  useEffect(() => {
    const rehydrate = async () => {
      await restoreToken();
      setReady(true);
      await SplashScreen.hideAsync();
    };
    rehydrate();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer theme={navigationTheme}>
        {token ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


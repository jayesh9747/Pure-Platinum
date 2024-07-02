import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import AppButton from './AppButton';
import AuthApi from '../apis/AuthApi';

const LogoutButton = () => {

  const { setToken } = useContext(AuthContext);

  const logout = async () => {
    try {
      const result = await AuthApi.logout();
      console.log('Logout result:', result);
      authStore.removeToken();
      setToken(null);
    } catch (error) {
      console.error('Logout failed', error.response?.data.message || error.message);
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  };


  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: logout,
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <AppButton title="Logout" onPress={handleLogout} />
  );
};

export default LogoutButton;

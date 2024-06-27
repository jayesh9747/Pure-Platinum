import React, { useContext } from 'react';
import { Alert } from 'react-native';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import AppButton from './AppButton';

const LogoutButton = () => {

  const { setToken } = useContext(AuthContext);

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
          onPress: () => {
            authStore.removeToken();
            setToken(null);
          }
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Screen from './app/components/Screen';
import AppText from './app/components/AppText';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import AppDropdownField from './app/components/forms/AppDropdownField';
import AppNavigator from './app/navigations/AppNavigator';

import navigationTheme from './app/navigations/navigationtheme';
import { NavigationContainer } from '@react-navigation/native';

import Card from './app/components/Card';
import ProductCard from './app/components/ProductCard';
import CheckboxGroup from './app/components/CheckboxGroup';

export default function App() {
  const sizeOptions = [11, 18, 20, 19, 21, 22, 23, 45, 45, 69, 78];
  return (
    <>
      <NavigationContainer theme={navigationTheme} >
        <AppNavigator />
      </NavigationContainer>

      {/* <View style={styles.container}>
        {/* <ProductCard
          imageUrl={"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
          discount={"make order"}
          productName={"Ring"}
        />
        <Card title="Ring" imageSource={{ uri: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" }} onPress={() => { }} /> */}




        {/* <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CheckboxGroup title="Size:" options={sizeOptions} />
          </ScrollView>
        </View> */}
      {/* </View> */} 

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

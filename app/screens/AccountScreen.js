import React, { useState, useEffect, useContext } from 'react';
import ListItem from '../components/ListItem';
import { StyleSheet, View, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
import colors from '../config/color';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/ListItemSeparator';
import AuthApi from '../apis/AuthApi';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';

const menuItems = [
    {
        title: 'My Listings',
        icons: {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        }
    },
    {
        title: 'My Messages',
        icons: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: 'Messages'
    }
];

const AccountScreen = ({ navigation }) => {

    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);

    const { setToken } = useContext(AuthContext);

    const handleGetCustomer = async () => {
        try {
            const result = await AuthApi.fetchCustomer();
            setCustomer(result.data.data);
            setLoading(false);
            console.log(result.data.data);
        } catch (error) {
            console.error(error?.response?.data);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            const result = await AuthApi.logout();
            console.log('Logout result:', result);
            await authStore.removeToken();
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


    useEffect(() => {
        handleGetCustomer();
    }, [])

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <ListItem
                    title={customer.name}
                    subtitle={customer.email}
                    image={require('../assets/user.png')}
                />
            </View>
            <View >
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icons.name}
                                    backgroundColor={item.icons.backgroundColor}
                                />}
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />}
                />
            </View>
            <ListItem
                title="Log Out"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d" />
                }
                onPress={handleLogout}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1 / 4
    },
    screen: {
        backgroundColor: colors.light
    }
});

export default AccountScreen;

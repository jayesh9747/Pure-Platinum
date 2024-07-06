// import React, { useEffect, useState } from 'react';

// import { StyleSheet, View } from 'react-native'

// import LogoutButton from '../components/LogoutButton';
// import AuthApi from '../apis/AuthApi';

// const AccountScreen = (props) => {

//     const [customer, setCustomer] = useState({});

//     const handlegetcustomer = async () => {
//         const result = await AuthApi.fetchCustomer();
//         setCustomer(result.data.data);
//         console.log(result.data.data);
//     }


//     useEffect(() => {
//         handlegetcustomer();
//     }, [])




//     return (
//         <View style={styles.buttonContainer}>



//             <LogoutButton />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     backGround: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center'
//     },
//     buttonContainer: {
//         padding: 20,
//         width: '100%'
//     },
// })


// export default AccountScreen;


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';

// import LogoutButton from '../components/LogoutButton';
// 

// const AccountScreen = (props) => {
//     

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.infoContainer}>
//                 <Text style={styles.label}>Name:</Text>
//                 <Text style={styles.value}>{customer.name}</Text>

//                 <Text style={styles.label}>Email:</Text>
//                 <Text style={styles.value}>{customer.email}</Text>

//                 <Text style={styles.label}>Mobile:</Text>
//                 <Text style={styles.value}>{customer.mobile}</Text>

//                 <Text style={styles.label}>Company:</Text>
//                 <Text style={styles.value}>{customer.company}</Text>

//                 <Text style={styles.label}>Address:</Text>
//                 <Text style={styles.value}>{customer.address}</Text>

//                 <Text style={styles.label}>City:</Text>
//                 <Text style={styles.value}>{customer.city?.name}</Text>

//                 <Text style={styles.label}>State:</Text>
//                 <Text style={styles.value}>{customer.state?.name}</Text>

//                 <Text style={styles.label}>Country:</Text>
//                 <Text style={styles.value}>{customer.country?.name}</Text>

//                 <Text style={styles.label}>Pin Code:</Text>
//                 <Text style={styles.value}>{customer.pin_code}</Text>

//                 <Text style={styles.label}>Customer Type:</Text>
//                 <Text style={styles.value}>{customer.customer_type}</Text>
//             </View>

//             <LogoutButton />
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     container: {
//         padding: 20,
//         width: '100%',
//         flexGrow: 1
//     },
//     infoContainer: {
//         marginBottom: 20
//     },
//     label: {
//         fontWeight: 'bold',
//         marginTop: 10
//     },
//     value: {
//         marginBottom: 5
//     }
// })

// export default AccountScreen;

import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import { StyleSheet, View, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
import colors from '../config/color';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/ListItemSeparator';
import AuthApi from '../apis/AuthApi';

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

    const handleGetCustomer = async () => {
        try {
            const result = await AuthApi.fetchCustomer();
            setCustomer(result.data.data);
            setLoading(false);
            console.log(result.data.data);
        } catch (error) {
            console.error(error.response.data);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            // const result = await AuthApi.logout();
            // console.log('Logout result:', result);
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

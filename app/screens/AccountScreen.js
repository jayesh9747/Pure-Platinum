import React from 'react';

import { StyleSheet, View } from 'react-native'

import LogoutButton from '../components/LogoutButton';

const AccountScreen = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <LogoutButton />
        </View>
    );
}

const styles = StyleSheet.create({
    backGround: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer: {
        padding: 20,
        width: '100%'
    },
})


export default AccountScreen;
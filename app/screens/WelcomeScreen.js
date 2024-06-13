import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'

import AppButton from '../components/AppButton';

const WelcomeScreen = (props) => {
    return (
        <View style={styles.backGround}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title={'Login'} />
                <AppButton title={'Register'} color='primary' />
            </View>
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
    logo: {
        width: 350,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 250,
        alignItems: 'center',
        padding: 20
    }

})

export default WelcomeScreen;
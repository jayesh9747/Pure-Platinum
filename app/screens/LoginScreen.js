import React from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, View } from 'react-native'
import * as Yup from 'yup';


import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm } from '../components/forms';
import color from '../config/color';


const validationSchema = Yup.object().shape({
    "Mobile No": Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Mobile number is not valid')
        .required()
        .label('Mo Number'),
    Password: Yup.string().required().min(6).label('Password')
})

const LoginScreen = ({ navigation }) => {

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')} />
            <AppText style={styles.title}>Welcome back</AppText>

            <View style={styles.register} >
                <AppText style={styles.subtitle}>Don't have an account? Create Account</AppText>
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.REGISTER)}>
                    <AppText style={styles.footer}>Create account</AppText>
                </TouchableWithoutFeedback> */}
            </View>


            <AppForm
                initialValues={{ "Mobile No": '', Password: '' }}
                onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='numeric'
                    name='Mobile No'
                    icon='phone'
                    placeholder='Enter Mobile No'
                />
                <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    icon={'lock'}
                    name='Password'
                    placeholder='Password'
                    secureTextEntry
                    textContentType='password'
                />

                <AppText style={styles.forgetpass}>Forget Password?</AppText>
                <SubmitButton title='Login' color={color.primary} />
            </AppForm>
            <AppText style={styles.footerline}>All Rights are reserved Madeby Konnections</AppText>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
        marginVertical: 30,
    },
    footer: {
        textDecorationLine: 'underline',
    },
    forgetpass: {
        textAlign: 'right',
        color: color.medium,
        fontSize: 15,
        fontWeight: "600",
        marginVertical: 10
    },
    footerline: {
        fontSize: 12,
        color: color.medium
    },
    title: {
        fontSize: 25,
        marginBottom: 20
    },
    subtitle: {
        color: color.medium,
        marginBottom: 20,
        fontSize: 15
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        color: color.medium,
    }
})

export default LoginScreen;
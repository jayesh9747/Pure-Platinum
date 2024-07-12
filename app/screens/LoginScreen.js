import React, { useContext, useState } from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, View, Text } from 'react-native'
import * as Yup from 'yup';

import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import color from '../config/color';
import routes from '../navigations/routes';
import authapi from '../apis/AuthApi';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import { showToast } from '../components/ToastMessage';

const validationSchema = Yup.object().shape({
    mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Mobile number is not valid')
        .required()
        .label('Mo Number'),
    password: Yup.string().required().min(6).label('Password')
})

const LoginScreen = ({ navigation }) => {

    const [loginFailed, setLoginFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const authContext = useContext(AuthContext);

    const handleSubmit = async ({ mobile, password }) => {
        try {
            const result = await authapi.login({ mobile, password });

            console.log(result.data.token);

            if (!result || result.status !== 200) throw new Error(result.problem || 'Login failed');


            setLoginFailed(false);
            const token = result.data.token

            await authStore.storeToken(token);
            // const tok = await authStore.getToken();
            // console.log("this is from login screen store token ", tok);
            // console.log('Successfully stored token');
            authContext.setToken(token);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log(error);
            setLoginFailed(true);
            setErrMsg(error.response?.data?.message || 'An unexpected error occurred');
            authStore.removeToken();
        }
    };


    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo-final.png')} />
            <AppText style={styles.title}>Welcome back</AppText>

            <View style={styles.register}>
                <Text style={styles.subtitle}>Don't have an account?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.REGISTER)}>
                    <Text style={styles.registerTagline}>Create account</Text>
                </TouchableWithoutFeedback>
            </View>

            <AppForm
                initialValues={{ mobile: '', password: '' }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >

                {loginFailed && <ErrorMessage visible={true} error={errMsg} />}

                <AppFormField
                    title="Mobile No"
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='numeric'
                    name='mobile'
                    icon='phone'
                    placeholder='Enter Mobile No'
                />
                <AppFormField
                    title='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    icon={'lock'}
                    rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                    name='password'
                    placeholder='Password'
                    secureTextEntry={!passwordVisible}
                    textContentType='password'
                    onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                />

                {/* <AppText style={styles.forgetPassword}>Forget Password?</AppText> */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.FORGET_PASSWORD)}>
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                </TouchableWithoutFeedback>
                <SubmitButton title='Login' color={color.primary} />
            </AppForm>
            <AppText style={styles.footerline}>All Rights are reserved Made by Konnections</AppText>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 160,
        height: 80,
        resizeMode: 'contain',
    },
    registerTagline: {
        textDecorationLine: 'underline',
    },
    forgetPassword: {
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
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    subtitle: {
        marginRight: 5,
    },
    registerTagline: {
        color: color.medium,
        textDecorationLine: 'underline',
    },
})

export default LoginScreen;
import React from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView,TextInput } from 'react-native'
import * as Yup from 'yup';


import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm } from '../components/forms';
import color from '../config/color';
import AppDropdownField from '../components/forms/AppDropdownField';


const validationSchema = Yup.object().shape({
    "Mobile No": Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Mobile number is not valid')
        .required()
        .label('Mo Number'),
    Password: Yup.string().required().min(6).label('Password')
})

const RegisterScreen = ({ navigation }) => {

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')} />
            <AppText style={styles.title}>Create An Account</AppText>
            <View style={styles.register} >
                <AppText style={styles.subtitle}>I already have an account  Sign in </AppText>
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.REGISTER)}>
                    <AppText style={styles.footer}>Create account</AppText>
                </TouchableWithoutFeedback> */}
            </View>
            <View style={styles.register} >
                <AppText style={styles.subtitle}>Uncertain about creating an account ? Explore the benefits</AppText>
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.REGISTER)}>
                    <AppText style={styles.footer}>Create account</AppText>
                </TouchableWithoutFeedback> */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                <AppForm
                    initialValues={{ "Mobile No": '', Password: '' }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCorrect={false}
                        name='Name'
                        placeholder='Enter Name'
                    />
                    <AppFormField
                        autoCorrect={false}
                        name='Mobile No.'
                        keyboardType="numeric"
                        placeholder='Enter Mobile'
                    />
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        name='Email'
                        placeholder='Enter Email'
                    />
                    <AppFormField
                        name='Company'
                        placeholder='Enter Company'
                    />
                    <AppFormField
                        name='Customer Type'
                        placeholder='Select Type'
                    />
                    <AppFormField
                        name='GST No.'
                        placeholder='Enter GST No.'
                    />
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        name='Password'
                        placeholder='Password'
                        secureTextEntry
                        textContentType='password'
                    />
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        name='confirm Password'
                        placeholder='Password'
                        secureTextEntry
                        textContentType='password'
                    />
                    <AppFormField
                        name='Date pf Birth'
                        placeholder='Choose Date'
                    />
                    <AppFormField
                        name='Address'
                        placeholder='Enter Address'
                    />

                    {/* ############ */}

                    {/* <AppDropdownField/> */}



                    <AppText style={styles.forgetpass}>Forget Password?</AppText>
                    <SubmitButton title='Login' color={color.primary} />
                </AppForm>
            </ScrollView>
            <AppText style={styles.footerline}>All Rights are reserved Madeby Konnections</AppText>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    logo: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
        marginVertical: 0,
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
        marginBottom: 15
    },
    subtitle: {
        color: color.medium,
        marginBottom: 15,
        fontSize: 12
    },
    ScrollView: {
        margin: 2
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        color: color.medium,
    }
})

export default RegisterScreen;
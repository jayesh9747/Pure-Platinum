import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm } from '../components/forms';
import color from '../config/color';
import routes from '../navigations/routes';
import dropdownApi from '../apis/dropdown';
import validation from '../validation/registerValidation'
import authapi from '../apis/AuthApi';



const RegisterScreen = ({ navigation }) => {

    const [countryTags, SetcountryTags] = useState([]);
    const [stateTags, SetStateTags] = useState([]);
    const [cityTags, SetCityTags] = useState([]);


    const fetchCountries = async () => {
        try {
            const result = await dropdownApi.getCountries();

            country = result.data.data.map((country) => ({
                label: country?.name,
                value: country?.id
            }));
            console.log(country);
            SetcountryTags(country);

        } catch (error) {
            console.log(`error is occurred while fetching country`, error);
        }
    }

    const fetchStates = async (country_id) => {
        try {
            const result = await dropdownApi.getStates(country_id || "101");

            states = result.data.data.map((state) => ({
                label: state?.name,
                value: state?.id
            }));
            console.log(states);
            SetStateTags(states);

        } catch (error) {
            console.log(`error is occurred while fetching states`, error);
        }
    }

    const fetchCities = async (state_id) => {
        try {
            const result = await dropdownApi.getCity(state_id || "4030");

            cities = result.data.data.map((city) => ({
                label: city?.name,
                value: city?.id
            }));
            console.log(cities);
            SetCityTags(cities);

        } catch (error) {
            console.log(`error is occurred while fetching cities`, error);
        }
    }


    const handleSubmit = async (registerData) => {
        console.log(registerData)
        try {
            const result = await authapi.register(registerData);
            console.log(result);
            if (!result) throw new Error(result.problem);

            console.log("successfully login the user",result.data);
        } catch (error) {
            console.error(error.response?.data?.message)
        }
    }


    useEffect(() => {
        fetchCountries();
        fetchStates();
        fetchCities();
    }, []);




    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo-final.png')} />
            <AppText style={styles.title}>Create An Account</AppText>
            <View style={styles.register}>
                <Text style={styles.subtitle}>I already have an account. </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.LOGIN)}>
                    <AppText style={[styles.subtitle, styles.subtitlePart]}>Sign in</AppText>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.register}>
                <Text style={styles.subtitle}>Uncertain about creating an account? </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.LOGIN)}>
                    <Text style={[styles.subtitle, styles.subtitlePart]}>Explore the benefits</Text>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                <AppForm
                    initialValues={{
                        name: '',
                        email: '',
                        mobile: '',
                        company: '',
                        customer_type: '',
                        gst_no: '',
                        password: '',
                        confirmPassword: '',
                        address: '',
                        dob: '',
                        city_id: '',
                        state_id: '',
                        country_id: '',
                        address: '',
                        pin_code: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validation.RegisterValidationSchema}
                >
                    <AppFormField
                        autoCorrect={false}
                        name="name"
                        title="Name"
                        placeholder="Enter Name" />
                    <AppFormField
                        autoCorrect={false}
                        name="mobile"
                        title="Mobile No"
                        keyboardType="numeric"
                        placeholder="Enter Mobile" />
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        name="email"
                        title={"Email"}
                        placeholder="Enter Email" />
                    <AppFormField
                        name="company"
                        title="Company"
                        placeholder="Enter Company" />
                    <AppFormField
                        title="Customer Type"
                        name="customer_type"
                        type="dropdown"
                        items={[
                            { label: 'Corporate', value: 'corporate' },
                            { label: 'Export', value: 'export' },
                            { label: 'Retailer', value: 'retailer' },
                            { label: 'Wholesaler', value: 'wholesaler' },
                        ]} placeholder="Select customerType" />
                    <AppFormField
                        title="GST No"
                        name="gst_no"
                        placeholder="Enter GST No." />
                    <AppFormField
                        title="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                        textContentType="password" />
                    <AppFormField
                        title='Confirm Password'
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        secureTextEntry
                        textContentType="password" />
                    <AppFormField
                        title="Address"
                        name="address"
                        placeholder="Enter Address"
                        multiline
                        numberOfLines={4} />
                    <AppFormField
                        title='Date of Birth'
                        name="dob"
                        type="date"
                        placeholder="Choose Date" />

                    <AppFormField
                        title={'Country'}
                        name="country_id"
                        type="dropdown"
                        disable={countryTags === '' ? true : false}
                        items={countryTags}
                        placeholder="Select country" />

                    <AppFormField
                        title='State'
                        name="state_id" type="dropdown"
                        items={stateTags}
                        placeholder="Select state" />
                    <AppFormField
                        title="City"
                        name="city_id"
                        type="dropdown"
                        items={cityTags} 
                        placeholder="Select city" />
                    <AppFormField
                        autoCorrect={false}
                        name="pin_code"
                        title="PIN Code"
                        keyboardType="numeric"
                        placeholder="Enter PIN CODE" />
                    <SubmitButton
                        title="Register"
                        color={color.primary} />
                </AppForm>
                <AppText style={styles.footerline}>All Rights are reserved Madeby Konnections</AppText>
            </ScrollView>

        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    logo: {
        width: 160,
        height: 80,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    footerline: {
        fontSize: 12,
        color: color.medium,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
    },
    subtitle: {
        color: color.medium,
        marginBottom: 15,
        fontSize: 12,
    },
    subtitlePart: {
        textDecorationLine: 'underline',
    },
    ScrollView: {
        margin: 2,
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        color: color.medium,
    },
});

export default RegisterScreen;

import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import color from '../config/color';
import routes from '../navigations/routes';
import dropdownApi from '../apis/dropdown';
import validation from '../validation/registerValidation';
import authapi from '../apis/AuthApi';
import { showToast } from '../components/ToastMessage';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import PhoneCodeAndMobile from '../components/PhoneCodeAndMobile';

const RegisterScreen = ({ navigation }) => {
    const [countryTags, SetcountryTags] = useState([]);
    const [stateTags, SetStateTags] = useState([]);
    const [cityTags, SetCityTags] = useState([]);
    const [country_id, Setcountry_id] = useState('');
    const [state_id, Setstate_id] = useState('');
    const [phoneCodeTags, setPhoneCodeTags] = useState([]);
    const [loginFailed, setLoginFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const authContext = useContext(AuthContext);

    const fetchCountries = async () => {
        try {
            const result = await dropdownApi.getCountries();
            const countries = result.data.data.map((country) => ({
                label: country?.name,
                value: country?.id
            }));
            const phoneCodes = result.data.data.map((phoneCode) => ({
                label: phoneCode?.iso2,
                value: phoneCode?.iso2
            }));
            SetcountryTags(countries);
            setPhoneCodeTags(phoneCodes);
        } catch (error) {
            console.log(`Error occurred while fetching countries: ${error.response?.data}`);
        }
    };

    const fetchStates = async () => {
        try {
            const result = await dropdownApi.getStates(country_id);
            const states = result.data.data.map((state) => ({
                label: state?.name,
                value: state?.id
            }));
            SetStateTags(states);
        } catch (error) {
            console.log(`Error occurred while fetching states: ${error?.response?.data.errors?.country_id}`);
            showToast('error', error?.response?.data.errors?.country_id);
        }
    };

    const fetchCities = async () => {
        try {
            const result = await dropdownApi.getCity(state_id);
            const cities = result.data.data.map((city) => ({
                label: city?.name,
                value: city?.id
            }));
            SetCityTags(cities);
        } catch (error) {
            console.log(`Error occurred while fetching cities: ${error.response.data}`);
            showToast('error', error?.response?.data.errors?.state_id);
        }
    };

    const handleSubmit = async (registerData) => {
        try {
            const result = await authapi.register(registerData);
            if (!result) throw new Error(result.problem);
            const token = result.data.token;
            await authStore.storeToken(token);
            authContext.setToken(token);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            const errorData = error.response?.data?.errors;
            const firstKey = errorData ? Object.keys(errorData)[0] : null;
            const firstErrorMessage = firstKey ? errorData[firstKey][0] : 'An unexpected error occurred';
            console.log(firstErrorMessage);
            setLoginFailed(true);
            setErrMsg(firstErrorMessage || 'An unexpected error occurred');
            showToast("error", `${error.response?.data?.message}`);
            authStore.removeToken();
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (country_id) {
            fetchStates();
        }
    }, [country_id]);

    useEffect(() => {
        if (state_id) {
            fetchCities();
        }
    }, [state_id]);

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
                        phone_code: "",
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validation}
                >
                    {loginFailed && <ErrorMessage visible={true} error={errMsg} />}
                    <AppFormField
                        autoCorrect={false}
                        name="name"
                        title="Name"
                        placeholder="Enter Name" />
                    <PhoneCodeAndMobile
                        phoneCodeItems={phoneCodeTags}
                    />
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
                        ]}
                        placeholder="Select customerType" />
                    <AppFormField
                        title="GST No"
                        name="gst_no"
                        placeholder="Enter GST No." />
                    <AppFormField
                        title="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                        name="password"
                        placeholder="Password"
                        secureTextEntry={!passwordVisible}
                        textContentType="password"
                        onRightIconPress={() => setPasswordVisible(!passwordVisible)} />
                    <AppFormField
                        title='Confirm Password'
                        autoCapitalize="none"
                        autoCorrect={false}
                        rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        secureTextEntry={!passwordVisible}
                        textContentType="password"
                        onRightIconPress={() => setPasswordVisible(!passwordVisible)} />
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
                        type={'dropdown'}
                        items={countryTags}
                        placeholder={'Select Country'}
                        name="country_id"
                        onSelected={(selectedCountry) => Setcountry_id(selectedCountry)}
                    />
                    <AppFormField
                        title={'State'}
                        type={'dropdown'}
                        items={stateTags}
                        placeholder={'Select State'}
                        name="state_id"
                        onSelected={(selectedState) => Setstate_id(selectedState)}
                    />
                    <AppFormField
                        title={'City'}
                        type={'dropdown'}
                        items={cityTags}
                        placeholder={'Select City'}
                        name="city_id"
                    />
                    <AppFormField
                        title="Pin code"
                        name="pin_code"
                        placeholder="Enter Pin code" />
                    <SubmitButton title="Register" />
                </AppForm>
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

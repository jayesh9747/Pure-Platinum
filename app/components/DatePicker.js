import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const DatePickerForm = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }

        if (month < 10) {
            month = `0${month}`;
        }

        return `${day}/${month}/${year}`;
    };

    const validationSchema = Yup.object().shape({
        dateOfBirth: Yup.date().required('Date of Birth is required'),
    });

    return (
        <Formik
            initialValues={{ dateOfBirth: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={styles.container}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TouchableOpacity onPress={showDatepicker} style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={values.dateOfBirth ? formatDate(new Date(values.dateOfBirth)) : 'Choose Date'}
                                editable={false}
                                onBlur={handleBlur('dateOfBirth')}
                            />
                            <MaterialCommunityIcons name="calendar" size={24} color="#888" />
                        </TouchableOpacity>
                        {touched.dateOfBirth && errors.dateOfBirth && (
                            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                        )}
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShow(Platform.OS === 'ios');
                                    setDate(selectedDate);
                                    setFieldValue('dateOfBirth', selectedDate);
                                }}
                            />
                        )}
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        
    },
    dateContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#888',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 12,
        width: "100%"
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',

    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#6200ee',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DatePickerForm;

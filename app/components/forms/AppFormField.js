import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import AppText from '../AppText';
import DatePickerField from './AppDatePickerField';
import DropdownField from './AppDropdownField';

const AppFormField = ({ title, name, width, type, items, ...otherProps }) => {
    const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();

    const renderField = () => {
        switch (type) {
            case 'date':
                return (
                    <DatePickerField
                        name={name}
                        value={values[name]}
                        setFieldValue={setFieldValue}
                        onBlur={() => setFieldTouched(name)}
                        maximumDate={new Date()}
                        {...otherProps}
                    />
                );
            case 'dropdown':
                return (
                    <DropdownField
                        name={name}
                        items={items}
                        placeholder={otherProps.placeholder}
                        width={width}
                        {...otherProps}
                    />
                );
            default:
                return (
                    <AppTextInput
                        onBlur={() => setFieldTouched(name)}
                        onChangeText={handleChange(name)}
                        width={width}
                        {...otherProps}
                    />
                );
        }
    };

    return (
        <>
            <AppText style={styles.heading}>{title}</AppText>
            {renderField()}
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 15,
        marginBottom: -6,
    },
});

export default AppFormField;

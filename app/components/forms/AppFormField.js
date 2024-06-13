import React from 'react'
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'
import AppText from '../AppText'


const AppFormField = ({ name,width, ...otherProps }) => {

    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

    return (
        <>  
            <AppText style={styles.heading}>{name}</AppText>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:15,
        marginBottom:-6
    }
})

export default AppFormField

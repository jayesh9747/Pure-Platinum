import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomCheckbox from './CustomCheckbox';

const CheckboxGroup = ({ title, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
            <View style={styles.checkboxGroup}>
                {options.map((option, index) => (
                    <CustomCheckbox
                        key={index}
                        label={option}
                        selected={selectedOption === option}
                        onPress={() => setSelectedOption(option)}
                    />
                ))}
            </View>
    );
};

const styles = StyleSheet.create({
    
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default CheckboxGroup;

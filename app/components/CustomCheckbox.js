import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../config/color';

const CustomCheckbox = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.checkboxContainer, selected && styles.selectedCheckbox]}>
            <Text style={[styles.checkboxLabel, selected && styles.selectedCheckboxLabel]}>{label}</Text>
            {selected && (
                <View style={styles.iconContainer}>
                    <Icon name="check" size={20} color="white" />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        position: 'relative',
    },
    selectedCheckbox: {
        backgroundColor: 'white',
    },
    checkboxLabel: {
        color: color.medium,
    },
    selectedCheckboxLabel: {
        color: color.medium,
    },
    iconContainer: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: 'green',
        borderRadius: 50,
        padding: 1,

    },
});

export default CustomCheckbox;

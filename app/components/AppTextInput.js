import React from 'react'
import { StyleSheet, TextInput, View, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'



import defaultStyles from '../config/style'
import color from '../config/color'

const AppTextInput = ({ icon, width = '100%', ...otherProps }) => {
    return (
        <>
        <View style={[styles.container, { width }]}>
            {icon &&
                <MaterialCommunityIcons name={icon} size={25} color={defaultStyles.colors.medium} style={styles.icon}
                />}
            <TextInput placeholderTextColor={defaultStyles.colors.medium} style={defaultStyles.text} {...otherProps} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: color.medium,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },

})
export default AppTextInput



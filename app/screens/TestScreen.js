
import React from 'react';
import { View, StyleSheet,Text } from 'react-native';

import ProductCard from '../components/ProductCard';
import DatePickerForm from '../components/DatePicker';

function TestScreen(props) {
    return (
        <View >
            {/* <ProductCard product={{id :1 , title : "Hello world" , }} /> */}
            <DatePickerForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default TestScreen;
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Modal, StyleSheet } from 'react-native';
import filterapi from '../apis/filterapi';
import CheckboxGroup from '../components/CheckboxGroup';
import AppButton from '../components/AppButton';
import { showToast } from '../components/ToastMessage';
const _ = require('lodash');

const convertToArray = (data) => {
  return _.mapValues(data, value => {
    if (_.isArray(value)) {
      if (value.length > 0 && _.isObject(value[0]) && 'name' in value[0]) {
        return _.map(value, 'name');
      }
      if (value.length > 0 && _.isObject(value[0]) && 'shape' in value[0]) {
        return _.map(value, 'shape');
      }
      return value;
    }
    return value;
  });
};

function FilterScreen({ modalVisible, category_code, onClose }) {
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const filter = async () => {
    const result = await filterapi.filterProducts(category_code || "pscb");
    const options = convertToArray(result.data.data);
    setOptions(options);
    setSelectedOptions(_.mapValues(options, () => []));
  };

  const handleOptionChange = (category, option) => {
    setSelectedOptions(prevSelectedOptions => {
      const isSelected = prevSelectedOptions[category]?.includes(option);
      const newOptions = isSelected
        ? prevSelectedOptions[category].filter(item => item !== option)
        : [...prevSelectedOptions[category], option];
      return { ...prevSelectedOptions, [category]: newOptions };
    });
  };

  const handleApplyChange = () => {
    console.log(selectedOptions);
    onClose();
    showToast('success', 'Filters Applied', 'Your selected filters have been applied successfully.');
  };

  useEffect(() => {
    filter();
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Filter Options</Text>
        {Object.keys(options).map(category => (
          <View key={category}>
            <Text style={styles.categoryText}>{category}</Text>
            <ScrollView
              key={`scroll${category}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollViewContent}>
              <CheckboxGroup
                options={options[category]}
                selectedOptions={selectedOptions[category] || []}
                onChange={(option) => handleOptionChange(category, option)}
                multiselect={true}
              />
            </ScrollView>
          </View>
        ))}
        <AppButton title={"Apply changes"} onPress={handleApplyChange} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center"
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
    marginTop: 10,
  },
});

export default FilterScreen;

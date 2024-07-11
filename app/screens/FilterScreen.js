import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import filterapi from '../apis/filterapi';
import CheckboxGroup from '../components/CheckboxGroup';
import AppButton from '../components/AppButton';
import { showToast } from '../components/ToastMessage';
import _ from 'lodash';

// Mapping objects
const availabilityMapping = ["Make To Order", "Available"];
const metalsMapping = ["Platinum", "Gold", "Platinum + Rose Gold"];
const gendersMapping = { female: 'F', male: 'M' };

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

const getNonEmptyFilters = (options) => {
  return _.pickBy(options, optionArray => !_.isEmpty(optionArray));
};

function FilterScreen({ modalVisible, category_code, onClose, onset }) {
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [hasSelectedOptions, setHasSelectedOptions] = useState(false); // State to track if any option is selected
  const [loading, setLoading] = useState(false); // State to track loading

  const filter = async () => {
    setLoading(true); // Set loading to true when starting API call
    try {
      const result = await filterapi.filterProducts(category_code);
      const options = convertToArray(result.data.data);
      setOptions(options);
      setSelectedOptions(_.mapValues(options, () => []));
    } catch (error) {
      console.error("Error fetching filter options: ", error);
    } finally {
      setLoading(false); // Set loading to false when API call is finished
    }
  };

  const handleOptionChange = (category, option) => {
    setSelectedOptions(prevSelectedOptions => {
      const isSelected = prevSelectedOptions[category]?.includes(option);
      const newOptions = isSelected
        ? prevSelectedOptions[category].filter(item => item !== option)
        : [...prevSelectedOptions[category], option];

      const updatedSelectedOptions = { ...prevSelectedOptions, [category]: newOptions };

      // Update the hasSelectedOptions state
      setHasSelectedOptions(
        Object.values(updatedSelectedOptions).some(optionArray => optionArray.length > 0)
      );

      return updatedSelectedOptions;
    });
  };

  const handleApplyChange = () => {
    onset(convertSelectedOptions(selectedOptions));
    onClose();
    showToast('success', 'Filters Applied', 'Your selected filters have been applied successfully.');
  };

  const handleCloseWindow = () => {
    onClose();
  };

  useEffect(() => {
    if (modalVisible) {
      filter();
    }
  }, [modalVisible]);

  const convertSelectedOptions = (options) => {
    const convertedOptions = {};
    if (options.availability) {
      convertedOptions.availability = options.availability.map(value => availabilityMapping.indexOf(value)).join(',');
    }
    if (options.metals) {
      convertedOptions.metals = options.metals.map(value => metalsMapping.indexOf(value) + 1).join(',');
    }
    if (options.genders) {
      convertedOptions.genders = options.genders.map(value => gendersMapping[value.toLowerCase()]).join(',');
    }
    // Convert the rest of the options
    _.forEach(_.omit(options, ['availability', 'metal', 'gender']), (value, key) => {
      convertedOptions[key] = Array.isArray(value) ? value.join(',') : value;
    });

    return Object.fromEntries(
      Object.entries(convertedOptions).filter(([key, value]) => value !== "")
    );
  };

  const nonEmptyOptions = getNonEmptyFilters(options);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Filter Options</Text>
        {loading ? (
          <Text style={styles.loadingText}>loading...</Text>
        ) : _.isEmpty(nonEmptyOptions) ? (
          <Text style={styles.noFiltersText}>No filters available.</Text>
        ) : (
          Object.keys(nonEmptyOptions).map(category => (
            <View key={category}>
              <Text style={styles.categoryText}>{category}</Text>
              <ScrollView
                key={`scroll${category}`}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollViewContent}
              >
                <CheckboxGroup
                  options={nonEmptyOptions[category]}
                  selectedOptions={selectedOptions[category] || []}
                  onChange={(option) => handleOptionChange(category, option)}
                  multiselect={true}
                />
              </ScrollView>
            </View>
            
          ))
        )}
        <AppButton title={hasSelectedOptions ? "Apply changes" : "Close the window"} onPress={hasSelectedOptions ? handleApplyChange : handleCloseWindow} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
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
  noFiltersText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  loadingText:{
    alignSelf: "center"
  }
});

export default FilterScreen;

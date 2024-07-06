import React from 'react';
import { View, Text } from 'react-native';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;

  return (
    <View>
      <Text>{category.name}</Text>
      {/* Render other details or nested components related to the category */}
    </View>
  );
};

export default CategoryScreen;

import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const AppSlider = ({ images }) => {

  return (
    <View style={styles.sliderContainer}>
      <Carousel
        width={width}
        height={250}
        data={images}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            source={{ uri: item.image_url }}
            resizeMode="contain"
          />
        )}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AppSlider;

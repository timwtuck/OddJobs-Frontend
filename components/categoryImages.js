import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const Cleaning = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Cleaning.png')} style={styles.image} />
    </View>
  );
};

export const Delivery = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Delivery.jpeg')} style={styles.image} />
    </View>
  );
};

export const DIY = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/DIY.png')} style={styles.image} />
    </View>
  );
};

export const Garden = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Garden.png')} style={styles.image} />
    </View>
  );
};

export const Pets = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Pets.webp')} style={styles.image} />
    </View>
  );
};

export const Shopping = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Shopping.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 100,
    marginVertical: 20,
  },
  // container: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  // },
});

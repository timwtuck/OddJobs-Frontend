import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const CircleLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 160,
    marginVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

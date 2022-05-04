import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const PostJobScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Post Job Screen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
  },
});

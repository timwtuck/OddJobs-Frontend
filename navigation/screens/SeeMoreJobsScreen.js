import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const SeeMoreJobsScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>See More Screen</Text>
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

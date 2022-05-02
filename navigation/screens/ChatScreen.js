import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const ChatScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Chat Screen</Text>
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainContainer from './navigation/MainContainer';
import Home from './navigation/screens/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Home styles={styles.mapBackground} /> */}
      <View style={styles.container}>
        <MainContainer />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'space-between',
  },
});

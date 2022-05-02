import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainContainer from './navigation/MainContainer';
import Home from './navigation/screens/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* 
      Here, I think we need to write some logic
      to show the login page(s) when user not
      logged in, or to show the rest of the App,
      i.e. the entire view that is immediately below.
      */}
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

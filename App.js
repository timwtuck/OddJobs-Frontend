import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Login Screen
import { LoginScreen } from './navigation/screens/LoginScreen';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

// Bottom Navigation Component
import BottomNavigation from './navigation/BottomNavigation';

export default function App() {
  /* eventually need to track login state here
  or in global context. In a use effect, when 
  the log in state changes, the app should trigger
  a useEffect reload and the user should either see 
  the login if their action was to log out, or the rest of
  the app if their action was to sign up or log in. */

  return (
    <SafeAreaProvider>
      {/* expo code starts */}
      <StatusBar style="auto" />
      {/* expo code ends */}
      {/* 
      Here, I think we need to write some logic
      to show the login page(s) when user not
      logged in, or to show the rest of the App,
      i.e. the entire view that is immediately below.
    */}

      {/* <LoginScreen /> */}

      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

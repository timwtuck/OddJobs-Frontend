import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Login Screen
import { LoginScreen } from './navigation/screens/LoginScreen';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

// Bottom Navigation Component
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import { HomeScreen } from './navigation/screens/HomeScreen';
import { PostJobScreen } from './navigation/screens/PostJobScreen';
import { SecondScreen } from './navigation/screens/SecondScreen';
import { EndPointsScreen } from './navigation/screens/EndPointsScreen';
import { SeeMoreJobsScreen } from './navigation/screens/SeeMoreJobsScreen';
import { FindAJobScreen } from './navigation/screens/FindAJobScreen';
import { JobLogScreen } from './navigation/screens/JobLogScreen';

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
        <Tab.Navigator
          initialRouteName={'Homer'}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === 'Homer') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === 'Secondary') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (rn === 'Endpoint') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (rn === 'Donuts') {
                iconName = focused ? 'bug' : 'bug-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Homer" options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
                <Stack.Screen
                  name="SeeMoreJobsScreen"
                  component={SeeMoreJobsScreen}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Secondary" component={SecondScreen} />
          <Tab.Screen name="Endpoint" options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="Endpoints" component={EndPointsScreen} />
                <Stack.Screen
                  name="FindAJobScreen"
                  component={FindAJobScreen}
                />
                <Stack.Screen name="JobLogScreen" component={JobLogScreen} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Donuts" component={PostJobScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

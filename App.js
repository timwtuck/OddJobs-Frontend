import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import { useEffect } from 'react/cjs/react.development';

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
import { SignupScreen } from './navigation/screens/SignupScreen';
import { LoginScreen } from './navigation/screens/LoginScreen';
import { EndPointsScreen } from './navigation/screens/EndPointsScreen';
import { SeeMoreJobsScreen } from './navigation/screens/SeeMoreJobsScreen';
import { FindAJobScreen } from './navigation/screens/FindAJobScreen';
import { JobScreen } from './navigation/screens/JobScreen';
import { JobLogScreen } from './navigation/screens/JobLogScreen';
import { ChatLogScreen } from './navigation/screens/ChatLogScreen';
import { JobChatScreen } from './navigation/screens/JobChatScreen';
import { MyAccountScreen } from './navigation/screens/MyAccountScreen';
import { EditMyAccountScreen } from './navigation/screens/EditMyAccountScreen';

export default function App() {
  /* eventually need to track login state here
  or in global context. In a use effect, when 
  the log in state changes, the app should trigger
  a useEffect reload and the user should either see 
  the login if their action was to log out, or the rest of
  the app if their action was to sign up or log in. */

    useEffect( () => {

     const ROOT_URL = 'https://oddjobs-test.herokuapp.com';
//  //   const socket = io.connect(ROOT_URL);


    const socket = io(ROOT_URL, {      
      transports: ['websocket']});   
    socket.connect(); 
    socket.on('connect', () => { 
    console.log('connected to socket server'); 
  }); 

  }, []);

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
                <Stack.Screen name="JobScreen" component={JobScreen} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Secondary" component={SignupScreen} />
          <Tab.Screen name="Endpoint" options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="Endpoints" component={EndPointsScreen} />
                <Stack.Screen
                  name="FindAJobScreen"
                  component={FindAJobScreen}
                />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
                <Stack.Screen name="JobScreen" component={JobScreen} />
                <Stack.Screen name="JobLogScreen" component={JobLogScreen} />
                <Stack.Screen name="ChatLogScreen" component={ChatLogScreen} />
                <Stack.Screen name="JobChatScreen" component={JobChatScreen} />
                <Stack.Screen
                  name="MyAccountScreen"
                  component={MyAccountScreen}
                />
                <Stack.Screen
                  name="EditMyAccountScreen"
                  component={EditMyAccountScreen}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Donuts" component={PostJobScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

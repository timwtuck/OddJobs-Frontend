import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react/cjs/react.development';
import {setUpSocket} from './utils.js';
import { useRoute } from '@react-navigation/native';
import {Button} from 'react-native';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

// Custom Fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

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
import { EditNameScreen } from './navigation/screens/EditNameScreen';
import { EditUsernameScreen } from './navigation/screens/EditUsernameScreen';
import { EditPostcodeScreen } from './navigation/screens/EditPostcodeScreen';

// global login context
export const AuthContext = React.createContext(null);
export const setAuthContext = React.createContext(null);

import io from 'socket.io-client';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  // Login State
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState(0);


  const onNewNotification = (fromUser) => {

    console.log(`notification from ${fromUser}`);
    setNotifications((n) => n + 1);
  }

  const sendNotification = (toUser) => {
// console.log(socket)
    if (!userId || !socket || !socket.connected)
      return;

    socket.emit('send', {from: userId, to: toUser});
  }

  useEffect(() => {
    console.log('socket changed')
 //   console.log(socket)
  }, [socket]);

  useEffect( () => {

    if(!userId){ // need userId to set up the socket
      // if socket already exists, disconnet it
      return;
    } 
    console.log(`Logged in as ${userId}`);

    setUpSocket(setSocket, userId, onNewNotification);
  }, [userId]);

  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!loggedIn) {
    return (
      <setAuthContext.Provider value={setLoggedIn}>
        <SafeAreaProvider>
          {/* expo code starts */}
          <StatusBar style="auto" />
          {/* expo code ends */}
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen
                name="loginScreen"
                component={LoginScreen}
                options={{ title: 'Log In' }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ title: 'Sign Up' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </setAuthContext.Provider>
    );
  } else if (loggedIn) {
    return (
      <AuthContext.Provider value={loggedIn}>
        <setAuthContext.Provider value={setLoggedIn}>
          <SafeAreaProvider>
            {/* expo code starts */}
            <StatusBar style="auto" />
            {/* expo code ends */}

            <NavigationContainer>
              <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === 'Endpoint') {
                      iconName = focused ? 'list' : 'list-outline';
                    } else if (rn === 'Chat') {
                      iconName = focused
                        ? 'chatbubbles'
                        : 'chatbubbles-outline';
                    } else if (rn === 'Account') {
                      iconName = focused ? 'person' : 'person-outline';
                    }
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                })}>
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ title: 'Home' }}
                      />
                      <Stack.Screen
                        name="PostJobScreen"
                        component={PostJobScreen}
                        options={{ title: 'Post a Job' }}
                      />
                      <Stack.Screen
                        name="SeeMoreJobsScreen"
                        component={SeeMoreJobsScreen}
                        options={{ title: 'See Jobs' }}
                      />
                      <Stack.Screen name="JobScreen" component={JobScreen} />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Endpoint" options={{ headerShown: false }}>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Endpoints"
                        component={EndPointsScreen}
                      />
                      <Stack.Screen
                        name="FindAJobScreen"
                        component={FindAJobScreen}
                      />
                      <Stack.Screen
                        name="SignupScreen"
                        component={SignupScreen}
                      />
                      <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                      />
                      <Stack.Screen
                        name="PostJobScreen"
                        component={PostJobScreen}
                      />
                      <Stack.Screen name="JobScreen" component={JobScreen} />
                      <Stack.Screen
                        name="JobLogScreen"
                        component={JobLogScreen}
                      />
                     <Stack.Screen name="ChatLogScreen" component={ChatLogScreen} initialParams= {{socket, sendNotification, setUser:setUserId}}/>
                      <Stack.Screen
                        name="JobChatScreen"
                        component={JobChatScreen}
                      />
                      <Stack.Screen
                        name="MyAccountScreen"
                        component={MyAccountScreen}
                      />
                      <Stack.Screen
                        name="EditNameScreen"
                        component={EditNameScreen}
                        setLoggedIn={setLoggedIn}
                      />
                      <Stack.Screen
                        name="EditUsernameScreen"
                        component={EditUsernameScreen}
                        setLoggedIn={setLoggedIn}
                      />
                      <Stack.Screen
                        name="EditPostcodeScreen"
                        component={EditPostcodeScreen}
                        setLoggedIn={setLoggedIn}
                      />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Chat" component={ChatLogScreen} />
                <Tab.Screen name="Account" component={MyAccountScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </setAuthContext.Provider>
      </AuthContext.Provider>
    );
  }
}

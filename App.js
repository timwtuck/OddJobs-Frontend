import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

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
import { SeeMoreJobsScreen } from './navigation/screens/SeeMoreJobsScreen';
import { JobLogScreen } from './navigation/screens/JobLogScreen';
import { JobScreen } from './navigation/screens/JobScreen';
import { ChatLogScreen } from './navigation/screens/ChatLogScreen';
import { JobChatScreen } from './navigation/screens/JobChatScreen';
import { MyAccountScreen } from './navigation/screens/MyAccountScreen';
import { EditNameScreen } from './navigation/screens/EditNameScreen';
import { EditUsernameScreen } from './navigation/screens/EditUsernameScreen';
import { EditPostcodeScreen } from './navigation/screens/EditPostcodeScreen';

import {
  setUpSocket,
  setNotificationState,
  updateUserMessages,
} from './utils.js';
import { getUserMessages } from './api';

// global login context
export const AuthContext = React.createContext(null);
export const setAuthContext = React.createContext(null);
export const SocketContext = React.createContext(null);
export const SetNotificationContext = React.createContext(null);
export const AllMessagesContext = React.createContext(null);
export const SetAllMessagesContext = React.createContext(null);

export default function App() {
  /// disable app warnings for demo video ///
  console.disableYellowBox = true;

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

  // Login, Socket and Notification State
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [messages, setMessages] = React.useState(null);

  const [notifications, setNotifications] = React.useState({
    headerShown: false,
    tabBarLabel: 'Messages',
  });

  const onNewNotification = fromUser => {
    setNotificationState(setNotifications, 1, false);
    updateUserMessages(setMessages, setNotifications, loggedIn._id);
  };

  React.useEffect(async () => {
    if (!loggedIn) {
      // need userId to set up the socket
      // if socket already exists, disconnect it
      return;
    }

    setUpSocket(setSocket, loggedIn._id, onNewNotification);
    updateUserMessages(setMessages, setNotifications, loggedIn._id);
  }, [loggedIn]);

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
          <NavigationContainer ref={navigationRef}>
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
                  tabBarStyle: {
                    backgroundColor: '#000',
                  },
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
                      <Ionicons name={iconName} size={size} color="#fff" />
                    );
                  },
                })}>
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {() => (
                    <AllMessagesContext.Provider value={messages}>
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
                        <Stack.Screen
                          name="JobScreen"
                          component={JobScreen}
                          options={{ title: 'Jobs' }}
                        />
                      </Stack.Navigator>
                    </AllMessagesContext.Provider>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Chat" options={notifications}>
                  {() => (
                    <SocketContext.Provider value={{ socket }}>
                      <SetNotificationContext.Provider value={setNotifications}>
                        <SetAllMessagesContext.Provider value={setMessages}>
                          <AllMessagesContext.Provider value={messages}>
                            <Stack.Navigator>
                              <Stack.Screen
                                name="ChatLogScreen"
                                component={ChatLogScreen}
                                options={{ title: 'Messages' }}
                              />
                              <Stack.Screen
                                name="JobChatScreen"
                                component={JobChatScreen}
                                options={{ title: '' }}
                              />
                              <Stack.Screen
                                name="JobScreen"
                                component={JobScreen}
                                options={{ title: 'Job' }}
                              />
                            </Stack.Navigator>
                          </AllMessagesContext.Provider>
                        </SetAllMessagesContext.Provider>
                      </SetNotificationContext.Provider>
                    </SocketContext.Provider>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Account" options={{ headerShown: false }}>
                  {() => (
                    <SocketContext.Provider value={{ socket }}>
                      <SetNotificationContext.Provider value={setNotifications}>
                        <SetAllMessagesContext.Provider value={setMessages}>
                          <AllMessagesContext.Provider value={messages}>
                            <Stack.Navigator>
                              <Stack.Screen
                                name="MyAccountScreen"
                                component={MyAccountScreen}
                                options={{ title: 'My Account' }}
                              />
                              <Stack.Screen
                                name="ChatLogScreen"
                                component={ChatLogScreen}
                                options={{ title: 'Messages' }}
                              />
                              <Stack.Screen
                                name="JobLogScreen"
                                component={JobLogScreen}
                                options={{ title: 'Jobs' }}
                              />
                              <Stack.Screen
                                name="EditNameScreen"
                                component={EditNameScreen}
                                options={{ title: 'Account' }}
                              />
                              <Stack.Screen
                                name="EditUsernameScreen"
                                component={EditUsernameScreen}
                                options={{ title: 'Account' }}
                              />
                              <Stack.Screen
                                name="EditPostcodeScreen"
                                component={EditPostcodeScreen}
                                options={{ title: 'Account' }}
                              />
                            </Stack.Navigator>
                          </AllMessagesContext.Provider>
                        </SetAllMessagesContext.Provider>
                      </SetNotificationContext.Provider>
                    </SocketContext.Provider>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </setAuthContext.Provider>
      </AuthContext.Provider>
    );
  }
}

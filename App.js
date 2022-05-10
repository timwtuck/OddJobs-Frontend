import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

import {setUpSocket} from './utils.js';

// global login context
export const AuthContext = React.createContext(null);
export const setAuthContext = React.createContext(null);
export const SocketContext = React.createContext(null);

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

  // Login, Socket and Notification State
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [inPrivateChat, setInPrivateChat] = React.useState(false);

  const [notifications, setNotifications] = React.useState({
    notifications: 0,
    displayOptions: 
      { 
        headerShown: false,
        tabBarLabel: "Messages",
      }
  });

  const onNewNotification = (fromUser) => {

    console.log('In chat>>> ', inPrivateChat)

    if (inPrivateChat){
      console.log('In Private chat, will ignore');
      return;
    }

    console.log(`notification from ${fromUser}`);

    // if no current notifications, add the tabBarBadge
      setNotifications((current) => {
        const newNotification = {...current};

        newNotification.notifications++;
        newNotification.displayOptions.tabBarBadge = 
          newNotification.notifications;
        
        return newNotification;
      });
  }

  React.useEffect( () => {

    if(!loggedIn){ // need userId to set up the socket
      // if socket already exists, disconnect it
      return;
    } 

   setUpSocket(setSocket, loggedIn._id, onNewNotification);
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
                      <Stack.Screen
                        name="ChatLogScreen"
                        component={ChatLogScreen}
                      />
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
                <Tab.Screen name="Chat" options={notifications.displayOptions}>
                 {() => (
                   <SocketContext.Provider value={{socket, setInPrivateChat}}>
                      <Stack.Navigator>
                        <Stack.Screen
                          name="ChatLogScreen"
                          component={ChatLogScreen}
                        />
                        <Stack.Screen
                          name="JobChatScreen"
                          component={JobChatScreen}
                        />
                        <Stack.Screen name="JobScreen" component={JobScreen} />
                      </Stack.Navigator>
                    </SocketContext.Provider>
                  )}
                  </Tab.Screen>
                <Tab.Screen name="Account" component={MyAccountScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </setAuthContext.Provider>
      </AuthContext.Provider>
    );
  }
}

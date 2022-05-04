import * as React from 'react';
import { View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';
import { ChatScreen } from './screens/ChatScreen';
import { FourthScreen } from './screens/FourthScreen';

// Screen Names
const HomeTab = 'Home';
const SecondTab = 'Second';
const ChatTab = 'Chat';
const FourthTab = 'Fourth';

// Bottom Nav
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={HomeTab}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === HomeTab) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === SecondTab) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === ChatTab) {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (rn === FourthTab) {
            iconName = focused ? 'bug' : 'bug-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={HomeTab}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name={SecondTab} component={SecondScreen} />
      <Tab.Screen name={ChatTab} component={ChatScreen} />
      <Tab.Screen name={FourthTab} component={FourthScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

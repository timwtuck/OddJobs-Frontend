import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import { Home } from './screens/Home';
import { SecondScreen } from './screens/SecondScreen';
import { ChatScreen } from './screens/ChatScreen';
import { FourthScreen } from './screens/FourthScreen';

// Screen Names
const homeName = 'Home';
const secondName = 'Second';
const chatName = 'Chat';
const fourthName = 'Fourth';

// Bottom Nav
const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === secondName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === chatName) {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (rn === fourthName) {
              iconName = focused ? 'bug' : 'bug-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={secondName} component={SecondScreen} />
        <Tab.Screen name={chatName} component={ChatScreen} />
        <Tab.Screen name={fourthName} component={FourthScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;

import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DestinationScreen from '../screens/DestinationScreen';
import RequestScreen from '../screens/RequestScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Home = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Home.Navigator>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Home.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{headerShown: false}}
      />
      <Home.Screen
        name="DestinationScreen"
        component={DestinationScreen}
        options={{headerShown: false}}
      />
    </Home.Navigator>
  );
}

import {View, Text} from 'react-native';
import React from 'react';
import StackNavigator from './StackNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNaviagtor() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

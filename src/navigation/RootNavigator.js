import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNaviagtor from './DrawerNaviagtor';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <DrawerNaviagtor />
    </NavigationContainer>
  );
}

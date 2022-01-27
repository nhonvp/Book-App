import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button
} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {OriginContextProvider} from './src/context/OriginContext';
import {DestinationContextProvider} from './src/context/DestinationContext';

const App = () => {
  return (
    <DestinationContextProvider>
    <OriginContextProvider>
      <RootNavigator/>
    </OriginContextProvider>
    </DestinationContextProvider>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

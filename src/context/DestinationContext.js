import {View, Text} from 'react-native';
import React, {createContext, useReducer} from 'react';
import {DestinationReducer} from '../reducers/reducers';

export const DestinationContext = createContext();

export function DestinationContextProvider(props) {
  const [destination, dispatchDestination] = useReducer(DestinationReducer, {
    latitude: null,
    longitude: null,
    address: '',
    name: '',
  });
  return (
    <DestinationContext.Provider value={{destination, dispatchDestination}}>
      {props.children}
    </DestinationContext.Provider>
  );
}

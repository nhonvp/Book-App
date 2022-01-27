import { View, Text } from 'react-native';
import React,{createContext,useReducer} from 'react';
import {OriginReducer} from  '../reducers/reducers'

export const OriginContext = createContext();


export function OriginContextProvider(props) {
  const[origin,dispatchOrigin] =useReducer(OriginReducer,{
    latitude:null,
    longitude:null,
    address:"",
    name:""
})
  return (
      <OriginContext.Provider
              value ={{origin,dispatchOrigin}}
          >
          {props.children}
      </OriginContext.Provider>
  );
}

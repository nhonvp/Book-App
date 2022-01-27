import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useRef, useContext, useState, useEffect} from 'react';
import {colors, parameters} from '../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {GOOGLE_MAP_API_KEY} from '@env'
import {OriginContext} from '../context/OriginContext';
import {DestinationContext} from '../context/DestinationContext';
import {Button} from 'react-native-paper';
navigator.geolocation = require('@react-native-community/geolocation');

export default function DestinationScreen({navigation,route}) {
  const [destination, setDestination] = useState(false);
  const {dispatchOrigin} = useContext(OriginContext);
  const {dispatchDestination} = useContext(DestinationContext);
  const {isdestination} = route.params;

  console.log(isdestination);
  const ref = useRef();
  // useEffect(() => {
  //   ref.current?.setAddressText('Some Text');
  // }, []);

  return (
    <View>
      <View style={styles.view2}>
        <View style={styles.view1}>
          <Icon
            name="arrow-left"
            color={colors.grey1}
            size={25}
            onPress={() => navigation.goBack()}
          />
        </View>

          <View style={{top: 25, alignItems: 'center'}}>
            <View style={styles.view3}>
              <Text style={{marginLeft: 5}}>For Someone</Text>
              <Icon name="chevron-down" color={colors.grey1} size={26} />
            </View>
          </View>
   
      </View>
      {isdestination === false && (
        <View>
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: colors.grey6,
              height: 50,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 15,
              borderWidth: 1,
              marginHorizontal: 15,
            }}
          />
          <Pressable
            style={{
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
            onPress={() => {
              dispatchOrigin({
                type: 'ADD_ORIGIN',
                payload: {
                  latitude: 11.02035,
                  longitude: 108.18174,
                  address: 'Bình Thuận',
                  name: 'Hàm Tân',
                },
              });
              setDestination(true);
              navigation.goBack();
            }}>
            <Text style={{color: 'white'}}>Origin</Text>
          </Pressable>
        </View>
      )}
      {isdestination === true && (
        <View>
          <TextInput />
          <Pressable
            style={{
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
            onPress={() => {
              dispatchDestination({
                type: 'ADD_DESTINATION',
                payload: {
                  latitude: 16.054407,
                  longitude: 108.202164,
                  address: 'Đà Nẵng',
                  name: 'Đà Nẵng',
                },
              });
              setDestination(false);
              navigation.goBack();
            }}>
            <Text style={{color: 'white'}}>Destination</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: parameters.statusBarHeight,
  },
  view1: {
    position: 'absolute',
    top: 25,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // zIndex: 10,
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    height: 30,
    // zIndex: 10,
  },
  view2: {
    backgroundColor: colors.white,
    // zIndex: 4,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom : 20
  },
  view24: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  view25: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  flatlist: {
    marginTop: 20,
    zIndex: 17,
    elevation: 8,
  },
});
const autoComplete = {
  // textInput: {
  //   backgroundColor: colors.grey6,
  //   height: 50,
  //   borderRadius: 5,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   fontSize: 15,
  //   flex: 1,
  //   borderWidth: 1,
  //   marginHorizontal: 15,
  // },
  // container: {
  //   paddingTop: 20,
  //   flex: 1,
  //   backgroundColor: colors.white,
  // },
  // textInputContainer: {
  //   flexDirection: 'row',
  // },
};

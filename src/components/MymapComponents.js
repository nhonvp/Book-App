import {View, Text, StyleSheet, Image} from 'react-native';
import React,{useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {mapStyle} from '../global/mapStyle';
import {colors, parameters} from '../global/styles';
import MapViewDirections from 'react-native-maps-directions';

export default function MymapComponents(props) {
  console.log(props);
  useEffect(() => {
    // setTimeout(()=>{
    //   if(props.userDestination.latitude !== null){
    //     this._map.current.fitToCoordinates(
    //       [this.props.userOrigin,this.props.userDestination],{
    //         edgePadding:{top:450,right:50,left:50,bottom:350},
    //         animated:true
    //       }
    //     )
    //   }
    // },500)
  
    return () => {
    };
  }, []);
  
  return (
    <View>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        // showsUserLocation={true}
        >
        {props.UserOrigin.latitude != null && (
          <Marker
            coordinate={{
              latitude: props.UserOrigin.latitude,
              longitude: props.UserOrigin.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Image
              source={require('../assets/location.png')}
              style={styles.markerOrigin2}
              resizeMode="cover"
            />
          </Marker>
        )}
        {
          props.UserDestination.latitude != null && 
          <Marker
            coordinate={{
              latitude: props.UserDestination.latitude,
              longitude: props.UserDestination.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Image
              source={require('../assets/location.png')}
              style={styles.markerDestination}
              resizeMode="cover"
            />
          </Marker>
        }
        {props.UserDestination.latitude != null && 
          <MapViewDirections
            origin={props.UserOrigin}
            destination={props.UserDestination}
            apikey='AIzaSyAf0F2J34DZ-tbuZHx5Hga5aVUdwXfldBI'
            strokeWidth={3}
            strokeColor="hotpink"
          />
        }
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  markerWrapOrigin: {
    //  alignItems: "center",
    // justifyContent: "center",
    width: 40,
    height: 20,
    // marginTop:0
  },
  markerOrigin: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  destination: {
    width: 20,
    height: 20,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  view1: {
    width: 7,
    height: 7,
    backgroundColor: colors.white,
  },
  markerDestination: {
    width: 16,
    height: 16,
  },

  markerOrigin2: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  car: {
    paddingTop: 0,
    width: 40,
    height: 20,
  },

  view2: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    zIndex: 8,
  },

  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginRight:15,
    //backgroundColor:"white",
    //paddingHorizontal:2,
    paddingVertical: 2,
    //borderRadius:20
  },

  view4: {
    position: 'absolute',
    top: 50,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    zIndex: 8,
  },

  location: {
    width: 20,
    height: 20,
    borderRadius: 9,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  view9: {width: 6, height: 6, borderRadius: 4, backgroundColor: 'white'},
});

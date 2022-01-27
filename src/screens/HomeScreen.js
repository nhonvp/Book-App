import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,PermissionsAndroid
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, parameters} from '../global/styles';
import {filterData, carsAround} from '../global/data';
import MapView, {Marker} from 'react-native-maps';
import {mapStyle} from '../global/mapStyle';
import RNLocation from 'react-native-location';
import Geolocation from 'react-native-geolocation-service';

const SCREEN_WIDTH = Dimensions.get('window').width;

const InitialState = {
  latitude: 51.507351,
  longitude: -0.127758,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function HomeScreen({navigation}) {
  const [CurrentPosition, setCurrentPosition] = useState(InitialState);
  let mymap;
  const requestPermissions = async() =>{
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
       authorizationLevel: 'whenInUse',
     });
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position));
        const {latitude,longitude,latitudeDelta,longitudeDelta} = position.coords;
        setCurrentPosition({...CurrentPosition,latitude : latitude,longitude : longitude})
        // console.log(CurrentPosition);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    requestPermissions();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#2058c0" translucent={true} />
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Icon
            name="bars"
            color={colors.white}
            size={40}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </View>
      </View>
      <ScrollView bounces={false}>
        <View style={styles.home}>
          <Text style={styles.text1}>Destress your commute</Text>
          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>
                Read a book.Take a nap. Stare out the window
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RequestScreen', {state: 0});
                }}>
                <View style={styles.button1}>
                  <Text style={styles.button1Text}>Ride with Uber</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={require('../assets/uberCar.png')}
              />
            </View>
          </View>
        </View>

        <View>
          <FlatList
            numRows={4}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.view2}>
                  <Image style={styles.image2} source={item.image} />
                </View>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.view3}>
          <Text style={styles.text3}> Where to ?</Text>
          <View style={styles.view4}>
            <Icon name="clock-o" color={colors.grey1} size={26} />
            <Text style={{marginLeft: 5}}>Now</Text>
            <TouchableOpacity style={{marginLeft: 5}}>
              <Icon name="chevron-down" color={colors.grey1} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view5}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon name="map-marker" color={colors.black} size={22} />
            </View>
            <View>
              <Text style={{fontSize: 18, color: colors.black}}>
                32 Olivia Rd
              </Text>
              <Text style={{color: colors.grey3}}>
                Klipfontein 83-Ir, Boksburg
              </Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              color={colors.grey}
              size={26}
            />
          </View>
        </View>

        <View style={styles.view5}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon name="map-marker" color={colors.black} size={22} />
            </View>
            <View>
              <Text style={{fontSize: 18, color: colors.black}}>
                32 Olivia Rd
              </Text>
              <Text style={{color: colors.grey3}}>
                Klipfontein 83-Ir, Boksburg
              </Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              color={colors.grey}
              size={26}
            />
          </View>
        </View>

        <Text style={styles.text4}> Around you</Text>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MapView
            ref = {ref => mymap = ref}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            customMapStyle={mapStyle}
            initialRegion={CurrentPosition}>
            {
                carsAround.map((item,index)=>{
                  return(
                    <Marker coordinate={item} key={index} >
                    <Image
                          source={require('../assets/carMarker.png')}
                          style={styles.carsAround}
                          resizeMode="cover"
                        />
                    </Marker>
                  )
                })
            }
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    alignItems: 'flex-start',
  },
  icon1: {marginLeft: 10, marginTop: 15},
  text1: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
  },
  view1: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },
  view8: {flex: 4, marginTop: -25},
  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  home: {
    backgroundColor: colors.blue,
    paddingLeft: 20,
  },
  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  card: {
    alignItems: 'center',
    margin: SCREEN_WIDTH / 22,
  },
  view2: {marginBottom: 5, borderRadius: 15, backgroundColor: colors.grey6},
  image2: {height: 60, width: 60, borderRadius: 30},

  view3: {
    flexDirection: 'row',
    marginTop: 5,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  text3: {marginLeft: 15, fontSize: 20, color: colors.black},
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
  view5: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 25,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    flex: 1,
  },
  view6: {
    alignItems: 'center',
    flex: 5,
    flexDirection: 'row',
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  text4: {fontSize: 20, color: colors.black, marginLeft: 20, marginBottom: 20},
  map: {
    height: 500,
    marginVertical: 0,
    width: SCREEN_WIDTH * 0.92,
  },
  carsAround: {
    width: 28,
    height: 14,
  },
});

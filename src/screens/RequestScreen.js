import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {colors, parameters} from '../global/styles';
import MymapComponents from '../components/MymapComponents';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OriginContext} from '../context/OriginContext';
import {DestinationContext} from '../context/DestinationContext';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetSectionList,
} from '@gorhom/bottom-sheet';
import {rideData, carTypeData} from '../global/data';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function RequestScreen({navigation}) {
  const {origin, dispatchOrigin} = useContext(OriginContext);
  const [Isdisplaybottom, setIsdisplaybottom] = useState(false);
  const [UserOrigin, setUserOrigin] = useState({
    latitude: origin.latitude,
    longitude: origin.longitude,
  });

  const {destination, dispatchDestination} = useContext(DestinationContext);
  const [UserDestination, setUserDestination] = useState({
    latitude: destination.latitude,
    longitude: destination.longitude,
  });

  const bottomsheet = useRef();
  const snapPoints = useMemo(() => ['5%', '50%'], []);
  const handleSheetChanges = useCallback(index => {}, []);

  const renderFlatListItems = ({item}) => {
    return (
      <View>
        <View style={styles.view10}>
          <View style={styles.view11}>
            <Icon
              type="material-community"
              name="clock-o"
              color={colors.white}
              size={18}
            />
          </View>
          <View>
            <Text style={{fontSize: 15, color: colors.grey1}}>
              {item.street}
            </Text>
            <Text style={{color: colors.grey4}}>{item.area}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFlastListItemCar = ({item, index}) => {
    return (
      <View key={index} style={styles.carCard}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 15}}>
          {item.title}
        </Text>
        <View>
          {item.data.map(car => {
            return (
              <View style={styles.cardDetails}>
                <Image source={car.image} style={styles.carImage} />
                <View style={styles.cardDetailsSub}>
                  <Text
                    style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                    {car.name}
                  </Text>
                  <Text
                    style={{fontSize: 15, fontWeight: '300', color: 'grey'}}>
                    {car.time}
                  </Text>
                  <Text
                    style={{fontSize: 15, fontWeight: '300', color: 'grey'}}>
                    {car.note}
                  </Text>
                </View>
                <View style={styles.carDetailsPrice}>
                  <Text style={{fontSize: 18, color: 'black'}}>
                    $ {(car.price * 0.9).toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'grey',
                      textDecorationLine: 'line-through',
                    }}>
                    $ {car.price}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  useEffect(() => {
    setUserOrigin({latitude: origin.latitude, longitude: origin.longitude});
    setUserDestination({
      latitude: destination.latitude,
      longitude: destination.longitude,
    });
    return () => {};
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Icon
          name="arrow-left"
          color={colors.grey1}
          size={32}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.view2}>
        <TouchableOpacity>
          <View style={styles.view3}>
            <Text style={{marginLeft: 5}}>For Someone</Text>
            <Icon name="chevron-down" color={colors.grey1} size={20} />
          </View>
        </TouchableOpacity>

        <View style={styles.view4}>
          <View>
            <Image
              style={styles.image1}
              source={require('../assets/transit.png')}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DestinationScreen', {isdestination: false})
              }>
              <View style={styles.view6}>
                <Text style={styles.text1}>{origin.address}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.view7}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DestinationScreen', {
                    isdestination: true,
                  })
                }>
                <View style={styles.view5}>
                  <Text style={styles.text10}>{destination.address}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.view8}>
                <MaterialCommunityIcons
                  name="plus-thick"
                  color={colors.black}
                  size={25}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <MymapComponents
        UserOrigin={UserOrigin}
        UserDestination={UserDestination}
      />

      <BottomSheet
        ref={bottomsheet}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {Isdisplaybottom === true && (
          <BottomSheetFlatList
            data={rideData}
            renderItem={renderFlatListItems}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={styles.view10}>
                <View style={styles.view11}>
                  <Icon
                    type="material-community"
                    name="star"
                    color={colors.white}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={styles.text9}>Saved Places</Text>
                </View>
              </View>
            }
            ListFooterComponent={
              <View>
                <View style={styles.view10}>
                  <View style={styles.view11}>
                    <Icon
                      type="material-community"
                      name="map-marker"
                      color={colors.white}
                      size={20}
                    />
                  </View>
                  <View>
                    <Text style={styles.text9}>Set location on map</Text>
                  </View>
                </View>
                <View style={styles.view10}>
                  <View style={styles.view11}>
                    <Icon
                      type="material-community"
                      name="skip-next"
                      color={colors.white}
                      size={20}
                    />
                  </View>
                  <View>
                    <Text style={styles.text9}>Enter destination later</Text>
                  </View>
                </View>
              </View>
            }></BottomSheetFlatList>
        )}
        <BottomSheetFlatList
          data={carTypeData}
          keyExtractor={(item, index) => item.id}
          renderItem={renderFlastListItemCar}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={
            <View style={{flexDirection : "row" ,justifyContent : "center",alignItems : "center",paddingHorizontal : 5,marginTop : 20,marginBottom:20}}>
              <TouchableOpacity style={{backgroundColor : 'black',height : 50,width : 280}}>
                <Text style={{color : 'white',textAlign:"center",fontSize : 20,marginTop : 10}}>Confirm Uber Go</Text>
              </TouchableOpacity>
              <View style={{backgroundColor : 'grey',height : 50,width : 50,justifyContent : "center",alignItems : "center",marginLeft : 10}}>
                <Icon name="bookmark" size={24} style={{alignItems : "center"}}/>
              </View>
            </View>
          }
        />
      </BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: parameters.statusBarHeight},
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 2,
    zIndex: 8,
  },

  view2: {
    height: SCREEN_HEIGHT * 0.21,
    alignItems: 'center',
    zIndex: 5,
    backgroundColor: colors.white,
  },

  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,

    zIndex: 10,
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  view6: {
    backgroundColor: colors.grey6,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.grey1,
  },

  image1: {height: 70, width: 30, marginRight: 10, marginTop: 10},
  view7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view8: {
    marginLeft: 10,
  },
  view10: {
    alignItems: 'center',
    flex: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: colors.grey5,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  view11: {
    backgroundColor: colors.grey,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 15,
  },

  contentContainer: {
    backgroundColor: 'white',
  },

  view12: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey4,
  },

  text2: {
    fontSize: 18,
    color: colors.grey1,
  },
  text3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    marginRight: 5,
  },

  text4: {color: colors.grey2, marginTop: 4},

  view13: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  button1: {
    height: 40,
    width: 100,
    backgroundColor: colors.grey6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  button2: {
    height: 50,
    backgroundColor: colors.grey10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },

  button1Text: {
    fontSize: 17,
    marginTop: -2,
    color: colors.black,
  },

  button2Text: {
    color: colors.white,
    fontSize: 23,
    marginTop: -2,
  },

  view14: {
    alignItems: 'center',
    flex: 5,
    flexDirection: 'row',
  },
  view15: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  view16: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  text5: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 3,
    fontWeight: 'bold',
    paddingBottom: 1,
  },

  view19: {flex: 1.7, alignItems: 'flex-end'},

  icon: {paddingBottom: 2},

  image2: {height: 60, width: 60},

  view20: {marginRight: 10},

  text6: {
    fontSize: 15,
    color: colors.black,
    fontWeight: 'bold',
  },

  view21: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 15,
  },

  view22: {
    alignItems: 'center',
    marginBottom: -20,
  },

  sectionHeaderContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingLeft: 15,
  },

  text7: {
    fontSize: 28,
    color: colors.black,
    marginRight: 5,
  },

  text8: {
    fontSize: 15,
    color: colors.grey2,
    textDecorationLine: 'line-through',
  },

  button3: {
    height: 60,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 110,
    marginBottom: 10,
  },

  view23: {
    flexDirection: 'row',
    backgroundColor: colors.cardbackground,
    // elevation:10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    height: 80,
  },

  button2Image: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey6,
    marginBottom: 10,
  },
  text9: {fontSize: 15, color: colors.grey1},

  map: {
    marginVertical: 0,
    width: SCREEN_WIDTH,
    zIndex: -1,
  },

  centeredView: {
    zIndex: 14,
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 16,
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
  },

  text10: {color: colors.grey2, paddingLeft: 10},

  carCard: {
    paddingHorizontal: 15,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
  carImage: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    height: 55,
    width: 60,
    elevation: 5,
    resizeMode: 'cover',
  },
  cardDetailsSub: {
    flex: 1,
    marginHorizontal: 15,
  },
  carDetailsPrice: {

  },
});

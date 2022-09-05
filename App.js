import React, {useEffect, useState} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import MapView, {Marker} from 'react-native-maps'; // api AIzaSyDQZV9qz4b5pj6PeD361ntTnxx6zZQbSlc
import Toggle from 'react-native-toggle-element';
import luas from './luas.json';
import train from './train.json';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [destination, setDestination] = useState([]);
  const [mode, setMode] = useState('Train');
  const [stations, setStations] = useState([]);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onSelectedItem = item => {
    console.log('Destination :', item);
    setDestination([{lat: item.lat, long: item.long}]);
  };

  const luasData = new Array();
  const trainData = new Array();

  const onSelectedMode = item => {
    toggleSwitch(item);
    setMode(true ? 'Train' : 'Luas');
    console.log('Mode', mode);
  };

  useEffect(() => {
    setMode(isEnabled ? 'Luas' : 'Train');
    console.log('Mode ', mode);
  }, [isEnabled]);
  // Set data set for stations
  useEffect(() => {
    luas.forEach((item, index) => {
      luasData.push({
        id: index,
        title: item.__text,
        lat: parseFloat(item._lat),
        long: parseFloat(item._long),
      });
    });
    train.forEach((item, index) => {
      trainData.push({
        id: index,
        title: item.StationDesc,
        lat: parseFloat(item.StationLatitude),
        long: parseFloat(item.StationLongitude),
      });
    });
    setStations(mode == 'Train' ? trainData : luasData);
  }, [mode]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <View style={styles.toggle}>
        <Toggle //https://github.com/mymai91/react-native-toggle-element
          //value={toggleValue}
          onPress={newState => onSelectedMode(newState)}
          leftTitle="Luas"
          rightTitle="Train"
          trackBar={{
            padding: 20,
            activeBackgroundColor: 'white',
            inActiveBackgroundColor: 'white',
            width: 100,
            height: 30,
          }}
        />
        <Text>{mode}</Text>
      </View>

      <View style={styles.searchBar}>
        <View style={styles.leftSearchBar}>
          <AutocompleteDropdown
            textInputProps={{
              placeholder: 'Select Destination...',
            }}
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            onSelectItem={item => {
              if (item !== null) {
                onSelectedItem(item);
              }
            }}
            dataSet={stations}
          />
        </View>
        <View style={styles.rightSearchBar}></View>
      </View>
      <View></View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.34685,
            longitude: -6.261498,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          userInterfaceStyle={'dark'}
          showsUserLocation
          customMapStyle={mapStyle}>
          <Marker
            coordinate={{
              latitude: 53.34835,
              longitude: -6.23714722222222,
            }}
            title={'You are here'}
            description={'5 minutes to destination'}
          />
          {destination.length > 0 && (
            <Marker
              coordinate={{
                latitude: destination[0].lat,
                longitude: destination[0].long,
              }}
              title={destination.title}
              description={'Desc'}
            />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 3,
    margin: 20,
    marginTop: 5,
  },
  leftSearchBar: {
    padding: 1,
    flex: 8,
  },
  rightSearchBar: {},
  toggle: {
    paddingLeft: 5,
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
  },
});

export default App;

var mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

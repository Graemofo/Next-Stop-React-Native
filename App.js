import React, {useEffect, useState} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import MapView from 'react-native-maps'; // api AIzaSyDQZV9qz4b5pj6PeD361ntTnxx6zZQbSlc
import Toggle from 'react-native-toggle-element';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';

const App = () => {
  const [toggleValue, setToggleValue] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState('Luas');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onSelectedItem = item => {
    console.log(item);
  };

  useEffect(() => {
    setMode(isEnabled ? 'Luas' : 'Train');
    console.log('Mode ', mode);
  }, [isEnabled]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <View style={styles.toggle}>
        <Toggle //https://github.com/mymai91/react-native-toggle-element
          value={toggleValue}
          onPress={newState => setToggleValue(newState)}
          leftTitle="Luas"
          rightTitle="Train"
          leftComponent={<Text fill={'black'}>Luas</Text>}
          rightComponent={<Text fill={'black'}>Train</Text>}
          trackBar={{
            padding: 20,
            activeBackgroundColor: 'white',
            inActiveBackgroundColor: 'white',
            width: 100,
            height: 30,
          }}
        />
      </View>

      <View style={styles.searchBar}>
        <View style={styles.leftSearchBar}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            onSelectItem={item => {
              onSelectedItem(item);
            }}
            dataSet={[
              {id: '1', title: 'Alpha'},
              {id: '2', title: 'Beta'},
              {id: '3', title: 'Gamma'},
              {id: '4', title: 'Test'},
            ]}
          />
        </View>
        <View style={styles.rightSearchBar}>
          {/* https://reactnative.dev/docs/switch */}
          {/* <Switch
            ios_backgroundColor={{false: '#3e3e3e', true: '#3e3e3e'}}
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}

          {/* <Text style={{color: 'white'}}>{mode}</Text> */}
        </View>
      </View>
      <View></View>
      <View style={styles.mapContainer}>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.34685,
            longitude: -6.261498,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          userInterfaceStyle={'dark'}
          showsUserLocation
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    zIndex: 1000,
    flexDirection: 'row',
    padding: 5,
    margin: 20,
    marginTop: 5,
  },
  leftSearchBar: {
    padding: 1,
    flex: 8,
  },
  rightSearchBar: {},
  toggle: {
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
  },
});

export default App;

import React, {useState} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import MapView from 'react-native-maps'; // api AIzaSyDQZV9qz4b5pj6PeD361ntTnxx6zZQbSlc
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';

const App = () => {
  const [mode, setMode] = useState('Luas');
  const toggleSwitch = () =>
    setMode(prev => (prev == 'Luas' ? 'Train' : 'Luas'));
  console.log(mode);
  const onSelectedItem = item => {
    console.log('Item ', item);
  };
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
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
          <Switch
            // trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={mode ? 'Luas' : 'Train'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={mode}
          />
          <Text style={{color: 'white'}}>{mode}</Text>
        </View>
      </View>
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
        />
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
    flexDirection: 'row',
    padding: 5,
    margin: 20,
  },
  leftSearchBar: {
    padding: 1,

    flex: 7,
  },
  rightSearchBar: {
    padding: 10,
    flex: 1,
  },
});

export default App;

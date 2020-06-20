import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from '../components/Spacer';

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  console.log('[Map] locations: ', locations.length);

  // if no current location, return spinner in waiting screen.
  if (!currentLocation) {
    return (
      <View style={styles.findingContainer}>
        <Spacer>
          <Text style={styles.findingMessage}>Finding your location...</Text>
        </Spacer>
        <ActivityIndicator size="large" style={styles.findingSpinner} />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(0,	19,	218, 1.0)"
        fillColor="rgba(0,	19,	218, 0.3)"
      />
      {/* pull off the coords property */}
      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        strokeWidth={4}
        strokeColor="rgba(0,	19,	218	, 1.0)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  findingContainer: {
    height: 300,
  },
  findingMessage: {
    textAlign: 'center',
  },
  findingSpinner: {
    marginTop: 30,
  },
});

export default Map;

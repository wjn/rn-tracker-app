import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Polyline, MapViewAnimated } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';
import PageHeading from '../components/PageHeading';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  /**
   * return the track present in state (`t`) that has the `_id` passed in from
   * the TrackListScreen and assign it to the const `track`.
   *
   * CONCERN: All tracks for a user are in state at this point. Over time, this
   * seems untenable. E.g., User has been using the app for 2 years almost daily.
   * Do we really want to fetch 700 full track records from the DB in order to
   * show the details for a single record?
   *
   * TODO: refactor the Map component to be flexible enough to serve the needs
   * of this screen and that of CreateTrack.
   */
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <>
      <PageHeading headerText={track.name} />
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}>
        <Polyline
          strokeWidth={4}
          strokeColor="rgba(0,	19,	218	, 1.0)"
          coordinates={track.locations.map((loc) => loc.coords)}
        />
      </MapView>
    </>
  );
};

TrackDetailScreen.navigationOptions = {
  title: 'Track Detail',
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;

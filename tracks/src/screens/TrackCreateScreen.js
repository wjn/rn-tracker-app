// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import PageHeading from '../components/PageHeading';
import Spacer from '../components/Spacer';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { isRecording },
    addLocation,
  } = useContext(LocationContext);

  /**
   * addLocation takes location and isRecording as an argument
   * state object comes from LocationContext
   *  */

  const callback = useCallback(
    (location) => {
      addLocation(location, isRecording);
    },
    [isRecording]
  );

  // pass off location to the useLocation Hook
  const [err] = useLocation(isFocused || isRecording, callback);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <PageHeading headerText="Create a Track" />
      <Spacer />
      <Map />
      {err ? <Text>Please enable location services</Text> : null}

      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

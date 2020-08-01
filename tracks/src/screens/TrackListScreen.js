import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  /**
   * TODO:
   *    - Only sort the data needed for this screen. Currently it's pulling in
   *      all tracks and locations. We only need the track name and the date
   *      created.
   *
   *    - Sort by date descending so that most recent tracks are at the top
   *
   *    - Group by date: All tracks from YYYY-MM-DD would have a heading over
   *      them indicating they were from that day, then a break for the heading
   *      of the next day and the tracks that occured then. If there were no
   *      tracks for a given day, there should be no heading for it.
   */
  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackDetail', {
                  _id: item._id,
                })
              }>
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks',
};

const styles = StyleSheet.create({});

export default TrackListScreen;

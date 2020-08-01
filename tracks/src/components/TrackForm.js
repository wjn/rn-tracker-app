import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
  const {
    state: { name, isRecording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <Spacer>
      <Input
        value={name}
        onChangeText={changeName}
        placeholder="Enter Track Name"
        leftIcon={{ type: 'feather', name: 'tag' }}
      />
      <Spacer />
      {isRecording ? (
        <Button
          title="Stop"
          onPress={stopRecording}
          buttonStyle={styles.stopRecording}
        />
      ) : (
        <Button
          title="Start Recording"
          onPress={startRecording}
          buttonStyle={styles.startRecording}
        />
      )}
      {!isRecording && locations.length ? (
        <>
          <Spacer />
          <Button
            title="Save"
            buttonStyle={styles.saveRecording}
            onPress={saveTrack}
          />
        </>
      ) : null}
    </Spacer>
  );
};

const styles = StyleSheet.create({
  startRecording: {
    backgroundColor: 'blue',
  },
  stopRecording: {
    backgroundColor: 'red',
  },
  saveRecording: {
    backgroundColor: 'green',
  },
});

export default TrackForm;

import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from '../components/Spacer';

const TrackForm = () => {
  const {
    state: { name, isRecording },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  return (
    <Spacer>
      <Input
        leftIcon={{ type: 'feather', name: 'tag' }}
        placeholder="Enter Track Name"
        onChangeText={changeName}
      />
      <Spacer />

      {isRecording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
    </Spacer>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Spacer>
        <Text style={styles.heading} h3>
          Sign Up for Tracker
        </Text>
      </Spacer>
      <Spacer />
      <Input label="Email" />
      <Spacer />
      <Input label="Password" />
      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
  },
});

export default SignupScreen;

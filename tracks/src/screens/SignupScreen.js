import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.heading} h3>
          Sign Up for Tracker
        </Text>
      </Spacer>
      <Spacer />

      {/*   onChangeText = (newEmail = setEmail(newEmail)) is the equivalent of
            onChangeText = setEmail
      */}
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'feather', name: 'mail' }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        leftIcon={{ type: 'feather', name: 'lock' }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    // Hide the header for this screen
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
  heading: {
    textAlign: 'center',
  },
});

export default SignupScreen;

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import PageHeading from './PageHeading';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * TODO: email fields should initiate email keyboard in ios
   */

  return (
    <>
      <PageHeading headerText={headerText} />
      <Spacer />

      {/*   
        Email and Password Inputs

        onChangeText = (newEmail = setEmail(newEmail)) is the equivalent of
        onChangeText = setEmail  
      */}

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'feather', name: 'mail' }}
        autoCompleteType="email"
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

      {/* Create conditional display of error message */}

      {errorMessage ? (
        <Spacer>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Spacer>
      ) : null}

      {/* call signup from authContext and pass in email and password */}

      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default AuthForm;

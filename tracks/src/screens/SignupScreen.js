import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  /**
   * useContext() accepts a context object and returns the current context
   * value for that context. That current context value is determined by the
   * value prop of the nearest <Context.Provider> above the calling component in
   * the tree.
   *
   * Couple important things to note. The nearest <Context.Provider> at this
   * point is the AuthProvider as seen in App.js:
   *
   *    <AuthProvider>
   *      <App />
   *    </AuthProvider>
   *
   * The Provider takes chilren and a value that passes in `state` and
   * `actions`.
   *
   * A component calling useContext will always re-render when the context
   * value changes. If re-rendering the component is expensive, you can
   * optimize it by using memoization.
   *
   * useContext(MyContext) only lets you read the context and subscribe to its
   * changes. You still need a <MyContext.Provider> above in the tree to
   * provide the value for this context.
   *
   *
   * See https://reactjs.org/docs/hooks-reference.html#usecontext for more info.
   */
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('[SIGNUP-SCREEN] state: ', state);

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

      {/* Create conditional display of error message */}

      {state.errorMessage ? (
        <Spacer>
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        </Spacer>
      ) : null}

      {/* call signup from authContext and pass in email and password */}

      <Spacer>
        <Button title="Sign Up" onPress={() => signup({ email, password })} />
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default SignupScreen;

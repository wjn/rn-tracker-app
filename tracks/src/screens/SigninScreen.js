import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage, tryLocalSignin } = useContext(
    AuthContext
  );

  console.log('[SIGNIN-SCREEN] state: ', state);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign in to Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Signin"
        onSubmit={signin}
      />

      <NavLink
        routeName="Signup"
        linkText="Need an account? Sign up instead."
      />
    </View>
  );
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

export default SigninScreen;

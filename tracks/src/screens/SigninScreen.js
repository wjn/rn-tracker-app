import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);

  console.log('[SIGNIN-SCREEN] state: ', state);

  return (
    <View style={styles.container}>
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

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;

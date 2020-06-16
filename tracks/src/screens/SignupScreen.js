import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = () => {
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
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  console.log('[SIGNUP-SCREEN] state: ', state);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />

      <NavLink
        routeName="Signin"
        linkText="Already have an account? Sign in instead."
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

export default SignupScreen;

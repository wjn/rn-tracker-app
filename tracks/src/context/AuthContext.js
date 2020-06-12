import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api request to signup with email and password
    // if signup successful, modify state, saying wer'e authenticated.
    // if we fail, reflect error message
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // make api request to signup with email and password
    // if signup successful, modify state, saying wer'e authenticated.
    // if we fail, reflect error message
  };
};

const signout = (dispatch) => {
  return () => {
    // sign out
  };
};

/**
 * Export the Provider and Context implementing createDataContext imported above
 * passing in the three props defined:
 *  1. reducer
 *  2. actions array
 *  3. defaultValue
 */
export const { Provider, Context } = createDataContext(
  // reducer
  authReducer,
  // actions
  { signup, signin, signout },
  // defaultValues
  { isSignedIn: false }
);

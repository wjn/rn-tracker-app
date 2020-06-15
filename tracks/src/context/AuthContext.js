import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
      /**
       * on signup we need to reset the entire state object. That means we won't
       * return an object that persisits state with code like this
       *
       * { ...state, token: action.payload };
       *
       * but rather will return an object that replaces the current state object,
       * so that if a user has logged once unsuccessfully, and then is
       * successful, we wont still have an errorMessage showing.
       */
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  console.log(
    `[AUTHCONTEXT][SIGNUP][START] email : ${email} , password: ${password}`
  );

  try {
    const res = await trackerApi.post('/signup', { email, password });

    // After successful login a jwt is returned. Take that token
    // and write it to asyncStorage to be used to autolog a user back in
    await AsyncStorage.setItem('token', res.data.token);

    console.log('[AUTHCONTEXT][SIGNUP][SUCCESS] res.data: ', res.data);

    dispatch({ type: 'signup', payload: res.data.token });

    // After successful signin and dispatch navigate to the TrackList Screen
    navigate('TrackList');
  } catch (error) {
    console.log(
      '[AUTHCONTEXT][SIGNUP][FAIL] something went wrong with signup.'
    );

    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with signup.',
    });
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    console.log(
      `[AUTHCONTEXT][SIGNIN][START] email : ${email} , password: ${password}`
    );

    // make api request to signin with email and password
    // if signin successful, modify state, saying wer'e authenticated.
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
  /**
   * defaultValues
   * -------------
   * token: null | jwt (jwt = logged in; null = not logged in)
   * errorMessage: '' | 'message content'
   *
   */
  { token: null, errorMessage: '' }
);
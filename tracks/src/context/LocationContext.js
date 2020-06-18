import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'start_recording':
      return { ...state, isRecording: true };
    case 'stop_recording':
      return { ...state, isRecording: false };
    default:
      return state;
  }
};

/**
 * ACTION Functions
 */
const changeName = (dispatch) => (name) => {
  dispatch({ type: 'change_track_name', payload: name });
};
const startRecording = (dispatch) => () => {
  dispatch({ type: 'start_recording' });
};
const stopRecording = (dispatch) => () => {
  dispatch({ type: 'stop_recording' });
};
const addLocation = (dispatch) => (location, isRecording) => {
  console.log('[LocationCtx][addLocation] called');

  dispatch({ type: 'add_current_location', payload: location });

  // only build the locations array if recording
  if (isRecording) {
    dispatch({ type: 'add_location', payload: location });
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName },
  { name: '', isRecording: false, locations: [], currentLocation: null }
);

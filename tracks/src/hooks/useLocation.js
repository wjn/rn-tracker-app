import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

/**Extracted all logic from TrackCreateScreen that
 * dealt with handling location
 * */

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // run once or run when shouldTrack is true.
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      console.log('[useLocation] startWatching: initialized');

      try {
        await requestPermissionsAsync();
        // watchPositionAsyn returns a subscriber that can be removed (turned off)
        subscriber = await watchPositionAsync(
          {
            // higher accuracy, higher batter consumption
            accuracy: Accuracy.BestForNavigation,
            // poll every second
            timeInterval: 1000,
            // or every ten meters
            distanceInterval: 10,
          },
          callback
        );
      } catch (error) {
        console.log('[TRACKCREATE][STARTWATCH][FAIL]');
        setErr(error);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // stop watching position
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    // clean up listeners to prevent duplicates
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]); // can add variables to the array that when changed, the
  // contents of the function inside of useEffect execute
  // again.

  // hooks' convention returns an array to always support multiple values.
  return [err];
};

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
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const sub = await watchPositionAsync(
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
      setSubscriber(sub);
    } catch (error) {
      console.log('[TRACKCREATE][STARTWATCH][FAIL]');
      setErr(error);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrack]); // can add variables to the array that when changed, the
  // contents of the function inside of useEffect execute
  // again.

  // hooks' convention returns an array to always support multiple values.
  return [err];
};

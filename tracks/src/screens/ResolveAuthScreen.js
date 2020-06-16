import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  console.log('[ResolveAuthScreen] loading... ');

  // Try Local signin only the first time when screen loads.
  useEffect(() => {
    tryLocalSignin();
  }, []);
  // retun null for a blank screen.
  return null;
};

export default ResolveAuthScreen;

import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://nd.ngrok.io',
});

instance.interceptors.request.use(
  // automatically upon making a reqest
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // automatically execute on error case
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

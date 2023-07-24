import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { API_BASE_URL } from './private';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;

  if (user) {
    const idToken = await user.getIdToken();

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;

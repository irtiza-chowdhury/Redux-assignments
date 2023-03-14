/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
});

export default axiosInstance;

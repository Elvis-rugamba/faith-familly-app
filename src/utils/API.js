import axios from 'axios';
import Qs from 'qs';
import config from '../config/config';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
  headers: {
    'User-Agent': 'Abbagospel Mobile App',
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    timeout: 10000,
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options) {
  const onSuccess = function (response) {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function (error) {
    console.error('Request Failed:', error.config);

    return Promise.reject(error.response || error.message || error.error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;

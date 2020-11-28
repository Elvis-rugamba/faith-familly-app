import request from '../utils/API';

const get = (url, params = {}, config = {}) => {
  return request({
    url,
    method: 'GET',
    params,
    ...config,
  });
};

const post = (url, data, config = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...config,
  });
};

const patch = (url, data, config = {}) => {
  return request({
    url,
    method: 'PATCH',
    data,
    ...config,
  });
};

const put = (url, data, config = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...config,
  });
};

const del = (url, config = {}) => {
  return request({
    url,
    method: 'DELETE',
    ...config,
  });
};

export default { get, post, put, patch, del };

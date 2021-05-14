import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 10000,
});

function axiosGet(path, config) {
  return http
    .get(path, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function axiosPost(path, params, config) {
  return http
    .post(path, params, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function axiosPut(path, params, config) {
  return http
    .put(path, params, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function axiosDelete(path, params) {
  return http
    .delete(path, { params })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

/* 导出常用的四种 http 请求 */
export default {
  instance: http,
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  delete: axiosDelete,
};

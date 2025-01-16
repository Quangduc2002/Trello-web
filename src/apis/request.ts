// /* eslint-disable no-unused-vars */
// import axios from 'axios';
// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// // instance.defaults.headers.common['Authorization'] = `bearer ${localStorage.accessToken}`;
// instance.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `bearer ${localStorage.accessToken}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 403) {
//       const refreshToken = localStorage.getItem('refreshToken');
//       try {
//         const { data } = await instance.post('/auth/refresh-token', { refreshToken });
//         localStorage.setItem('accessToken', data.accessToken);
//         localStorage.setItem('refreshToken', data.refreshToken);
//         instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

//         return instance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default instance;

import axios, { AxiosError, AxiosResponse } from 'axios';

export const VITE_APP_API = 'http://localhost:8080';

export const axiosInstant = axios.create({
  baseURL: VITE_APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstant.interceptors.request.use(
  async (config: any) => {
    const accessToken = localStorage.getItem('accessToken');

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

const successHandler = async (response: AxiosResponse) => {
  return response;
};

const errorHandler = (error: AxiosError) => {
  const resError: AxiosResponse<any> | undefined = error.response;

  return Promise.reject({ ...resError?.data });
};

axiosInstant.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error),
);

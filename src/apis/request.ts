import axios, { AxiosError, AxiosResponse } from 'axios';

export var VITE_APP_API = '';

if (process.env.BUILD_MODE === 'dev') {
  VITE_APP_API = 'http://localhost:8080';
} else {
  VITE_APP_API = 'https://trello-api-jk9a.onrender.com';
}

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

const errorHandler = async (error: AxiosError) => {
  const resError: AxiosResponse<any> | undefined = error.response;
  const originalRequest = resError?.config;

  if (resError && resError.status === 401 && originalRequest) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject({ message: 'Refresh token not found' });
    }

    try {
      const { data } = await axiosInstant.post('/auth/refresh-token', { refreshToken });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      axiosInstant.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

      if (originalRequest.data && typeof originalRequest.data === 'string') {
        try {
          originalRequest.data = JSON.parse(originalRequest.data);
        } catch (error) {
          console.warn('JSON parse error:', error);
        }
      }
      return axiosInstant(originalRequest);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
  }

  return Promise.reject({ ...resError?.data });
};

axiosInstant.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error),
);

import axios from "axios";
import { environment } from "../environment/environment";

export const publicAxios = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxios = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let interceptorId = null;

export const attachToken = (token) => {
  if (interceptorId !== null) {
    privateAxios.interceptors.request.eject(interceptorId);
  }

  interceptorId = privateAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const removeToken = () => {
  if (interceptorId !== null) {
    privateAxios.interceptors.request.eject(interceptorId);
    interceptorId = null;
  }

  privateAxios.defaults.headers.Authorization = null;
};

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error("Forbidden");
    }
    return Promise.reject(error);
  }
);

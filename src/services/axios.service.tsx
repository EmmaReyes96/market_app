import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SessionService } from "./session.service";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_NODE_ENV,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const session = SessionService.getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const handledError = (e: AxiosResponse) => {
  const data = e.data as HandledError;
  if (e.status === 401 || data.statusCode === 401) {
    SessionService.updateSession();
    window.location.href = "/";
    throw e.data;
  } else {
    throw e.data;
  }
};

const AxiosService = {
  async http(config: AxiosRequestConfig) {
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (e: any) {
      return handledError(e.response);
    }
  },
};

export default AxiosService;

interface HandledError {
  message: string;
  statusCode: number;
}

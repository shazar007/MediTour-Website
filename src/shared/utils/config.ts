import { store } from "shared/redux";
import axios, { AxiosInstance } from "axios";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

const BASE_URL = process.env.REACT_APP_Base_URL;

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const interceptorConfig = (setLogOutFlag: any, setIsOffline: any) => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const { token, isLoggedIn } = store.getState().root.common;

      if (isLoggedIn) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );

  HTTP_CLIENT.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (!navigator.onLine) {
        setIsOffline(true);
        setTimeout(() => {
          setIsOffline(false);
        }, 5000);
      }
      notifyError(error?.response?.data?.message);

      if (error.response) {
        if (error.response.status === 401) {
          setLogOutFlag(true);
        }
      } else if (error.request) {
        console.error("Error: No response received");
      } else {
        console.error("Error:", error.message);
      }

      return Promise.reject(error);
    }
  );
};

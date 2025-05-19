/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExternalAuthHandlers } from "@/Context/Auth/index";
import appConfig from "@/public/config";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: appConfig.API_URL || "http://localhost:8080/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => {
    const auth = getExternalAuthHandlers();
    console.log("FROM CRUDFFUNTIONS, LOGGING RESPONSE: ");
    console.log(response);
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken && newAccessToken.startsWith("Bearer ")) {
      const token = newAccessToken.replace("Bearer ", "");
      localStorage.setItem("token", token);
      auth.login();
    }
    return response;
  },
  (error) => {
    // Handle 401 here too if refresh logic is needed
    return Promise.reject(error);
  }
);

interface FieldError {
  field: string;
  message: string;
}

interface APIError {
  status: number;
  errors: FieldError[] | string;
}

const handleError = (error: AxiosError): never => {
  if (error.response) {
    const data = error.response.data as any;

    if (data?.errors) {
      // Structured error from your backend
      throw {
        status: error.response.status,
        errors: data.errors,
      } as APIError;
    }

    // Unstructured or simple message
    throw {
      status: error.response.status,
      errors: data.message || "An unknown error occurred",
    } as APIError;
  }

  throw {
    status: 500,
    errors: "Something went wrong. Try again.",
  } as APIError;
};

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const res = await API.get<T>(url, config);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const postData = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const res = await API.post<T>(url, data, config);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const putData = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const res = await API.put<T>(url, data, config);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const res = await API.delete<T>(url, config);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getQueryParam = (search: string, key: string): string | null => {
  const params = new URLSearchParams(search);
  return params.get(key);
};

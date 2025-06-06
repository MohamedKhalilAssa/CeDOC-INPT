/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExternalAuthHandlers } from "@/Context/Auth/index";
import { useAlert } from "@/Hooks/UseAlert";
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
    const swal = useAlert();
    if (
      error.response &&
      error.response.data?.error == "authentication_error"
    ) {
      location.href =
        appConfig.FRONTEND_URL + appConfig.FRONTEND_PATHS.AUTH.login.path;
      swal.toast("Authentication error: Please log in again.", "error");
    }
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

export const getFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof FileList) {
      Array.from(data[key]).forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const getFormDataWithFiles = (data: any): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const setFormDataWithFiles = (formData: FormData, data: any): void => {
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof File) {
      formData.set(key, data[key]);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        formData.set(key, item);
      });
    } else {
      formData.set(key, data[key]);
    }
  });
};

export const getQueryParam = (search: string, key: string): string | null => {
  const params = new URLSearchParams(search);
  return params.get(key);
};

/**
 * Transforms form data to FormData for multipart/form-data requests
 * Handles files, arrays, and regular form fields automatically
 */
export const transformToFormData = (data: any): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    // Skip null, undefined, or empty string values
    if (value === null || value === undefined || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      // Handle arrays by appending each item
      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "") {
          formData.append(key, item.toString());
        }
      });
    } else if (value instanceof File) {
      // Handle file uploads
      formData.append(key, value);
    } else if (value instanceof FileList) {
      // Handle FileList objects
      Array.from(value).forEach((file) => {
        formData.append(key, file);
      });
    } else {
      // Handle other values (strings, numbers, booleans, etc.)
      formData.append(key, value.toString());
    }
  });

  return formData;
};

/**
 * POST request with automatic multipart/form-data handling
 * Use this when your backend expects @ModelAttribute or has MultipartFile fields
 */
export const postFormData = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const formData = transformToFormData(data);
    const res = await API.post<T>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

/**
 * PUT request with automatic multipart/form-data handling
 * Use this when your backend expects @ModelAttribute or has MultipartFile fields
 */
export const putFormData = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const formData = transformToFormData(data);
    const res = await API.put<T>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

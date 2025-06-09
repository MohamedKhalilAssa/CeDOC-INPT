/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExternalAuthHandlers } from "@/Context/Auth/index";
import appConfig from "@/public/config";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const API = axios.create({
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
      console.log("New access token received:", newAccessToken);
      const token = newAccessToken.replace("Bearer ", "");
      localStorage.setItem("token", token);
      auth.login();
    }
    return response;
  },
  (error) => {
    // Handle authentication errors
    // if (
    //   error.response &&
    //   (error.response.data?.error === "authentication_error" ||
    //     error.response.status === 401 ||
    //     error.response.status === 403)
    // ) {
    //   // Clear token and redirect to login
    //   localStorage.removeItem("token");
    //   const auth = getExternalAuthHandlers();
    //   auth.logout();

    //   // Redirect to login page
    //   if (typeof window !== "undefined") {
    //     window.location.href =
    //       appConfig.FRONTEND_URL + appConfig.FRONTEND_PATHS.AUTH.login.path;
    //   }
    // }

    // Re-throw the error so it can be handled by the calling component
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
  // Check if response exists first
  if (error.response && error.response.data) {
    const data = error.response.data as any;

    // Handle your backend's structured error format
    if (data?.statusCode && data?.message) {
      throw {
        status: data.statusCode,
        errors: data.message,
      } as APIError;
    }

    // Handle validation errors (if your backend sends field errors)
    if (data?.errors && Array.isArray(data.errors)) {
      throw {
        status: error.response.status,
        errors: data.errors,
      } as APIError;
    }

    // Handle other structured errors
    if (data?.message) {
      throw {
        status: error.response.status,
        errors: data.message,
      } as APIError;
    }

    // Fallback for unstructured errors
    throw {
      status: error.response.status,
      errors: data || "An unknown error occurred",
    } as APIError;
  }

  // Handle response without data
  if (error.response) {
    throw {
      status: error.response.status,
      errors: `HTTP Error ${error.response.status}: ${
        error.response.statusText || "Unknown error"
      }`,
    } as APIError;
  }

  // Network error or request timeout
  if (error.code === "ECONNABORTED") {
    throw {
      status: 408,
      errors: "Request timeout - please try again",
    } as APIError;
  }

  // Network error
  if (
    error.code === "ERR_NETWORK" ||
    error.message?.includes("Network Error")
  ) {
    throw {
      status: 0,
      errors: "Network error - please check your connection",
    } as APIError;
  }

  // Other Axios error
  if (error?.message) {
    throw {
      status: error.status || 500,
      errors: error.message,
    } as APIError;
  }

  // Final fallback
  throw {
    status: 500,
    errors: "An unexpected error occurred",
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

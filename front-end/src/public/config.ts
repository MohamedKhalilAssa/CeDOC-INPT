interface ApiPaths {
  name: string;
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
}
interface FrontendPaths {
  name: string;
  path: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
}

type ApiPathsMap = { [key: string]: ApiPaths };
type FrontendPathsMap = { [key: string]: FrontendPaths };

interface AppConfig {
  APP_NAME: string;
  API_URL: string;
  FRONTEND_URL: string;
  IMAGES_RESSOURCES: string;
  BACKEND_URL: string;
  API_PATHS: ApiPathsMap;
  FRONTEND_PATHS: FrontendPathsMap;
}
const appConfig: AppConfig = {
  APP_NAME: "CEDoc",
  API_URL: "http://localhost:8080/api",
  BACKEND_URL: "http://localhost:8080",
  FRONTEND_URL: "http://localhost:5173",
  IMAGES_RESSOURCES: "@/assets/images",
  API_PATHS: {
    register: {
      name: "Register",
      path: "/auth/register",
      method: "POST",
    },
    login: {
      name: "Login",
      path: "/auth/login",
      method: "POST",
    },
    logout: {
      name: "Logout",
      path: "/auth/logout",
      method: "POST",
    },
    sendVerificationEmail: {
      name: "Send Verification Email",
      path: "/auth/send-verification",
      method: "POST",
    },
    verifyEmail: {
      name: "Verify Email",
      path: "/auth/verify-email",
      method: "POST",
    },
    forgotPassword: {
      name: "Forgot Password",
      path: "/auth/forgot-password",
      method: "POST",
    },
    resetPassword: {
      name: "Reset Password",
      path: "/auth/reset-password",
      method: "POST",
    },
    authCheck: {
      name: "Auth Check",
      path: "/auth/check",
      method: "GET",
    },
  },
  FRONTEND_PATHS: {
    landingPage: {
      name: "Landing Page",
      path: "/",
    },
    register: {
      name: "Register",
      path: "/auth/register",
    },
    login: {
      name: "Login",
      path: "/auth/login",
    },
    verifyEmail: {
      name: "Email Verification",
      path: "/auth/verify-email",
    },
  },
};

export default appConfig;

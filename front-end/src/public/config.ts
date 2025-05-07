interface AppConfig {
  APP_NAME: string;
  API_URL: string;
  FRONTEND_URL: string;
  BACKEND_URL: string;
}

const appConfig: AppConfig = {
  APP_NAME: "CEDoc",
  API_URL: "http://localhost:8080/api",
  BACKEND_URL: "http://localhost:8080",
  FRONTEND_URL: "http://localhost:5173",
};

export default appConfig;

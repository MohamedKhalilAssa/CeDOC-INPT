import GeneralLayout from "@/Layout/GeneralLayout";
import GuestOnlyLayout from "@/Layout/GuestOnlyLayout";
import EmailVerificationPage from "@/Pages/Authentication/EmailVerificationPage";
import ForgotPasswordPage from "@/Pages/Authentication/ForgotPasswordPage";
import SignInPage from "@/Pages/Authentication/SignInPage";
import SignUpPage from "@/Pages/Authentication/SignUpPage";
import LandingPage from "@/Pages/LandingPage";
import appConfig from "@/public/config";
import { Route, Routes } from "react-router-dom";
import ResetPasswordPage from "./Pages/Authentication/ResetPasswordPage";

function App() {
  return (
    <>
      <Routes>
        {/* This is guest layout routes, it contains navbar and footer by default 
          you can add the other routes here, that have navbar and footer and don't require authentication
        */}
        <Route element={<GeneralLayout />}>
          <Route
            path={appConfig.FRONTEND_PATHS.landingPage.path}
            element={<LandingPage />}
          />

          <Route element={<GuestOnlyLayout />}>
            <Route
              path={appConfig.FRONTEND_PATHS.register.path}
              element={<SignUpPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.login.path}
              element={<SignInPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.verifyEmail.path}
              element={<EmailVerificationPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.forgotPassword.path}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.resetPassword.path}
              element={<ResetPasswordPage />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

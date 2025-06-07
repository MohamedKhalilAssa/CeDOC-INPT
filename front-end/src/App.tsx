import AuthOnlyLayout from "@/Layout/AuthOnlyLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
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
import PostulerPage from "./Pages/Candidature/PostulerPage";
import ContactPage from "./Pages/ContactPage";
import FormationPage from "./Pages/FormationPage";

// Dashboard Template Pages - Import separately for clarity
import DashBarChart from "@/Pages/DashPages/Charts/BarChart";
import DashLineChart from "@/Pages/DashPages/Charts/LineChart";
import DashboardHomePage from "@/Pages/DashPages/Dashboard/Home";
import DashFormElements from "@/Pages/DashPages/Forms/FormElements";
import DashTables from "@/Pages/DashPages/Tables/BasicTables";

function App() {
  return (
    <>
      <Routes>
        {/* MAIN APPLICATION ROUTES - Your Custom App */}
        <Route element={<GeneralLayout />}>
          <Route
            path={appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path}
            element={<LandingPage />}
          />
          <Route element={<GuestOnlyLayout />}>
            <Route
              path={appConfig.FRONTEND_PATHS.AUTH.register.path}
              element={<SignUpPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.AUTH.login.path}
              element={<SignInPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.AUTH.verifyEmail.path}
              element={<EmailVerificationPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.AUTH.forgotPassword.path}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={appConfig.FRONTEND_PATHS.AUTH.resetPassword.path}
              element={<ResetPasswordPage />}
            />
          </Route>

          <Route element={<AuthOnlyLayout />}>
            <Route path="/postuler" element={<PostulerPage />} />
          </Route>

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/formations" element={<FormationPage />} />
        </Route>

        {/* DASHBOARD TEMPLATE ROUTES - Template Components Section */}
        {/* These routes use template components and can be removed/customized */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="form-elements" element={<DashFormElements />} />
          <Route path="charts/bar" element={<DashBarChart />} />
          <Route path="charts/line" element={<DashLineChart />} />
          <Route path="tables" element={<DashTables />} />
          {/* Add more dashboard template routes here as needed */}
        </Route>

      </Routes>
    </>
  );
}

export default App;

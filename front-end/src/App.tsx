import { Route, Routes } from "react-router-dom";

import AuthOnlyLayout from "@/Layout/AuthOnlyLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
import GeneralLayout from "@/Layout/GeneralLayout";
import GuestOnlyLayout from "@/Layout/GuestOnlyLayout";

import EmailVerificationPage from "@/Pages/Authentication/EmailVerificationPage";
import ForgotPasswordPage from "@/Pages/Authentication/ForgotPasswordPage";
import ResetPasswordPage from "@/Pages/Authentication/ResetPasswordPage";
import SignInPage from "@/Pages/Authentication/SignInPage";
import SignUpPage from "@/Pages/Authentication/SignUpPage";

import PostulerPage from "@/Pages/Candidature/PostulerPage";
import ContactPage from "@/Pages/ContactPage";
import ResearchTeamsTable from "@/Pages/EquipesDeRecherchePage";
import FormationPage from "@/Pages/FormationPage";
import LandingPage from "@/Pages/LandingPage";

import DashBarChart from "@/Pages/DashPages/Charts/BarChart";
import DashLineChart from "@/Pages/DashPages/Charts/LineChart";
import DashboardHomePage from "@/Pages/DashPages/Dashboard/Home";
import DashFormElements from "@/Pages/DashPages/Forms/FormElements";
import DashTables from "@/Pages/DashPages/Tables/BasicTables";

import appConfig from "@/public/config";

function App() {
  return (
    <Routes>
      {/**────────────────────────────────────────────────── */}
      {/** All “public” pages live under GeneralLayout → Outlet */}
      <Route element={<GeneralLayout />}>
        {/** Landing page ("/") */}  
        <Route
          path={appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path}
          element={<LandingPage />}
        />

        {/** ──────────────────────────────────────────────── */}
        {/** MOVED /recherche out from GuestOnlyLayout so it always renders */}
        <Route
          path={appConfig.FRONTEND_PATHS.GLOBAL.recherche.path}
          element={<ResearchTeamsTable />}
        />

        {/** ──────────────────────────────────────────────── */}
        {/** Routes that should only be seen by *unauthenticated* (guests) */}
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

        {/** ──────────────────────────────────────────────── */}
        {/** Routes that should only be seen by *authenticated* users */}
        <Route element={<AuthOnlyLayout />}>
          <Route
            path={appConfig.FRONTEND_PATHS.GLOBAL.postuler.path}
            element={<PostulerPage />}
          />
        </Route>

        {/** ──────────────────────────────────────────────── */}
        {/** Other public‐quality pages (no guard) */}
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="/formations" element={<FormationPage />} />
      </Route>
      {/**────────────────────────────────────────────────── */}

      {/**────────────────────────────────────────────────── */}
      {/** Dashboard / Admin‐style routes live at “/dashboard/*”  */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="form-elements" element={<DashFormElements />} />
        <Route path="charts/bar"    element={<DashBarChart />} />
        <Route path="charts/line"   element={<DashLineChart />} />
        <Route path="tables"        element={<DashTables />} />
      </Route>
      {/**────────────────────────────────────────────────── */}
    </Routes>
  );
}

export default App;

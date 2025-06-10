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

import DashboardHomePage from "@/Pages/DashPages/Dashboard/Home";
import DoctorantFormation from "@/Pages/Dashboard/Formations/DoctorantFormations";
import DoctorantPublication from "@/Pages/Dashboard/Publications/DoctorantPublication";
import DoctorantConferences from "@/Pages/Dashboard/Conferences/DoctorantConferences";
import DoctorantReinscriptions from "@/Pages/Dashboard/Reinscriptions/DoctorantReinscriptions";
import DoctorantVacations from "@/Pages/Dashboard/Vacations/DoctorantVacations";
import ProposerSujet from "@/Pages/Dashboard/Sujets/ProposerSujet";
import SujetsMembreEquipes from "@/Pages/Dashboard/Sujets/SujetsMembreEquipes";

import UserProfiles from "@/Pages/Dashboard/UserProfile/UserProfiles";
import appConfig from "@/public/config";
import PublicationsValidation from "./Pages/Dashboard/Publications/PublicationsValidation";
import ConferencesValidation from "./Pages/Dashboard/Conferences/ConferencesValidation";
import AdminValidationReinscriptions from "./Pages/Dashboard/Reinscriptions/AdminValidationReinscriptions";

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
        <Route
          path={appConfig.FRONTEND_PATHS.GLOBAL.contact.path}
          element={<ContactPage />}
        />
        <Route
          path={appConfig.FRONTEND_PATHS.FORMATION.formations.path}
          element={<FormationPage />}
        />
      </Route>
      {/**────────────────────────────────────────────────── */}

      {/**────────────────────────────────────────────────── */}
      {/** Dashboard / Admin‐style routes live at “/dashboard/*”  */}
      <Route
        path={appConfig.FRONTEND_PATHS.DASHBOARD.homePage.path}
        element={<DashboardLayout />}
      >
        <Route index element={<DashboardHomePage />} /> {/* Utilisateur */}
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.utilisateurs.profile.path}
          element={<UserProfiles />}
        />{" "}
        {/* Sujets */}
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.sujets.proposer.path}
          element={<ProposerSujet />}
        />
        <Route path="sujets/membres-equipe" element={<SujetsMembreEquipes />} />
        {/* Formations */}
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.formations.proposer.path}
          element={<DoctorantFormation />}
        />
        {/* Publications */}
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.publications.publier.path}
          element={<DoctorantPublication />}
        />
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.vacations.vacation.path}
          element={<DoctorantVacations />}
        />
        <Route
          path={appConfig.FRONTEND_PATHS.DASHBOARD.conferences.participer.path}
          element={<DoctorantConferences />}
        />
        <Route
          path={
            appConfig.FRONTEND_PATHS.DASHBOARD.reinscriptions.reinscrire.path
          }
          element={<DoctorantReinscriptions />}
        />
        <Route
          path={
            appConfig.FRONTEND_PATHS.DASHBOARD.publications.valider.path
          }
          element={<PublicationsValidation />}
        />
        <Route
          path={
            appConfig.FRONTEND_PATHS.DASHBOARD.conferences.valider.path
          }
          element={<ConferencesValidation />}
        />
        <Route
          path={
            appConfig.FRONTEND_PATHS.DASHBOARD.reinscriptions.valider.path
          }
          element={<AdminValidationReinscriptions />}
        />
      </Route>

      {/**────────────────────────────────────────────────── */}
      {/** ──────────────────────────────────────────────── */}
      {/** Catch‐all route for 404 Not Found */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;

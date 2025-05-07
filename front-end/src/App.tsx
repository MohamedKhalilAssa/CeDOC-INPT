import GuestLayout from "@/Layout/GuestLayout";
import EmailVerificationPage from "@/Pages/Authentication/EmailVerificationPage";
import SignInPage from "@/Pages/Authentication/SignInPage";
import SignUpPage from "@/Pages/Authentication/SignUpPage";
import LandingPage from "@/Pages/LandingPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* This is guest layout routes, it contains navbar and footer by default 
          you can add the other routes here, that have navbar and footer and don't require authentication
        */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/register" element={<SignUpPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="/auth/verify-email" element={<EmailVerificationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

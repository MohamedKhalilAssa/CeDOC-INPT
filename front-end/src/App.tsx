import GuestLayout from "@/Layout/GuestLayout";
import LandingPage from "@/Pages/LandingPage";
import SignUpPage from "@/Pages/SignUpPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

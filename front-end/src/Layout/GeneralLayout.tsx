import Footer from "@/Components/Footer/Footer";
import ScrollToHash from "@/Components/Helpers/ScrollToHash";
import Navbar from "@/Components/Navbar/Navbar";
import { type JSX } from "react";
import { Outlet } from "react-router-dom";
const GuestLayout = (): JSX.Element => {
  return (
    <>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="pt-20 flex-1 min-h-[calc(100vh-2rem)]">
          <Outlet /> {/* This is where child routes will render */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GuestLayout;

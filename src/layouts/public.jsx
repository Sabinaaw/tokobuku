// src/layouts/Public.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <main className="bg-[#020617]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
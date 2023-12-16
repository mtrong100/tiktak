import { Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className="relative flex items-start ">
      <Sidebar />
      <main className="p-5 w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default MainLayout;

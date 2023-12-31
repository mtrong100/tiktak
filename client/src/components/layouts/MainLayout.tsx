import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Header from "../shared/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="flex items-start relative">
        <Sidebar />
        <main className="p-5 w-full  max-w-[690px]  mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;

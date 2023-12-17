import React from "react";
import { Outlet } from "react-router-dom";
import CreatorHeader from "../shared/CreatorHeader";
import CreatorSidebar from "../shared/CreatorSidebar";

const CreatorLayout = () => {
  return (
    <>
      <CreatorHeader />
      <div className="flex items-start relative">
        <CreatorSidebar />
        <main className="p-5 w-full ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default CreatorLayout;

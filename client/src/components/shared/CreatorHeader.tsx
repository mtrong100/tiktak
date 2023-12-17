import React from "react";
import { Link } from "react-router-dom";

const CreatorHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full  px-8 h-[67px] flex items-center gap-3 border-b-2 bg-card border-border">
      <Link to="/" className="w-[42px] h-[42px] flex items-center gap-2">
        <img src="/logo.png" className="img-cover" alt="tiktok-logo" />
        <h1 className="text-2xl font-semibold">Tiktok</h1>
      </Link>
      <div className="flex items-center gap-3 ml-20">
        <span className="px-[9px] py-1 bg-black text-white font-semibold rounded-sm">
          Creator Center
        </span>
        <span className="px-3 py-1 font-semibold text-white rounded-sm bg-primary">
          Beta
        </span>
      </div>
    </header>
  );
};

export default CreatorHeader;

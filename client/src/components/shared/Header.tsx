import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { IoMdNotifications } from "react-icons/io";
import { BiMessageAltMinus } from "react-icons/bi";
import { Input } from "../ui/input";
import { ModeToggle } from "../mode-toggle";
import { AuthModal } from "../modals/AuthModal";
import { useAuthStore } from "@/zustand/authStore";
import { UserAvatar } from "../UserAvatar";
import { DropdownMenuDemo } from "../DropdownMenu";

const Header = () => {
  const currentUser = useAuthStore((state) => state.user);
  console.log(currentUser);

  return (
    <header className="sticky top-0 z-50 w-full grid items-center grid-cols-3 px-8 h-[67px] border-b-2 bg-card border-border">
      <Link to="/" className="w-[42px] h-[42px] flex items-center gap-2">
        <img src="/logo.png" className="img-cover" alt="tiktok-logo" />
        <h1 className="text-2xl font-semibold">Tiktok</h1>
      </Link>
      <Input type="text" placeholder="Search..." className="border-2 h-11" />

      <div className="flex items-center justify-end gap-5">
        <ModeToggle />

        <div className="flex items-center gap-4 text-2xl cursor-pointer">
          <IoMdNotifications />
          <BiMessageAltMinus />
        </div>

        {currentUser ? <DropdownMenuDemo /> : <AuthModal />}
      </div>
    </header>
  );
};

export default Header;

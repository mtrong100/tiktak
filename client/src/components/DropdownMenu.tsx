import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/zustand/authStore";
import { useNavigate } from "react-router-dom";
import { dropdownLinks } from "@/constants/constants";
import { TDropdownLinks } from "@/utils/types";

export function DropdownMenuDemo() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const handleLogout = () => {
    useAuthStore.getState().storeCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <img
            src={currentUser?.avatar}
            alt="user-avatar"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownLinks.map((item: TDropdownLinks) => {
          return (
            <DropdownMenuItem
              onClick={() => navigate(`${item.link}`)}
              className="h-[45px] text-base cursor-pointer"
            >
              {item.icon}
              <span>{item.title}</span>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuItem
          onClick={handleLogout}
          className="h-[45px] text-base cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

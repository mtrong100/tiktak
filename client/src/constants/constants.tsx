import { TDropdownLinks, TSidebarLinks } from "@/utils/types";
import {
  Compass,
  Home,
  LayoutDashboard,
  List,
  LogOut,
  Upload,
  User,
  Users,
} from "lucide-react";

export const SidebarLinks: TSidebarLinks[] = [
  {
    name: "For you",
    icon: <Home />,
    link: "/",
  },
  {
    name: "Following",
    icon: <Users />,
    link: "/following",
  },
  {
    name: "Explore",
    icon: <Compass />,
    link: "/explore",
  },
];

export const creatorSidebarLinks: TSidebarLinks[] = [
  {
    name: "Home",
    icon: <Home />,
    link: "/",
  },
  {
    name: "Upload",
    icon: <Upload />,
    link: "/creator/upload",
  },
  {
    name: "Manage",
    icon: <List />,
    link: "/creator/manage",
  },
];

export const dropdownLinks: TDropdownLinks[] = [
  {
    title: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    link: "/profile",
  },
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    link: "/creator/upload",
  },
];

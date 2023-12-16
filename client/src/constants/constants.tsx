import { TSidebarLinks } from "@/utils/types";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

export const SidebarLinks: TSidebarLinks[] = [
  {
    name: "For you",
    icon: <AiFillHome />,
    link: "/",
  },
  {
    name: "Following",
    icon: <FaUserFriends />,
    link: "/following",
  },
  {
    name: "Explore",
    icon: <MdExplore />,
    link: "/explore",
  },
];

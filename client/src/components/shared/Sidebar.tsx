import { SidebarLinks } from "@/constants/constants";
import { TSidebarLinks } from "@/utils/types";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sticky top-[67px] h-[calc(100vh-67px)] bottom-0 w-[260px] bg-card p-3 border-r-2 border-border">
      <ul className="flex flex-col gap-1">
        {SidebarLinks.map((item: TSidebarLinks) => {
          const isActive = location.pathname === item.link;

          return (
            <Link
              to={item.link}
              key={item.name}
              className={`${
                isActive
                  ? "font-medium bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              } h-[50px] text-lg px-5 rounded-md cursor-pointer transition-all flex items-center gap-3  `}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;

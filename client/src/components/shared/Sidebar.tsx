import { SidebarLinks } from "@/constants/constants";
import { TCurrentUser, TSidebarLinks } from "@/utils/types";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/userService";
import UserAccount, { UserAccountSkeleton } from "../UserAccount";
import { v4 as uuidv4 } from "uuid";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<TCurrentUser[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await getAllUsers();
        if (res) setUsers(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setUsers([]);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

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

      <Separator className="my-3" />

      <div>
        <h2 className="font-semibold">Recommended users</h2>

        <div className="mt-5 flex flex-col gap-4">
          {isLoading &&
            Array(5)
              .fill(0)
              .map(() => <UserAccountSkeleton key={uuidv4()} />)}

          {!isLoading &&
            users.length > 0 &&
            users?.map((user) => <UserAccount key={user._id} data={user} />)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

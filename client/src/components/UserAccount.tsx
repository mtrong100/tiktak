import { TCurrentUser } from "@/utils/types";
import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

interface Props {
  data: TCurrentUser;
}

const UserAccount = ({ data }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={data?.avatar}
        alt="user-avatar"
        className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0"
      />
      <Link to={`/profile/${data?._id}`} className="font-medium text-sm">
        {data?.username}
      </Link>
    </div>
  );
};

export default UserAccount;

export const UserAccountSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0" />
      <Skeleton className="h-[30px] w-[150px] rounded-sm" />
    </div>
  );
};

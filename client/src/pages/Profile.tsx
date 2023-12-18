import { UserModal } from "@/components/modals/UserModal";
import { Button } from "@/components/ui/button";
import { getUserDetail } from "@/services/userService";
import { TCurrentUser } from "@/utils/types";
import { useAuthStore } from "@/zustand/authStore";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<TCurrentUser | null>(null);
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    async function fetchDetailUser() {
      const value = localStorage.getItem("token");
      const accessToken: string | null = value ? JSON.parse(value) : null;

      try {
        const res = await getUserDetail(accessToken, currentUser?._id);
        setUser(res);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }
    fetchDetailUser();
  }, [currentUser?._id]);

  return (
    <section className="px-10">
      <div className="flex items-center gap-8">
        <img
          src={user?.avatar}
          alt=""
          className="w-[130px] h-[130px] object-cover rounded-full flex-shrink-0"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-bold">{user?.username}</h1>
          <span className="text-lg font-medium mb-1">@{user?.username}</span>
          {currentUser?._id === user?._id && <UserModal />}
        </div>
      </div>

      <ProfileMeta following={3} followers={6} />
    </section>
  );
};

export default Profile;

interface Props {
  following: number;
  followers: number;
}

function ProfileMeta({ following, followers }: Props) {
  return (
    <section className="flex items-center gap-5 mt-5 mb-2">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{following || "0"}</span>
        Following
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{followers || "0"}</span>
        Followers
      </div>
    </section>
  );
}

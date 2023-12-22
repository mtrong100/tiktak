import { getUserDetail } from "@/services/userService";
import { TCurrentUser } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useGetUserDetail(id: string) {
  const [user, setUser] = useState<TCurrentUser | null>(null);

  useEffect(() => {
    async function fetchDetailUser() {
      const value = localStorage.getItem("token");
      const accessToken: string | null = value ? JSON.parse(value) : null;

      try {
        const res = await getUserDetail(accessToken, id);
        setUser(res);
      } catch (error) {
        setUser(null);
      }
    }
    fetchDetailUser();
  }, [id]);

  return { user };
}

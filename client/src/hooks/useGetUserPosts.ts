import { queryParams } from "@/constants/constants";
import { getUserPosts } from "@/services/postService";
import { TPost } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useGetUserPosts(id: string) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const value = localStorage.getItem("token") as string;
  const accessToken: string = value ? JSON.parse(value) : null;

  const LIMIT: number = 10;

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        setIsLoading(true);
        const res = await getUserPosts(
          id as string,
          accessToken,
          queryParams.PAGE,
          LIMIT
        );
        setPosts(res?.results);
        setIsLoading(false);
      } catch (error) {
        setPosts([]);
        setIsLoading(false);
      }
    }
    fetchUserPosts();
  }, [accessToken, id]);

  return { posts, isLoading };
}

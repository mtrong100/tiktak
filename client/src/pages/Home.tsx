import Post from "@/components/Post";
import { getAllPosts } from "@/services/postService";
import { useAuthStore } from "@/zustand/authStore";
import { usePostStore } from "@/zustand/postStore";
import React, { useEffect } from "react";

const Home = () => {
  const currentUser = useAuthStore((state) => state.user);
  const posts = usePostStore((state) => state.post);
  // console.log(currentUser);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await getAllPosts();
        if (res) usePostStore.getState().storePosts(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
  }, []);

  return (
    <div className="flex flex-col gap-7">
      {posts.length > 0 &&
        posts?.map((post) => <Post key={post._id} data={post} />)}
    </div>
  );
};

export default Home;

import Post, { PostSkeleton } from "@/components/Post";
import { v4 as uuidv4 } from "uuid";
import { usePostStore } from "@/zustand/postStore";
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/authStore";
import { getAllPosts } from "@/services/postService";

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
      {posts.length === 0 &&
        Array(5)
          .fill(0)
          .map(() => <PostSkeleton key={uuidv4()} />)}

      {posts.length > 0 &&
        posts?.map((post) => <Post key={post._id} data={post} />)}
    </div>
  );
};

export default Home;

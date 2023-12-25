import Post from "@/components/Post";
import { getUserFollowingPosts } from "@/services/postService";
import { TPost } from "@/utils/types";
import { useAuthStore } from "@/zustand/authStore";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Following = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const value = localStorage.getItem("token");
  const accessToken: string | null = value ? JSON.parse(value) : null;

  useEffect(() => {
    async function fetchPosts() {
      const res = await getUserFollowingPosts(
        currentUser?._id as string,
        accessToken as string,
        page
      );
      setTotal(res?.totalPosts);
      setPosts(res?.results);
    }
    fetchPosts();
  }, [accessToken, currentUser?._id, page]);

  const fetchMorePosts = async () => {
    if (posts?.length < total) {
      const nextPage = page + 1;
      const res = await getUserFollowingPosts(
        currentUser?._id as string,
        accessToken as string,
        nextPage
      );
      setPosts([...posts, ...res.docs]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <InfiniteScroll
        dataLength={posts?.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts?.length > 0 &&
          posts?.map((post) => (
            <Post key={post._id} data={post} setPosts={setPosts} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Following;

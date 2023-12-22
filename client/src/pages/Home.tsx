import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/services/postService";
import { TPost } from "@/utils/types";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllPosts();
      setTotal(res?.totalDocs);
      setPosts(res?.docs);
    }
    fetchPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (posts?.length < total) {
      const nextPage = page + 1;
      const res = await getAllPosts(nextPage, 4);
      setPosts([...posts, ...res.docs]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
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

export default Home;

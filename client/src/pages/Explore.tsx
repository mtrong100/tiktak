import PostItem from "@/components/PostItem";
import { queryParams } from "@/constants/constants";
import { getAllPosts } from "@/services/postService";
import { TPost } from "@/utils/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT: number = 8;

const Explore = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  // Fetching post and render
  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllPosts(queryParams.PAGE, LIMIT);
      setTotal(res?.totalPosts);
      setPosts(res?.results);
    }
    fetchPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (posts?.length < total) {
      const nextPage = page + 1;
      const res = await getAllPosts(nextPage, LIMIT);
      setPosts([...posts, ...res.results]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  return (
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
      <section className="grid grid-cols-4 gap-x-2 gap-y-8">
        {posts?.length > 0 &&
          posts?.map((post) => <PostItem key={post._id} data={post} />)}
      </section>
    </InfiniteScroll>
  );
};
export default Explore;

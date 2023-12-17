import Post from "@/components/Post";
import PostItem from "@/components/PostItem";
import React from "react";

const Explore = () => {
  return (
    <section className="grid grid-cols-4 gap-x-2 gap-y-8">
      {Array(6)
        .fill(0)
        .map((item, index) => (
          <PostItem key={index} />
        ))}
    </section>
  );
};
export default Explore;

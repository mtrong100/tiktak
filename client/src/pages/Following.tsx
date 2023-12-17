import Post from "@/components/Post";
import React from "react";

const Following = () => {
  return (
    <div className="flex flex-col gap-7">
      {Array(6)
        .fill(0)
        .map((item, index) => (
          <Post key={index} />
        ))}
    </div>
  );
};

export default Following;

import Post from "@/components/Post";
import { useAuthStore } from "@/zustand/authStore";
import React from "react";

const Home = () => {
  const currentUser = useAuthStore((state) => state.user);
  console.log(currentUser);

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

export default Home;

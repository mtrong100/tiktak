import React from "react";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";
import { FaHeart } from "react-icons/fa6";

const PostItem = () => {
  return (
    <article className="flex flex-col gap-2">
      <div>
        <video
          controls
          loop
          autoPlay
          muted
          src={
            "https://firebasestorage.googleapis.com/v0/b/toktok-clone-780fb.appspot.com/o/videos%2Frksthijerg%20(3).mp4?alt=media&token=0f79db0e-123d-4431-a234-6a798bb6b611"
          }
          className="max-h-[600px] rounded-md"
        />
      </div>

      <div className="">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iure
          recusandae minus? Maxime eius unde iure,
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <UserAvatar />
            <h2 className="font-medium">Crowbar</h2>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <FaHeart className="h-5 w-5 " />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PostItem;

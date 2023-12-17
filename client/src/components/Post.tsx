import React from "react";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";
import { FaHeart } from "react-icons/fa6";
import { MessageCircleMore, Share2 } from "lucide-react";
import { IoBookmark } from "react-icons/io5";

const Post = () => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <UserAvatar />
          <div>
            <div className="flex items-center gap-2 text-sm">
              <h2 className="font-medium">Crowbar</h2>
              <span>.</span>
              <span>3 months ago</span>
            </div>
            <p className="mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              iure recusandae minus? Maxime eius unde iure,
            </p>
          </div>
        </div>

        <Button className="text-base" variant="primaryOutline">
          Follow
        </Button>
      </div>

      <div className="ml-[62px] flex items-end gap-5 mt-2">
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

        {/* Post action */}
        <section className="flex flex-col gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <FaHeart className="h-5 w-5 " />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MessageCircleMore className="h-5 w-5 " />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <IoBookmark className="h-5 w-5 " />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5 " />
          </Button>
        </section>
      </div>
    </article>
  );
};

export default Post;

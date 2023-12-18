import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { MessageCircleMore, Share2 } from "lucide-react";
import { IoBookmark } from "react-icons/io5";
import { TPost } from "@/utils/types";
import { format } from "timeago.js";

interface Props {
  data: TPost;
}

const Post = ({ data }: Props) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <img
            src={data?.user?.avatar}
            alt="user-avatar"
            className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 text-sm">
              <h2 className="font-bold capitalize text-base">
                {data?.user?.username}
              </h2>
              <span>.</span>
              <span>{format(data?.createdAt)}</span>
            </div>
            <p className="mt-1">{data?.content}</p>
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
          // autoPlay
          muted
          src={data?.video}
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

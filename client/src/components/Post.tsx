import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { MessageCircleMore, Share2 } from "lucide-react";
import { TPost } from "@/utils/types";
import { format } from "timeago.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { getAllPosts, toggleLikePost } from "@/services/postService";
import { useAuthStore } from "@/zustand/authStore";
import { usePostStore } from "@/zustand/postStore";
import { SheetComment } from "./SheetComment";

interface Props {
  data: TPost;
}

const Post = ({ data }: Props) => {
  const currentUser = useAuthStore((state) => state.user);

  // Handle toggle like post
  const handleToggleLikePost = async () => {
    try {
      const jsonValue: string | null = localStorage.getItem("token");
      const accessToken: string = jsonValue ? JSON.parse(jsonValue) : null;

      await toggleLikePost(data?._id, accessToken);
      const res = await getAllPosts();
      usePostStore.getState().storePosts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const isLiked = data?.likes?.includes(currentUser?._id as string);

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
              <Link
                to={`/profile/${data?.user?._id}`}
                className="font-bold capitalize text-base"
              >
                {data?.user?.username}
              </Link>
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
          <Button
            onClick={handleToggleLikePost}
            variant={isLiked ? "default" : "outline"}
            size="icon"
            className="rounded-full"
          >
            <FaHeart className="h-5 w-5" />
          </Button>
          <SheetComment postId={data?._id} />
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5 " />
          </Button>
        </section>
      </div>
    </article>
  );
};

export default Post;

export const PostSkeleton = () => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <Skeleton className="w-[50px] h-[50px] rounded-full flex-shrink-0" />

        <div className="flex-1">
          <Skeleton className="w-[200px] h-[25px] rounded-sm" />
          <Skeleton className="w-[300px] h-[25px] rounded-sm mt-2" />
        </div>
      </div>

      <div className="ml-[62px] flex items-end gap-5 mt-2">
        <Skeleton className=" w-[337px] h-[600px] rounded-md" />
      </div>
    </article>
  );
};

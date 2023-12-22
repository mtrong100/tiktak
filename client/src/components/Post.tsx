import useGetUserDetail from "@/hooks/useGetUserDetai";
import { useAuthStore } from "@/zustand/authStore";
import { TPost } from "@/utils/types";
import { toast } from "./ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { SheetComment } from "./SheetComment";
import { Link } from "react-router-dom";
import { getAllPosts, toggleLikePost } from "@/services/postService";
import { format } from "timeago.js";
import { followUser, getUserDetail } from "@/services/userService";
import { FaHeart } from "react-icons/fa6";
import { Button } from "./ui/button";

interface Props {
  data: TPost;
  setPosts: (data: TPost[]) => void;
}

const Post = ({ data, setPosts = () => {} }: Props) => {
  const currentUser = useAuthStore((state) => state.user);
  const { user } = useGetUserDetail(data?.user);

  // Handle toggle like post
  const handleToggleLikePost = async () => {
    try {
      const jsonValue: string | null = localStorage.getItem("token");
      const accessToken: string = jsonValue ? JSON.parse(jsonValue) : null;

      await toggleLikePost(data?._id, accessToken);
      const res = await getAllPosts();
      setPosts(res?.docs);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  // Handle follow or unfollow a user
  const handleToggleFollowUser = async (id: string) => {
    try {
      const jsonValue: string | null = localStorage.getItem("token");
      const accessToken: string = jsonValue ? JSON.parse(jsonValue) : null;

      const res = await followUser(id, accessToken);
      const response = await getUserDetail(accessToken, currentUser?._id);
      useAuthStore.getState().storeCurrentUser(response);
      toast({ description: res?.message, duration: 2000 });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  const isLiked = data?.likes?.includes(currentUser?._id as string);
  const isFollowed = currentUser?.following?.includes(user?._id as string);

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <img
            src={user?.avatar}
            alt="user-avatar"
            className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 text-sm">
              <Link
                to={`/profile/${user?._id}`}
                className="font-bold capitalize text-base"
              >
                {user?.username}
              </Link>
              <span>.</span>
              <span>{format(data?.createdAt)}</span>
            </div>
            <p className="mt-1">{data?.content}</p>
          </div>
        </div>

        {currentUser && currentUser?._id !== user?._id && (
          <Button
            onClick={() => handleToggleFollowUser(user?._id as string)}
            className="text-base"
            variant={isFollowed ? "primaryOutline" : "default"}
          >
            {isFollowed ? "Following" : "Follow"}
          </Button>
        )}
      </div>

      <div className="ml-[62px] flex items-center gap-5 mt-2">
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

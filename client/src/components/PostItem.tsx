import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";
import { FaHeart } from "react-icons/fa6";
import { TPost } from "@/utils/types";

interface Props {
  data: TPost;
}

const PostItem = ({ data }: Props) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="border-2 border-border rounded-md">
        <video
          controls
          loop
          // autoPlay
          muted
          src={data?.video}
          className="h-[550px] rounded-md w-full object-cover"
        />
      </div>

      <div className="">
        <p className="text-sm">{data?.content}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <UserAvatar avatar={data?.user?.avatar} />
            <h2 className="font-medium">{data?.user?.username}</h2>
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

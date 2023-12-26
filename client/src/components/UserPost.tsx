import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  video: string;
}

const UserPost = ({ video }: Props) => {
  return (
    <div className="border-2 border-border rounded-md h-[430px]">
      <video
        controls
        loop
        muted
        src={video}
        className="rounded-md object-cover w-full h-full"
      />
    </div>
  );
};

export default UserPost;

export const UserPostSkeleton = () => {
  return <Skeleton className="h-[490px] rounded-md" />;
};

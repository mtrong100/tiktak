import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  video: string;
}

const UserPost = ({ video }: Props) => {
  return (
    <div>
      <video controls loop muted src={video} className="rounded-md" />
    </div>
  );
};

export default UserPost;

export const UserPostSkeleton = () => {
  return <Skeleton className="h-[490px] rounded-md" />;
};

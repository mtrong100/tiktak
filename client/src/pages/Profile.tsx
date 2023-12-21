import UserPost, { UserPostSkeleton } from "@/components/UserPost";
import { UserModal } from "@/components/modals/UserModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TCurrentUser, TPost } from "@/utils/types";
import { getUserPosts } from "@/services/postService";
import { getUserDetail } from "@/services/userService";

const Profile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TCurrentUser | null>(null);
  const [posts, setPosts] = useState<TPost[]>([]);
  console.log(user);

  useEffect(() => {
    async function fetchDetailUser() {
      const value = localStorage.getItem("token");
      const accessToken: string | null = value ? JSON.parse(value) : null;

      try {
        const res = await getUserDetail(accessToken, id);
        setUser(res);
      } catch (error) {
        setUser(null);
      }
    }
    fetchDetailUser();
  }, [id]);

  useEffect(() => {
    async function fetchUserPosts() {
      const value = localStorage.getItem("token") as string;
      const accessToken: string = value ? JSON.parse(value) : null;

      try {
        setIsLoading(true);
        const res = await getUserPosts(id as string, accessToken);
        setPosts(res);
        setIsLoading(false);
      } catch (error) {
        setPosts([]);
        setIsLoading(false);
      }
    }
    fetchUserPosts();
  }, [id]);

  return (
    <section>
      <div className="flex items-center gap-8">
        <img
          src={user?.avatar}
          alt=""
          className="w-[130px] h-[130px] object-cover rounded-full flex-shrink-0"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-bold">{user?.username}</h1>
          <span className="text-lg font-medium mb-1">@{user?.username}</span>
          {user?._id === user?._id && <UserModal />}
        </div>
      </div>

      <ProfileMeta
        following={user?.following?.length as number}
        followers={user?.followers?.length as number}
      />

      <div className="mt-8 grid grid-cols-5 gap-2">
        {isLoading &&
          Array(5)
            .fill(0)
            .map((index: number) => <UserPostSkeleton key={index} />)}

        {!isLoading &&
          posts?.length > 0 &&
          posts?.map((post) => <UserPost key={post._id} video={post?.video} />)}
      </div>
    </section>
  );
};

export default Profile;

interface Props {
  following: number;
  followers: number;
}

function ProfileMeta({ following, followers }: Props) {
  return (
    <section className="flex items-center gap-5 mt-5 mb-2">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{following || 0}</span>
        Following
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{followers || 0}</span>
        Followers
      </div>
    </section>
  );
}

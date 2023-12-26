import { toast } from "@/components/ui/use-toast";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { deletePost } from "@/services/postService";
import { useAuthStore } from "@/zustand/authStore";
import { Heart, MessageCircle, Trash } from "lucide-react";
import { format } from "timeago.js";
import { SheetComment } from "@/components/SheetComment";
import { Button } from "@/components/ui/button";

const title = ["Posts", "Date", "Action"];

const Manage = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { posts, isLoading } = useGetUserPosts(currentUser?._id as string);
  const value = localStorage.getItem("token") as string;
  const accessToken: string = value ? JSON.parse(value) : null;

  const handleDeletePost = async (id: string) => {
    try {
      const res = await deletePost(id, accessToken);
      toast({ description: res?.message, duration: 2000 });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold">Manage your posts</h1>

      <div className="mt-8">
        {isLoading && <p>Loading...</p>}

        <table className="min-w-full border-border">
          <thead>
            <tr>
              {title.map((item) => (
                <th className="py-2 px-4 border-b text-left">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post?._id}>
                <td className="py-2 px-4 border-b">
                  <div className="rounded-md flex items-start gap-4">
                    <video
                      src={post?.video}
                      className="h-[106px] rounded-md flex-shrink-0"
                    ></video>

                    <div>
                      <div className="text-sm flex-1 ">{post?.content}</div>

                      <div className="flex items-center gap-5 mt-16">
                        <span className="flex items-center gap-1">
                          <Heart size={18} />4
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={18} />9
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {format(post?.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Trash
                        onClick={() => handleDeletePost(post?._id)}
                        className="h-5 w-5"
                      />
                    </Button>
                    <SheetComment postId={post?._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Manage;

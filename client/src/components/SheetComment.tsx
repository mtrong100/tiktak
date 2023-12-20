import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "@/services/postService";
import { useAuthStore } from "@/zustand/authStore";
import { TComment, TCommentData } from "@/utils/types";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MessageCircleMore,
  Send,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  postId: string;
}

export function SheetComment({ postId }: Props) {
  const currentUser = useAuthStore((state) => state.user);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);
  const [content, setContent] = useState<string>("");
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isUpdateComment, setIsUpdateComment] = useState<boolean>(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        setIsLoading(true);
        const res = await getAllComments(postId);
        if (res) setComments(res);
        setIsLoading(false);
      } catch (error) {
        setComments([]);
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  const handleSendComment = async () => {
    if (!content.trim()) return;

    try {
      setIsSending(true);
      const jsonValue: string | null = localStorage.getItem("token");
      const accessToken: string = jsonValue ? JSON.parse(jsonValue) : null;

      if (isUpdateComment) {
        await updateComment(updateId as string, content, accessToken);
        setUpdateId(null);
        setIsUpdateComment(false);
      } else {
        const data: TCommentData = {
          content,
          user: currentUser?._id as string,
          post: postId,
        };

        await createComment(data, accessToken);
      }

      const res = await getAllComments(postId);
      if (res) setComments(res);
      setContent("");
      setIsSending(false);
    } catch (error) {
      console.log(error);
      setContent("");
      setIsSending(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      const jsonValue: string | null = localStorage.getItem("token");
      const accessToken: string = jsonValue ? JSON.parse(jsonValue) : null;
      await deleteComment(id, accessToken);
      const res = await getAllComments(postId);
      if (res) setComments(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = (text: string, id: string) => {
    setIsUpdateComment(true);
    setContent(text);
    setUpdateId(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <MessageCircleMore className="h-5 w-5 " />
        </Button>
      </SheetTrigger>

      <SheetContent className="lg:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Comment</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 overflow-y-auto flex-1 custom-scrollbar">
            {isLoading && <p>Loading comments....</p>}

            {!isLoading &&
              comments?.length > 0 &&
              comments?.map((item) => (
                <div key={item?._id} className="flex items-start gap-2 pr-6">
                  <img
                    src={item?.user?.avatar}
                    alt="user-avatar"
                    className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0"
                  />
                  <div className="py-2 px-4 bg-card rounded-2xl">
                    <h1 className="font-semibold">{item?.user?.username}</h1>
                    <p className="text-sm">{item?.content}</p>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="iconSmall"
                        className="rounded-full flex-shrink-0"
                      >
                        <MoreHorizontal className="h-5 w-5 " />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="lg:w-32 p-0">
                      <div className="flex flex-col">
                        <div
                          onClick={() =>
                            handleUpdateClick(item?.content, item?._id)
                          }
                          className="flex items-center gap-2 h-[40px] hover:bg-muted px-5 cursor-pointer"
                        >
                          <Pencil size={18} />
                          Edit
                        </div>
                        <div
                          onClick={() => handleDeleteComment(item?._id)}
                          className="flex items-center gap-2 h-[40px] hover:bg-muted px-5 cursor-pointer"
                        >
                          <Trash2 size={18} />
                          Delete
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-2 w-full pb-14 pt-8">
            <Input
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
              className="h-[45px]"
              placeholder="Write your comment..."
            />
            <Button
              disabled={isSending}
              onClick={handleSendComment}
              size="icon"
              className="flex-shrink-0 h-[43px]"
            >
              {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

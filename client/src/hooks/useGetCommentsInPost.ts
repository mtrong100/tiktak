import { getAllComments } from "@/services/postService";
import { TComment } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useGetCommentsInPost(postId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);

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

  return { comments, isLoading, setComments };
}

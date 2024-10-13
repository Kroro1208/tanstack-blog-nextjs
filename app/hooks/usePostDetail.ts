import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
    tag: { name: string };
  }

export const usePostDetail = (postId: string) => {
    return useQuery<Post>({
        queryKey: ["post", postId],
        queryFn: async () => {
          const response = await axios.get(`/api/posts/${postId}`);
          return response.data;
        },
      });
}
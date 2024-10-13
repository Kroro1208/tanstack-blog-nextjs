import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";

export const useUpdatePost = (postId: string) => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {data: dataPost, isPending: isPendingUpdate} = useQuery({
        queryKey: ["posts", postId],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/${postId}`);
            return response.data;
        }
    });

    const { mutate: updatePost, isPending: isSubmiting } = useMutation({
        mutationFn: (newPost: FormData) => {
            return axios.patch(`/api/posts/${postId}`, newPost);
        },
        onError: (error) => {
            console.error(error);
            setError("投稿の作成中にエラーが発生しました。もう一度お試しください。");
        },
        onSuccess: () => { 
            router.push("/");
            router.refresh();
        }
    });

    const handleEditPost: SubmitHandler<FormData> = (data) => {
        updatePost(data);
    };

    

    return { dataPost, isPendingUpdate, isSubmiting, error, handleEditPost}
}
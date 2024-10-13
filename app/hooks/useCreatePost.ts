import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";

export const useCreatePost = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const { mutate: createPost, isPending } = useMutation({
        mutationFn: (newPost: FormData) => {
            return axios.post('/api/posts/create', newPost, {
                headers: {
                    "Content-Type": 'multipart/formData'
                },
            });
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

    const handleCreatePost: SubmitHandler<FormData> = (data) => {
        setError(null);
        createPost(data);
    }
    return { error, isPending, handleCreatePost }
}

export default useCreatePost

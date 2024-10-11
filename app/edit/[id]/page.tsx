"use client";
import FormPost from "@/app/components/FormPost";
import BackButton from "@/app/components/BackButton";
import type { FormInputPost } from "@/types/type";
import type { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface EditPostProps {
    params: {
        id: string;
    }
}

const EditPage: FC<EditPostProps> = ({ params }) => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {data: dataPost, isPending: isPendingUpdate} = useQuery({
        queryKey: ["posts", params.id],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/${params.id}`);
            return response.data;
        }
    });

    const { mutate: updatePost, isPending: isSubmiting } = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.patch(`/api/posts/${params.id}`, newPost);
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

    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        updatePost(data);
    };

    if(isPendingUpdate) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner" />
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="bg-base-200 rounded-box p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-full flex justify-start">
                        <BackButton />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">編集</h1>
                </div>
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}
                <FormPost
                    submit={handleEditPost}
                    initialValue={dataPost} 
                    isEditing={true}
                    isSubmitting={isSubmiting}
                    />
            </div>
        </div>
    );
};

export default EditPage;
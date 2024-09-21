"use client";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form"
import type { FormInputPost } from "@/types/type"
import BackButton from "../components/BackButton";
import FormPost from "../components/FormPost";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const { mutate: createPost, isPending } = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.post('/api/posts/create', newPost);
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

    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        setError(null);
        createPost(data);
    }
    
    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="bg-base-200 rounded-box p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-full flex justify-start">
                        <BackButton />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">新規作成</h1>
                </div>
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}
                <FormPost submit={handleCreatePost} isEditing={false} isSubmitting={isPending}/>
                {isPending && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-base-100 p-4 rounded-box flex items-center space-x-2">
                            <span className="loading loading-spinner loading-md" />
                            { isPending && <span className='loading loading-spinner' />}
                            </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatePage;
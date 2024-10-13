"use client";
import FormPost from "@/app/components/FormPost";
import BackButton from "@/app/components/BackButton";
import { useUpdatePost } from "@/app/hooks/useUpdatePost";
import type { FC } from "react";

interface EditPostProps {
    params: {
        id: string;
    }
}

const EditPage: FC<EditPostProps> = ({ params }) => {
    const { dataPost, isPendingUpdate, isSubmiting, error, handleEditPost } = useUpdatePost(params.id);

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
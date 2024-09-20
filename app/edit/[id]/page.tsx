"use client";
import FormPost from "@/app/components/FormPost";
import BackButton from "@/app/components/BackButton";
import type { FormInputPost } from "@/types/type";
import type { SubmitHandler } from "react-hook-form";

const EditPage = () => {
    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="bg-base-200 rounded-box p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-full flex justify-start">
                        <BackButton />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">編集</h1>
                </div>
                <FormPost submit={handleEditPost} isEditing={true} />
            </div>
        </div>
    );
};

export default EditPage;
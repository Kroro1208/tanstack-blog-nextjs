"use client";
import type { SubmitHandler } from "react-hook-form"
import type { FormInputPost } from "@/types/type"
import BackButton from "../components/BackButton";
import FormPost from "../components/ FormPost";

const CreatePage = () => {
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data)
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
                <FormPost submit={handleCreatePost} isEditing={false}/>
            </div>
        </div>
    )
}

export default CreatePage
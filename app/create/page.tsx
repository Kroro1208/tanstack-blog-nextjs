"use client";
import type { SubmitHandler } from "react-hook-form"
import FormPost from "../components/ FormPost"
import type { FormInputPost } from "@/types/type"

const CreatePage = () => {
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data)
    }
  return (
    <div>
        <h1 className="text-2xl text-center my-4 font-mono">新規作成</h1>
      <FormPost submit={handleCreatePost} isEditing={false}/>
    </div>
  )
}

export default CreatePage

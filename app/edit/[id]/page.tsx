"use client"
import FormPost from "@/app/components/ FormPost"
import type { FormInputPost } from "@/types/type"
import type { SubmitHandler } from "react-hook-form"

const EditPage = () => {
    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data)
    }
  return (
    <div>
        <h1 className="text-2xl text-center my-4 font-mono">記事の編集</h1>
      <FormPost submit={handleEditPost} isEditing={true}/>
    </div>
  )
}

export default EditPage

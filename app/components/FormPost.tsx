"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormInputPost } from "@/types/type";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useTags } from "../hooks/useTags";

interface FormPostProps {
  submit: (data: FormData) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  initialValue?: FormInputPost
}


const FormPost: React.FC<FormPostProps> = ({ submit, isEditing, initialValue, isSubmitting }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { dataTags, isLoadingTags } = useTags();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputPost>({
      defaultValues: initialValue
    });

    const watchImage = watch("imageUrl");

    useEffect(() => {
        if(watchImage && watchImage instanceof FileList && watchImage.length > 0) {
            const file = watchImage[0];
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            }
            fileReader.readAsDataURL(file);
        }        
    }, [watchImage]);

    const onSubmit: SubmitHandler<FormInputPost> = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('tagId', data.tagId);
        if(data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
            formData.append('imageUrl', data.imageUrl[0])
        } else if (typeof data.imageUrl === "string") {
            formData.append('imageUrl', data.imageUrl)
        }
        submit(formData);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
                <label className="label" htmlFor="title">
                    <span className="label-text text-white">タイトル</span>
                </label>
                <input
                    id="title"
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="タイトルを入力"
                    className="input input-bordered w-full text-white/60" />
                { errors.title && <span className="text-red-500 mt-2">タイトルは必須です</span> }
            </div>
            <div>
                <label className="label" htmlFor="image">
                    <span className="label-text text-white">画像</span>
                </label>
                <input
                    id="imageUrl"
                    type="file"
                    accept="image/*"
                    {...register("imageUrl")}
                    placeholder="画像をアップロード"
                    className="file-input file-input-bordered w-full text-white/60"/>
                {previewImage && (
                    <div>
                        <Image alt="blogImage" src={previewImage} width={200} height={200} className="mt-3"/>
                    </div>
                )}
            </div>
            <div className="form-control">
                <label className="label" htmlFor="content">
                    <span className="label-text text-white">内容</span>
                </label>
                <textarea
                    id="content"
                    {...register("content", { required: true })}
                    className="textarea textarea-bordered h-24 text-white/60"
                    placeholder="内容を入力"/>
                { errors.content && <span className="text-red-500 dark:text-red-400 mt-2">内容は必須です</span> }
            </div>
            {isLoadingTags ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-ring loading-lg text-white" />
                </div>
            ) : (
                <div className="form-control">
                    <label className="label" htmlFor="tag">
                        <span className="label-text text-white">タグ</span>
                    </label>
                    <select 
                        id="tag"
                        {...register("tagId", { required: "タグを選択してください" })} 
                        className="select select-bordered w-full text-white" 
                        defaultValue="">
                        <option value="" disabled>タグを選択</option>
                        { dataTags?.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    { errors.tagId && <span className="text-red-500 dark:text-red-400 mt-2">タグの選択は必須です</span> }
                </div>
            )}
           { isEditing ? (
                <button 
                    type="submit"
                    className={`btn btn-outline w-full btn-success ${isSubmitting ? 'loading' : ''} dark:text-white dark:border-white`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '更新中...' : '更新'}
                </button>
            ) : (
                <button 
                    type="submit" 
                    className={`btn btn-outline w-full btn-primary ${isSubmitting ? 'loading' : ''} dark:text-white dark:border-white`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '投稿中...' : '投稿'}
                </button>
            )}
        </form>
    );
};

export default FormPost;
"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormInputPost } from "@/types/type";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Tag } from "@prisma/client";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
}

const FormPost: React.FC<FormPostProps> = ({ submit, isEditing }) => {
    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await axios.get('/api/tags');
            return response.data;
        }
    })
    const { register, handleSubmit } = useForm<FormInputPost>();

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="form-control">
                <label className="label" htmlFor="title">
                    <span className="label-text">タイトル</span>
                </label>
                <input
                    id="title"
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="タイトルを入力"
                    className="input input-bordered w-full" />
            </div>
            <div className="form-control">
                <label className="label" htmlFor="content">
                    <span className="label-text">内容</span>
                </label>
                <textarea
                    id="content"
                    {...register("content", { required: true })}
                    className="textarea textarea-bordered h-24"
                    placeholder="内容を入力"/>
            </div>
            {isLoadingTags ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-ring loading-lg" />
                </div>
            ) : (
                <div className="form-control">
                    <label className="label" htmlFor="tag">
                        <span className="label-text">タグ</span>
                    </label>
                    <select 
                        id="tag"
                        {...register("tagId")} 
                        className="select select-bordered w-full" 
                        defaultValue="">
                        <option value="" disabled>タグを選択</option>
                        { dataTags?.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            )}
            { isEditing ? (
            <button type="button" className="btn btn-outline w-full btn-success">更新</button>
        ): (
            <button type="submit" className="btn btn-outline w-full btn-primary">投稿</button>
        )}
        </form>
    );
};

export default FormPost;
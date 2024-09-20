"use client";
import { useForm } from "react-hook-form"

const  FormPost = () => {
    const { register, handleSubmit } = useForm();
    const submit = (data) => {
        console.log(data);
    }
  return (
    <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center justify-center gap-5 mt-10" action="">
        <input
            {...register("title")}
            type="text"
            placeholder="タイトルを入力"
            className="input input-bordered w-full max-w-lg" />
        <textarea
            {...register("content")}
            className="textarea textarea-bordered w-full max-w-lg"
            placeholder="内容を入力"/>
        <select {...register("tag")} className="select select-bordered w-full max-w-lg">
            <option disabled selected>タグを選択</option>
            <option>tech</option>
            <option>business</option>
            <option>ai</option>
            <option>money</option>
            <option>management</option>
            <option>programing</option>
        </select>
        <button type="submit" className="btn btn-outline w-full max-w-lg btn-primary">投稿</button>
    </form>
  )
}

export default  FormPost

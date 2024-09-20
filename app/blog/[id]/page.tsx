import ButtonAction from "@/app/components/ButtonAction"

const PostDetailPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold my-4">記事の詳細</h2>
        <ButtonAction />
      </div>
      <p className="text-slate-700">タイトル</p>
    </div>
  )
}

export default PostDetailPage

import type { FC } from "react";
import { Calendar, Tag, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import ButtonAction from "@/app/components/ButtonAction";
import { db } from "@/lib/db";

interface BlogDetailProps {
  params: {
    id: string;
  }
}

async function getPost(id: string) {
  const response = await db.post.findFirst({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
      createdAt: true,
    },
  });
  return response;
}

const PostDetailPage: FC<BlogDetailProps> = async ({ params }) => {
  const post = await getPost(params.id);

  if (!post) {
    return <div className="text-center py-10">記事が見つかりません。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Tag className="w-4 h-4 mr-1" />
              {post.tag.name}
            </span>
          </div>
          <div className="prose max-w-none mb-6">
            {post.content}
          </div>
          <div className="flex justify-between items-center">
            <ButtonAction id={params.id}/>
            <div className="flex space-x-4">
              <button type="button" className="btn btn-ghost btn-sm">
                <ThumbsUp className="w-4 h-4 mr-1" />
                いいね
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                コメント
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                <Share2 className="w-4 h-4 mr-1" />
                シェア
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetailPage;
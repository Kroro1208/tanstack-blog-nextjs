"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar, Tag, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import ButtonAction from "@/app/components/ButtonAction";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Post {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
    tag: { name: string };
  }

interface BlogDetailProps {
    postId: string
}

const PostDetail: React.FC<BlogDetailProps> = ({ postId }) => {
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${postId}`);
      return response.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">読み込み中...</div>;
  if (error) return <div className="text-center py-10">エラーが発生しました。</div>;
  if (!post) return <div className="text-center py-10">記事が見つかりません。</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <Link href="/">
              <Button>戻る</Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Tag className="w-4 h-4 mr-1" />
              {post.tag.name}
            </span>
          </div>
          {post.image && (
            <div className="mb-6">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
          <div className="prose max-w-none mb-6">
            {post.content}
          </div>
          <div className="flex justify-between items-center">
            <ButtonAction id={postId}/>
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

export default PostDetail;
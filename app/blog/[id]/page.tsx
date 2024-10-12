import PostDetail from "@/app/components/PostDetail";

interface PostDetailPageProps {
  params: {
    id: string;
  }
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  return <PostDetail postId={params.id} />;
};

export default PostDetailPage;
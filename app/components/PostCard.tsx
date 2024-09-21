import Image from "next/image"
import thumnail from "../../public/pic1.jpeg"
import Link from "next/link"
import type { Tag } from "@prisma/client";
import type { FC } from "react";

interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        tag: Tag;
    }
}

const PostCard: FC<PostCardProps> = ({post}) => {
    const { title, content, tag } = post;
  return (
    <div className="card glass w-full">
        <figure>
            <Image
            src={thumnail}
            alt="car!" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{content}</p>
            <div className="badge badge-accent">{tag.name}</div>
            <div className="card-actions justify-end">
                <Link href="/blog/1">
                    <button type="button" className="btn btn-primary">記事を読む</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PostCard

import Image from "next/image"
import Link from "next/link"
import type { Tag } from "@prisma/client";
import type { FC } from "react";
import thumnail from "../../public/pic1.jpeg"

interface PostCardProps {
    post: {
        id: string;
        title: string;
        image: string | null;
        content: string;
        tag: Tag;
    }
}

const PostCard: FC<PostCardProps> = ({post}) => {
    const {id, title, image, content, tag } = post;
    const imageSrc = image ? image : thumnail;

    return (
        <div className="card glass w-full h-[400px] flex flex-col">
            <figure className="h-48 relative">
                <Image
                    src={imageSrc}
                    alt="thumbnail"
                    layout="fill"
                    objectFit="cover"
                />
            </figure>
            <div className="card-body flex-1 overflow-hidden">
                <h2 className="card-title text-lg font-bold mb-2 line-clamp-2">{title}</h2>
                <p className="mb-2 line-clamp-3 text-sm">{content}</p>
                <div className="badge badge-accent mb-2">{tag.name}</div>
                <div className="card-actions justify-end mt-auto">
                    <Link href={`/blog/${id}`}>
                        <button type="button" className="btn btn-primary btn-sm">記事を読む</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
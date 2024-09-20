import Image from "next/image"
import thumnail from "../../public/pic1.jpeg"
import Link from "next/link"

const PostCard = () => {
  return (
    <div className="card glass w-full">
        <figure>
            <Image
            src={thumnail}
            alt="car!" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
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

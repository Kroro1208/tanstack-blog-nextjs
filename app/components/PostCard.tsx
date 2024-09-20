import Image from "next/image"
import thumnail from "../../public/pic1.jpeg"

const PostCard = () => {
  return (
    <div className="card glass w-96">
        <figure>
            <Image
            src={thumnail}
            alt="car!" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end">
            <button type="button" className="btn btn-primary">Learn now!</button>
            </div>
        </div>
    </div>
  )
}

export default PostCard

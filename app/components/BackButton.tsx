import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      type='button' className="btn btn-active btn-neutral">
        <MoveLeft />戻る
    </button>
  )
}

export default BackButton

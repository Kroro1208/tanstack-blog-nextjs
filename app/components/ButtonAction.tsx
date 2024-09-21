"use client"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

interface ButtonActionProps {
  id: string
}

const ButtonAction: FC<ButtonActionProps> = ({id}) => {
  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: async() => {
      return axios.delete(`/api/posts/${id}`)
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/")
      router.refresh();
    }
  })
  return (
    <div className='flex gap-2'>
      <Link href="/edit/1">
        <button type='button' className="btn btn-outline btn-success">
            <Pencil />編集
        </button>
      </Link>
      <button
        onClick={() => {
          if(confirm('本当にこの投稿を削除しますか？')) {
            deletePost();
          }
        }}
        type='button'
        className="btn btn-outline btn-error"
      >
        <Trash2 />削除
      </button>
      </div>
  )
}

export default ButtonAction

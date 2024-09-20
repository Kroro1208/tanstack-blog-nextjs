import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ButtonAction = () => {
  return (
    <div className='flex gap-2'>
      <Link href="/edit/1">
        <button type='button' className="btn btn-outline btn-success">
            <Pencil />編集
        </button>
      </Link>
      <button type='button' className="btn btn-outline btn-error">
        <Trash2 />削除
      </button>
      </div>
  )
}

export default ButtonAction

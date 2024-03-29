import { GuestbookData } from '@/lib/types'
import { useSWRConfig } from 'swr'

import type { ClickEvent } from '@/lib/types'

type GuestBookEntryProps = {
  entry: GuestbookData
  user:
    | {
        isAdmin?: boolean | null | undefined
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
}

export default function GuestbookEntry({ entry, user }: GuestBookEntryProps) {
  const { mutate } = useSWRConfig()
  const deleteEntry = async (e: ClickEvent) => {
    e.preventDefault()

    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE'
    })

    mutate('/api/guestbook')
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full break-words prose dark:prose-dark">
        {entry.body}
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {entry.created_by}
        </p>
        <span className=" text-gray-600 dark:text-[#c2c2c2]">/</span>
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {new Date(entry.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}
        </p>
        {user && (entry.email === user.email || user.isAdmin) && (
          <>
            <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
            <button
              className="text-sm text-red-600 dark:text-red-400"
              onClick={deleteEntry}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

import { Suspense, useRef, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import { comment } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import fetcher from '@/lib/fetcher'
import ErrorMessage from '@/components/guestbook/ErrorMessage'
import LoadingSpinner from '@/components/guestbook/LoadingSpinner'
import SuccessMessage from '@/components/guestbook/SuccessMessage'
import GoogleIcon from '@/components/icons/google-icon'
import GitHubIcon from '@/components/icons/github-icon'

import { ClickEvent, Form, type FormState } from '@/lib/types'

const Comment = ({ slug }: { slug: string }) => {
  const { data: session } = useSession()

  const inputEl = useRef<HTMLInputElement | null>(null)
  const [form, setForm] = useState<FormState>({ state: Form.Initial })

  const { data: entries, mutate } = useSWR<comment[]>(
    `/api/comment?post=${slug}`,
    fetcher
  )

  const onSubmit = async (e: ClickEvent) => {
    e.preventDefault()
    setForm({ state: Form.Loading })

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error })
      return
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: 'Please enter a message' })
      return
    }

    const res = await fetch('/api/comment?slug=' + slug, {
      body: JSON.stringify({
        body: inputEl.current.value,
        slug
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const { error } = await res.json()
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      })
      return
    }

    inputEl.current.value = ''
    mutate()
    setForm({
      state: Form.Success,
      message: 'Hooray! Thanks for leaving a comment.'
    })
  }

  const deleteEntry = async (e: ClickEvent, entryId: bigint) => {
    e.preventDefault()

    await fetch(`/api/comment/${entryId}`, {
      method: 'DELETE'
    })

    mutate()
  }

  return (
    <div className="mt-10 w-full pt-4">
      <p className="mb-2 text-xl font-semibold">Comments</p>
      <form onSubmit={onSubmit} className="relative">
        {session && (
          <>
            <input
              aria-label="Leave a comment"
              placeholder="Leave a comment"
              ref={inputEl}
              required
              disabled={!session}
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-50 bg-gray-200 py-2 pl-4 pr-32 text-gray-900 focus:border-primary focus:ring-primary dark:border-blue-opaque dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              className="absolute right-1 top-1 flex h-8 w-28 items-center justify-center rounded bg-gray-100 px-4 py-1 font-medium text-gray-900 dark:bg-gray-600 dark:text-gray-100"
              disabled={!session}
              type="submit"
            >
              {form.state === Form.Loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-800 dark:text-gray-200" />
              ) : (
                'Send'
              )}
            </button>
            <div className="mt-1">
              {form.state === Form.Error ? (
                <ErrorMessage>{form.message as string}</ErrorMessage>
              ) : form.state === Form.Success ? (
                <SuccessMessage>{form.message as string}</SuccessMessage>
              ) : null}
            </div>
            <div className="mt-1 ml-1">
              <button
                type="button"
                onClick={() => signOut()}
                className="mt-2 mr-2 h-8 w-28 rounded bg-gray-200 px-4 py-1 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              >
                Logout
              </button>
              Logged in as {session.user?.name} ({session.user?.email})
            </div>
          </>
        )}
        {!session && (
          <div className="my-1 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="mr-2 mb-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              onClick={() => {
                signIn('github')
              }}
            >
              <GitHubIcon className="mr-2 -ml-1 h-4 w-4" />
              Sign in with GitHub
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
              onClick={() => {
                signIn('google')
              }}
            >
              <GoogleIcon className="mr-2 -ml-1 h-4 w-4" />
              Sign in with Google
            </button>
          </div>
        )}
      </form>
      <div className="mt-4 space-y-8">
        <Suspense>
          {entries &&
            entries.length > 0 &&
            entries.map(entry => (
              <div
                className="flex flex-col space-y-2"
                key={entry.id.toString()}
              >
                <div className="prose w-full break-words dark:prose-dark">
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
                      day: 'numeric'
                    })}
                  </p>
                  {session?.user &&
                    (entry.email === session?.user?.email ||
                      session.user.isAdmin) && (
                      <>
                        <span className="text-gray-600 dark:text-[#c2c2c2]">
                          /
                        </span>
                        <button
                          className="text-sm text-red-600 dark:text-red-400"
                          onClick={e => deleteEntry(e, entry.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            ))}
          {entries && entries.length === 0 && <p>No comments yet</p>}
        </Suspense>
      </div>
    </div>
  )
}

export default Comment

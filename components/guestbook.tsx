import { useState, useRef, Suspense } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import GuestbookEntry from './guestbook/guestbook-entry'
import fetcher from '@/lib/fetcher'
import SuccessMessage from '@/components/guestbook/SuccessMessage'
import ErrorMessage from '@/components/guestbook/ErrorMessage'
import GoogleIcon from '@/components/icons/google-icon'
import GitHubIcon from '@/components/icons/github-icon'

import { ClickEvent, Form, type FormState, GuestbookData } from '@/lib/types'

export default function Guestbook({
  fallbackData
}: {
  fallbackData: GuestbookData[]
}) {
  const { data: session } = useSession()
  const [form, setForm] = useState<FormState>({ state: Form.Initial })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(null)
  const { data: entries, mutate } = useSWR<GuestbookData[]>(
    '/api/guestbook',
    fetcher,
    {
      fallbackData
    }
  )

  const leaveEntry = async (e: ClickEvent) => {
    e.preventDefault()
    setForm({ state: Form.Loading })

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: 'Please Enter a Message' })
      return
    }

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: inputEl.current.value
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
      message: 'Hooray! Thanks for signing my Guestbook.'
    })
  }

  return (
    <>
      {session?.user && (
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          Logged In as {session?.user?.email} (
          <button onClick={() => signOut()} className="underline">
            Logout
          </button>
          )
        </p>
      )}
      <div className="w-full p-6 my-4 border border-blue-200 rounded dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
        <h2 className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">
          Sign the Guestbook
        </h2>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
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
        {session?.user && (
          <form className="relative my-4" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label="Your message"
              placeholder="Your message..."
              required
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-50 bg-white py-2 pl-4 pr-32 text-gray-900 focus:border-primary focus:ring-primary dark:border-blue-opaque dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="absolute flex items-center justify-center h-8 px-4 py-1 font-medium text-gray-900 bg-gray-100 rounded right-1 top-1 dark:bg-gray-700 dark:text-gray-100 w-28"
              type="submit"
            >
              {form.state === Form.Loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-800 dark:text-gray-200" />
              ) : (
                'Send'
              )}
            </button>
          </form>
        )}
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message as string}</ErrorMessage>
        ) : form.state === Form.Success ? (
          <SuccessMessage>{form.message as string}</SuccessMessage>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Your information is only used to display your name and reply by
            email.
          </p>
        )}
      </div>
      <div className="mt-4 space-y-8">
        <Suspense>
          {entries &&
            entries.map(entry => (
              <GuestbookEntry
                key={entry.id.toString()}
                entry={entry}
                user={session?.user}
              />
            ))}
        </Suspense>
      </div>
    </>
  )
}

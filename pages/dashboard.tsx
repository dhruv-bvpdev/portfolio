import { Suspense } from 'react'
import useSWR from 'swr'
import { signIn, signOut, useSession } from 'next-auth/react'
import Layout from '@/components/layout'
import Metric from '@/components/metric'
import Tracks from '@/components/top-tracks'
import fetcher from '@/lib/fetcher'
import { healthData, Views } from '@/lib/types'

export default function Dashboard(): JSX.Element {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    }
  })

  const { data } = useSWR<healthData>('/api/health', fetcher)
  const { data: guestbookCount } = useSWR<{ count: number }>(
    '/api/guestbook?count=true',
    fetcher
  )

  const { data: commentCount } = useSWR<{ count: number }>(
    '/api/comment?count=true',
    fetcher
  )

  const { data: viewsData } = useSWR<Views>('/api/views', fetcher)

  if (!session || !session.user.isAdmin) {
    return (
      <Layout title="Dashboard - Dhruv Gursahani">
        <div className="mx-auto my-10 text-lg font-bold">
          Not authenticated/authorized
          <div
            className="mt-2 cursor-pointer text-sm font-normal"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Logout
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Suspense>
        <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Dashboard
          </h1>
          <p className="mb-2">
            Logged in as {session.user?.email} (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="underline"
            >
              Logout
            </button>
            )
          </p>
          <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Metric title="Status">
              <span
                className={data?.status ? 'text-green-600' : 'text-red-600'}
              >
                {data?.status}
              </span>
            </Metric>
            <Metric title="Environment">{data?.env}</Metric>

            <h2 className="mt-3 text-xl font-bold sm:col-span-2">Health</h2>
            <Metric title="Uptime">{data?.uptime}</Metric>
            <Metric title="Rss">{data?.mem.rss}</Metric>
            <Metric title="Heap total">{data?.mem.heapTotal}</Metric>
            <Metric title="Heap used">{data?.mem.heapUsed}</Metric>
            <Metric title="External">{data?.mem.external}</Metric>
            <Metric title="Array buffers">{data?.mem.arrayBuffers}</Metric>

            <h2 className="mt-3 text-xl font-bold sm:col-span-2">Deployment</h2>
            <Metric title="Deployed">{data?.vercel.deployed.toString()}</Metric>
            <Metric title="Vercel environment">{data?.vercel.env}</Metric>

            <h2 className="mt-3 text-xl font-bold sm:col-span-2">
              Blog/Guestbook
            </h2>
            <Metric title="Blog total views">{viewsData?.total}</Metric>
            <Metric title="Blog comments">{commentCount?.count}</Metric>
            <Metric title="Guestbook entries">{guestbookCount?.count}</Metric>
          </div>
          <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
            Top Spotify Tracks
          </h2>
          <Tracks />
        </div>
      </Suspense>
    </Layout>
  )
}

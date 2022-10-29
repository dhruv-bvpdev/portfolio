import Link from 'next/link'

import Layout from '@/components/layout'

export default function NotFound(): JSX.Element {
  return (
    <Layout title="404 - Dhruv Gursahani">
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          404 – Page not found
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Why show a generic 404 when I can make it sound mysterious? It seems
          you&apos;ve found something that used to exist, or you spelled
          something wrong. I&apos;m guessing you spelled something wrong. Can
          you double check that URL?
        </p>
        <Link href="/">
          <a className="w-64 p-1 py-3 mx-auto font-bold text-center text-black bg-gray-200 sm:p-4 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-[#c9c9c9] rounded-md dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </Layout>
  )
}

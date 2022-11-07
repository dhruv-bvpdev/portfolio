import { PropsWithChildren, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { parseISO, format } from 'date-fns'
import Layout from '../layout'
import type { Blog } from 'contentlayer/generated'

const Comment = dynamic(() => import('@/components/comment'), {
  suspense: true
})
const ViewCounter = dynamic(() => import('@/components/blog/ViewCounter'), {
  suspense: true
})

const editUrl = (slug: string) =>
  `https://github.com/dhruv-bvpdev/portfolio/edit/main/data/blog/${slug}.mdx`

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Blog }>) {
  return (
    <Layout
      title={`${post.title} – Dhruv Gursahani`}
      description={post.summary}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
      tags={post.tags}
    >
      <article className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Dhruv Gursahani"
              height={24}
              width={24}
              src="/static/images/profilePic.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-[#c2c2c2]">
              {'Dhruv Gursahani / '}
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#c2c2c2] min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <Suspense>
              <ViewCounter slug={post.slug} />
            </Suspense>
          </p>
        </div>
        <div className="mt-2 flex w-full text-xs">
          {post.tags.split(',').map(tag => (
            <Link
              href={`/blog?filter=tag&search=${tag}`}
              key={tag}
              className="mx-2 rounded-xl border border-gray-600 px-2 py-1 hover:bg-gray-200 dark:border-gray-400 dark:hover:bg-gray-600"
            >
              {tag}
            </Link>
          ))}
        </div>
        <Suspense>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
          <Comment slug={post.slug} />
        </Suspense>
      </article>
    </Layout>
  )
}

import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import type { Views } from '@/lib/types'
import type { Blog } from '../../.contentlayer/generated'

export default function BlogPost({
  title,
  summary,
  slug,
  publishedAt,
  tags
}: Pick<Blog, 'title' | 'summary' | 'slug' | 'publishedAt' | 'tags'>) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  return (
    <div className="mb-8 w-full md:rounded-md md:p-3 md:hover:bg-gray-200 md:dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between md:flex-row">
        <Link
          href={`/blog/${slug}`}
          className="mb-2 w-full cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl"
        >
          {title}
        </Link>
        <p className="mb-4 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
          {`${views ? new Number(views).toLocaleString() : '–––'} views`} |{' '}
          {new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
      <p className="text-gray-600 dark:text-[#c2c2c2]">{summary}</p>
      <div className="mt-1 flex">
        {tags &&
          tags.split(',').map((tag, key) => {
            return (
              <div key={key} className="mx-2 text-primary">
                <Link href={`/blog?search=${tag}&filter=tag`} replace shallow>
                  {tag}
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

/* 

<div className="w-full">
      <div className="mb-8 w-full">
        <div className="flex flex-col justify-between md:flex-row">
          <Link
            href={`/blog/${slug}`}
            className="mb-2 w-full text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl"
          >
            {title}
          </Link>
          <p className="mb-4 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
            {`${views ? new Number(views).toLocaleString() : '–––'} views`} |{' '}
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        <p className="text-gray-600 dark:text-[#c2c2c2]">{summary}</p>
        <div className="mt-1 flex">
          {tags &&
            tags.split(',').map((tag, key) => {
              return (
                <div key={key} className="mx-2 text-primary">
                  <Link href={`/blog?search=${tag}&filter=tag`} replace shallow>
                    {tag}
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>

*/

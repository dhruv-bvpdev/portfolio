import { useMemo, useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import Layout from '@/components/layout'
import BlogPost from '@/components/blog/BlogPost'
import { pick } from 'contentlayer/client'

type Post = {
  publishedAt: string
  slug: string
  summary: string
  tags: string
  title: string
}

export default function Blog({ posts }: { posts: Post[] }) {
  const { query } = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filterBy, setFilterBy] = useState<'name' | 'tag'>('name')

  useEffect(() => {
    if (query.search) {
      setSearchValue(query.search.toString())
    }
    if (query.filter) {
      setFilterBy(query.filter === 'tag' ? 'tag' : 'name')
    }
  }, [query])

  const filteredBlogPosts = useMemo(() => {
    return posts.filter(post => {
      if (filterBy === 'name') {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      }
      if (filterBy === 'tag') {
        return post.tags
          .split(',')
          .some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
      }
    })
  }, [posts, filterBy, searchValue])

  return (
    <Layout
      title="Blog – Dhruv Gursahani"
      description="Thoughts on programming, tech, music, and my personal life."
    >
      <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {/* {t('blog-description').replace('$AMOUNT', posts.length.toString())} */}
          Blog Description
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search articles"
            defaultValue={searchValue}
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-500"
          />
          <svg
            className="absolute right-12 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 14 14"
            onClick={() => setShowDropdown(!showDropdown)}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
          </svg>
          <svg
            className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 ${
              !showDropdown && 'hidden'
            }`}
          >
            <div className="py-1">
              <p className="text-semibold mb-1 block border-b px-4 py-2 text-sm text-gray-700 dark:border-gray-300 dark:text-gray-200">
                Filter
              </p>
              <div
                className={`block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                  filterBy === 'name' && 'font-bold'
                }`}
                onClick={() => {
                  setFilterBy('name')
                  setShowDropdown(false)
                }}
              >
                Name
              </div>
              <div
                className={`block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                  filterBy === 'tag' && 'font-bold'
                }`}
                onClick={() => {
                  setFilterBy('tag')
                  setShowDropdown(false)
                }}
              >
                Tag
              </div>
            </div>
          </div>
        </div>
        <Suspense>
          <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts ({filteredBlogPosts.length})
          </h2>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map(post => (
            <BlogPost key={post.title} {...post} />
          ))}
        </Suspense>
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const posts = allBlogs
    .map(post =>
      pick(post, ['slug', 'title', 'summary', 'publishedAt', 'tags'])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )

  return { props: { posts } }
}

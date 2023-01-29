import { useMemo, useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Search } from 'lucide-react'
import { allBlogs } from 'contentlayer/generated'
import Layout from '@/components/layout'
import { pick } from 'contentlayer/client'

const BlogPost = dynamic(() => import('@/components/blog/BlogPost'), {
  suspense: true
})

const BlogFilter = dynamic(() => import('@/components/blog/BlogFilter'), {
  suspense: true
})

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
          I&apos;ve been writing mostly about web devlopment and random stuff.
          In total, I&apos;ve written {filteredBlogPosts.length} articles on
          this blog. Use the search below to filter by title.
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search articles"
            defaultValue={searchValue}
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-500"
          />
          <Suspense>
            <BlogFilter filterBy={filterBy} setFilter={setFilterBy} />
          </Suspense>
          <Search className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300" />
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

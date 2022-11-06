import RSS from 'rss'
import type { GetServerSideProps } from 'next'
import { allBlogs } from 'contentlayer/generated'

type Post = {
  publishedAt: string
  slug: string
  summary: string
  tags: string
  title: string
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: 'Dhruv Gursahani',
    site_url: 'https://dhruvgursahani.vercel.app',
    feed_url: 'https://dhruvgursahani.vercel.app/feed.xml'
  })

  allBlogs.map((post: Post) => {
    feed.item({
      title: post.title,
      url: `https://dhruvgursahani.vercel.app/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary
    })
  })

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  )
  res.write(feed.xml({ indent: true }))
  res.end()

  return {
    props: {}
  }
}

export default function RSSFeed() {
  return null
}

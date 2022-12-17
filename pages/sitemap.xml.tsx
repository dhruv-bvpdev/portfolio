import type { GetServerSideProps } from 'next'
import { allBlogs } from 'contentlayer/generated'

const createSitemap = (
  slugs: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${slugs
              .map(slug => {
                return `
                  <url>
                      <loc>${`https://dhruvgursahani.vercel.app/${slug}`}</loc>
                  </url>
              `
              })
              .join('')}
      </urlset>
  `

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPages = [
    ...allBlogs.map(({ slug }: { slug: string }) => `blog/${slug}`),
    ...[
      '',
      'blog',
      'dashboard',
      'guestbook',
      'projects',
      'about',
      'tweets',
      'uses'
    ]
  ]

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  )
  res.write(createSitemap(allPages))
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  return null
}

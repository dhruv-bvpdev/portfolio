import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogs } from 'contentlayer/generated'
import components from '@/components/blog/MDXComponents'
import BlogLayout from '@/components/blog/Layout'
import type { Blog } from 'contentlayer/generated'

type Post = {
  slug: string
}

export default function Post({ post }: { post: Blog }) {
  const Component = useMDXComponent(post.body.code)

  return (
    <BlogLayout post={post}>
      <Component
        components={
          {
            ...components
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
      />
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths: any = []

  allBlogs.map((post: Post) => {
    paths.push({ params: { slug: post.slug } })
  })

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = allBlogs.find((post: Post) => post.slug === params.slug)

  return { props: { post } }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import Image, { ImageProps } from 'next/future/image'
import Step from '@/components/blog/MDXComponents/Step'
import ProsCard from '@/components/blog/MDXComponents/ProsCard'
import ConsCard from '@/components/blog/MDXComponents/ConsCard'
import ImageWithTheme from '@/components/blog/MDXComponents/ImageWithTheme'
import CodeBlock from '@/components/blog/MDXComponents/CodeBlock'

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image className="rounded-lg" {...props} />
}

const MDXComponents = {
  Image: RoundedImage,
  ImageWithTheme,
  a: CustomLink,
  ConsCard,
  ProsCard,
  Step,
  pre: CodeBlock
}

export default MDXComponents

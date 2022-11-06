import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

type Props = {
  title?: string
  description?: string
  type?: string
  date?: string
  tags?: string[] | string
}

const Meta = ({
  title = 'Dhruv Gursahani',
  type = 'website',
  description = 'Full Stack Developer',
  date,
  tags
}: Props): JSX.Element => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { theme } = useTheme()

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="description" content={description} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {mounted && (
        <meta
          name="theme-color"
          content={theme === 'light' ? '#f9fafb' : '#000000'}
        />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dhruv Gursahani" />
      <meta
        property="og:url"
        content={`https://dhruvgursahani.vercel.app${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`https://dhruvgursahani.vercel.app${router.asPath}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={`/api/og${
          title !== 'Dhruv Gursahani' ? '?title=' + title : ''
        }`}
      />
      {date && <meta property="article:published_time" content={date} />}
      {tags && (
        <meta
          property="article:tag"
          content={Array.isArray(tags) ? tags.join(', ') : tags}
        />
      )}
      {tags ? (
        <meta
          property="keywords"
          content={Array.isArray(tags) ? tags.join(', ') : tags}
        />
      ) : (
        <meta
          name="keywords"
          content="Dhruv Gursahani Portfolio Next TailwindCSS Blog"
        />
      )}
      <meta name="application-name" content="Dhruv Gursahani" />
      <meta name="author" content="Dhruv Gursahani" />
      <meta name="HandheldFriendly" content="true" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/icon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/icon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/icon/favicon-16x16.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://dhruvgursahani.vercel.app/"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        name="twitter:image:src"
        content={`/api/og${
          title !== 'Dhruv Gursahani' ? '?title=' + title : ''
        }`}
      />
      <meta
        name="google-site-verification"
        content="jjADQI8P4PYTDWk295B52qPwlragOXOWOhwAS9f7rD8"
      />
    </Head>
  )
}

export default Meta

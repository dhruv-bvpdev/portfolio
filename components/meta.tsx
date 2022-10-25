import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Head from 'next/head'

const Meta = ({
  title = 'Dhruv Gursahani'
}: {
  title?: string
}): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { theme } = useTheme()

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link
        rel="preload"
        href="static/fonts/ibm-plex-sans-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="description" content="Full-Stack developer" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {mounted && (
        <meta
          name="theme-color"
          content={theme === 'light' ? '#ffffff' : '#000000'}
        />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dhruv Gursahani" />
      <meta property="og:url" content="https://dhruvgursahani.vercel.app/" />
      <meta property="og:description" content="Full Stack Developer" />
      <meta property="og:title" content={title} />
      <meta name="application-name" content="Dhruv Gursahani" />
      <meta
        name="keywords"
        content="Dhruv Gursahani Portfolio Next TailwindCSS Blog"
      />
      <meta name="author" content="Dhruv Gursahani" />
      <meta name="HandheldFriendly" content="true" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://dhruvgursahani.vercel.app/"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content="Full Stack developer" />
    </Head>
  )
}

export default Meta

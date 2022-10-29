import { Suspense } from 'react'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import NProgress from 'nprogress'
import Analytics from '@/components/Analytics'
import '../styles/globals.css'
import 'nprogress/nprogress.css'

const CommandPalette = dynamic(() => import('../components/command-palette'), {
  suspense: true
})

Router.events.on('routeChangeStart', (_url, { shallow }) => {
  if (!shallow) {
    NProgress.start()
  }
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({
  Component,
  pageProps
}: AppProps<{ session: Session }>): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Suspense>
          <CommandPalette />
        </Suspense>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp

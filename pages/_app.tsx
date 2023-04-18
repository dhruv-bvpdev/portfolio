import { Suspense } from 'react'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { Inter } from '@next/font/google'
import NProgress from 'nprogress'
import Analytics from '../components/analytics'
import '../styles/globals.css'
import 'nprogress/nprogress.css'

const inter = Inter({ subsets: ['latin'] })

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
        <div className={inter.className}>
          <Suspense>
            <CommandPalette />
          </Suspense>
          <Component {...pageProps} />
          <Analytics />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp

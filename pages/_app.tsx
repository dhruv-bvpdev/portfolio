import type { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import NProgress from 'nprogress'
import '../styles/globals.css'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', (url, { shallow }) => {
  if (!shallow) {
    NProgress.start()
  }
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

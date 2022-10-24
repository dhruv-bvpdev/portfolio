import type { ReactNode } from 'react'
import Meta from './meta'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="bg-gray-50 dark:bg-gray-900">
    <Meta />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <Navbar />
    <main
      id="skip"
      className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
    >
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout

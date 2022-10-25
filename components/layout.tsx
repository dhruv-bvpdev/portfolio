import type { ReactNode } from 'react'
import Meta from './meta'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="bg-gray-50 dark:bg-gray-800">
    <Meta />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <div className="sticky-nav bg-gray-50 dark:bg-gray-800">
      <Navbar />
    </div>
    <main
      id="skip"
      className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800"
    >
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout

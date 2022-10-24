import type { ReactNode } from 'react'
import Meta from './meta'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="bg-white dark:bg-black">
    <Meta />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <Navbar />
    <main
      id="skip"
      className="flex flex-col justify-center px-8 bg-white dark:bg-black"
    >
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout

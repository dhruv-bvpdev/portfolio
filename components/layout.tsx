import type { ReactNode } from 'react'
import Meta from './meta'
import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  type?: string
  date?: string
  tags?: string[] | string
}

const Layout = ({
  children,
  title,
  description,
  type,
  date,
  tags
}: Props): JSX.Element => (
  <div className="bg-gray-50 dark:bg-gray-800">
    <Meta
      title={title}
      type={type}
      description={description}
      date={date}
      tags={tags}
    />
    <a href="#skip" className="skip-nav">
      Skip to content
    </a>
    <header className="frost-effect sticky top-0 z-50">
      <Navbar />
    </header>
    <main
      id="skip"
      className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800 md:mt-6"
    >
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout

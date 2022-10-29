import { ReactNode, Suspense } from 'react'
import { useAtom } from 'jotai'
import { isCommandPaletteOpenAtom } from './command-palette'
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
}: Props): JSX.Element => {
  const [isCommandPaletteOpen] = useAtom(isCommandPaletteOpenAtom)

  return (
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
      <header
        className={`frost-effect sticky top-0 ${
          isCommandPaletteOpen ? '' : 'z-50'
        }`}
      >
        <Navbar />
      </header>
      <main
        className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800 md:mt-6"
        id="skip"
      >
        {children}
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Layout

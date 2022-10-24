import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import MobileMenu from '@/components/mobile-menu'
import ThemeToggleIcon from './icons/theme-icon'

const Navbar = (): JSX.Element => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  function scrollTo(event: { preventDefault: () => void }, anchor: string) {
    event && event.preventDefault()

    if (router.pathname !== '/') {
      router.push('/#' + anchor)
    }

    const elementToView = document.getElementById(anchor)
    elementToView?.scrollIntoView()

    history.replaceState(
      '',
      document.title,
      window.location.origin + window.location.pathname + window.location.search
    )
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full max-w-4xl p-4 md:p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black dark:text-gray-100">
      <div>
        <MobileMenu />
        <div className="md:w-0">
          <Link href="/">
            <a
              id="nav-home"
              onClick={event => scrollTo(event, 'top')}
              className="m-1 text-gray-900 sm:m-4 dark:text-gray-100 invisible md:visible"
            >
              <span className="border-gray-800 dark:border-gray-300 hover:border-b-2">
                Home
              </span>
            </a>
          </Link>
          <Link href="/">
            <a
              id="nav-about"
              onClick={event => scrollTo(event, 'about')}
              className="m-1 text-gray-900 sm:m-4 dark:text-gray-100 invisible md:visible"
            >
              <span className="border-gray-800 dark:border-gray-300 hover:border-b-2">
                About
              </span>
            </a>
          </Link>
          <Link href="/">
            <a
              id="nav-projects"
              onClick={event => scrollTo(event, 'projects')}
              className="m-1 text-gray-900 sm:m-4 dark:text-gray-100 invisible md:visible"
            >
              <span className="border-gray-800 dark:border-gray-300 hover:border-b-2">
                Projects
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <button
          id="dark-mode-toggle"
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-10 h-10 p-3 bg-gray-200 rounded-lg dark:bg-gray-800 mr-1 md:mr-3 ring-gray-300 hover:ring-4"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <ThemeToggleIcon theme={theme} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar

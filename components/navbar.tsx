import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import MobileMenu from '@/components/mobile-menu'
import ThemeToggleIcon from './icons/theme-icon'
import MenuIcon from './icons/menu-icon'
import CrossIcon from './icons/cross-icon'
import styles from 'styles/mobile-menu.module.css'

const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { resolvedTheme, setTheme } = useTheme()

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = ''
    } else {
      setIsMenuOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <nav className="ticky top-0 z-50 mx-auto my-0 w-full max-w-4xl items-center justify-between px-4 pb-6 pt-1 text-gray-900 dark:text-gray-100 md:my-4 md:flex md:p-4">
      <div>
        <Link href="/">
          <a
            id="nav-home"
            className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
              router.asPath === '/' ? 'font-semibold' : ''
            }`}
          >
            <span className="dark:link-underline link-underline-black py-1">
              Home
            </span>
          </a>
        </Link>
        <Link href="/about">
          <a
            id="nav-about"
            className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
              router.pathname === '/about' ? 'font-semibold' : ''
            }`}
          >
            <span className="dark:link-underline link-underline-black py-1">
              About
            </span>
          </a>
        </Link>
        <Link href="/projects">
          <a
            id="nav-projects"
            className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
              router.pathname === '/projects' ? 'font-semibold' : ''
            }`}
          >
            <span className="dark:link-underline link-underline-black py-1">
              Projects
            </span>
          </a>
        </Link>
        <Link href="/blog">
          <a
            id="nav-blog"
            className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
              router.pathname === '/blog' ? 'font-semibold' : ''
            }`}
          >
            <span className="dark:link-underline link-underline-black py-1">
              Blog
            </span>
          </a>
        </Link>
        <Link href="/guestbook">
          <a
            id="nav-guestbook"
            className={`m-1 hidden text-gray-900 dark:text-gray-100 sm:m-4 md:inline ${
              router.pathname === '/guestbook' ? 'font-semibold' : ''
            }`}
          >
            <span className="dark:link-underline link-underline-black py-1">
              Guestbook
            </span>
          </a>
        </Link>
      </div>
      <div className="flex justify-between">
        <button
          id="burger"
          className={cn(styles.burger, 'visible md:hidden')}
          aria-label="Toggle menu"
          type="button"
          onClick={toggleMenu}
        >
          <MenuIcon data-hide={isMenuOpen} />
          <CrossIcon data-hide={!isMenuOpen} />
        </button>
        <div>
          <button
            id="dark-mode-toggle"
            aria-label="Toggle Dark Mode"
            type="button"
            className="mr-1 h-10 w-10 rounded-lg bg-gray-200 p-3 ring-gray-300 hover:ring-4 dark:bg-gray-700 md:mr-3"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && <ThemeToggleIcon theme={resolvedTheme} />}
          </button>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} />
    </nav>
  )
}

export default Navbar

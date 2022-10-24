import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MenuIcon from '@/components/icons/menu-icon'
import CrossIcon from '@/components/icons/cross-icon'

const MobileMenu = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

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

    setIsMenuOpen(false)
  }

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }

  return (
    <>
      <button
        className="burger visible md:hidden"
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>

      <ul
        className={`menu flex flex-col absolute bg-gray-50 dark:bg-gray-900 mt-4 md:hidden ${
          isMenuOpen ? 'menuRendered' : ''
        }`}
      >
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}
        >
          <Link href="/">
            <a
              onClick={event => scrollTo(event, 'top')}
              className="ml-4 p-1 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
            >
              Home
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}
        >
          <Link href="/">
            <a
              onClick={event => scrollTo(event, 'about')}
              className="ml-4 p-1 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
            >
              About
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}
        >
          <Link href="/">
            <a
              onClick={event => scrollTo(event, 'projects')}
              className="ml-4 p-1 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
            >
              Projects
            </a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default MobileMenu

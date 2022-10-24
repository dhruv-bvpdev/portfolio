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
    router.push('/#' + anchor)
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
        className="visible burger md:hidden"
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
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
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
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
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
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100"
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

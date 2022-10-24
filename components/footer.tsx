import Link from 'next/link'
import { useRouter } from 'next/router'
import ExternalLink from './link-external'

export default function Footer(): JSX.Element {
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
  }

  return (
    <div className="flex flex-col justify-center px-8 bg-white dark:bg-black">
      <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
        <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
        <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a
                onClick={event => scrollTo(event, 'top')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                Home
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={event => scrollTo(event, 'about')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                About
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={event => scrollTo(event, 'projects')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                Projects
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="#">Twitter</ExternalLink>
            <ExternalLink href="">GitHub</ExternalLink>
            <Link href="/dashboard">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition">
                Dashboard
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="">My setup</ExternalLink>
            <ExternalLink href="">Source code</ExternalLink>
            <ExternalLink href="">Contact</ExternalLink>
            <a
              href="mailto:dhruv.gursahani@outlook.com"
              className="text-gray-500 hover:text-gray-600 transition"
            >
              Email
            </a>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mx-auto">
          Powered by{' '}
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://tailwindcss.com/">
            TailwindCss
          </ExternalLink>
          . Hosted on{' '}
          <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
        </p>
      </footer>
    </div>
  )
}

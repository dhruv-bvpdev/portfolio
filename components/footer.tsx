import Link from 'next/link'
import ExternalLink from './link-external'
import NowPlaying from './now-playing'

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800">
      <footer className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-8">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <NowPlaying />
        <div className="w-full max-w-2xl pb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                About
              </a>
            </Link>
            <Link href="/projects">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                Projects
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/blog">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                Blog
              </a>
            </Link>
            <Link href="/guestbook">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                Guestbook
              </a>
            </Link>
            <ExternalLink href="https://twitter.com/dhruv_gursahani">
              Twitter
            </ExternalLink>
            <ExternalLink href="https://github.com/dhruv-bvpdev">
              GitHub
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="">My setup</ExternalLink>
            <ExternalLink href="https://github.com/dhruv-bvpdev/portfolio">
              Source code
            </ExternalLink>
            <ExternalLink href="">Contact</ExternalLink>
            <a
              href="mailto:dhruv.gursahani@outlook.com"
              className="text-gray-500 hover:text-gray-600 transition"
            >
              Email
            </a>
          </div>
        </div>
        <p className="mx-auto text-sm text-gray-500 dark:text-gray-300">
          Powered by{' '}
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://tailwindcss.com/">
            TailwindCSS
          </ExternalLink>
          . Hosted on{' '}
          <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
        </p>
      </footer>
    </div>
  )
}

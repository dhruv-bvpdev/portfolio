import Link from 'next/link'
import ExternalLink from './link-external'
import NowPlaying from './now-playing'

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800">
      <footer className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-8">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <NowPlaying />
        <div className="w-full max-w-3xl pb-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              id="footer-home"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              id="footer-about"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              id="footer-projects"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition"
            >
              Projects
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition"
            >
              Blog
            </Link>
            <Link
              href="/guestbook"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition"
            >
              Guestbook
            </Link>
            <ExternalLink href="https://twitter.com/dhruv_gursahani">
              Twitter
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://github.com/dhruv-bvpdev">
              GitHub
            </ExternalLink>
            <ExternalLink href="https://github.com/dhruv-bvpdev/portfolio">
              Source code
            </ExternalLink>
            <ExternalLink href="mailto:dhruv.gursahani@outlook.com">
              Email
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://dhruvg-analytics.vercel.app/share/k95XWCtz/Portfolio">
              Analytics
            </ExternalLink>
            <ExternalLink href="/feed.xml">Feed</ExternalLink>
            <ExternalLink href="/sitemap.xml">Sitemap</ExternalLink>
          </div>
        </div>
        <p className="mx-auto text-sm text-gray-500 dark:text-gray-300">
          Powered by{' '}
          <ExternalLink
            href="https://nextjs.org/"
            color="text-primary hover:text-primary-dark"
          >
            Next.js
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink
            href="https://tailwindcss.com/"
            color="text-primary hover:text-primary-dark"
          >
            TailwindCSS
          </ExternalLink>
          . Hosted on{' '}
          <ExternalLink
            href="https://vercel.com/"
            color="text-primary hover:text-primary-dark"
          >
            Vercel
          </ExternalLink>
          .
        </p>
      </footer>
    </div>
  )
}

import { Suspense } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '@/components/layout'
import Project from '@/components/projects'
import BlogPostCard from '@/components/blog/BlogPostCard'
import type { Projects } from '@/lib/types'
import profilePic from '../public/static/images/profilePic.jpg'

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/dhruv-bvpdev/repos?per_page=3&sort=pushed'
  )

  const fallbackData = await reposResponse.json()

  return {
    props: {
      fallbackData
    },
    revalidate: 60
  }
}

export default function Index({
  fallbackData
}: {
  fallbackData: Projects[]
}): JSX.Element {
  return (
    <Layout>
      <Suspense>
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
          <div className="flex flex-col-reverse items-start sm:flex-row">
            <div className="flex flex-col pr-8">
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                Dhruv Gursahani
              </h1>
              <h2 className="mb-4 text-gray-700 dark:text-gray-200">
                MBA Student at{' '}
                <span className="font-semibold">
                  Fore School of Management, New Dehi
                </span>
              </h2>
              <p className="mb-16 text-gray-600 dark:text-gray-300">
                Also a developer, writer, creator and evangelist for JAMSTACK
                architecture
              </p>
            </div>
            <div className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]">
              <Image
                alt="Dhruv Gursahani"
                height={500}
                width={500}
                src={profilePic}
                placeholder="blur"
                sizes="30vw"
                priority
                className="rounded-full"
              />
            </div>
          </div>

          <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Featured Posts
          </h3>
          <div className="flex flex-col gap-6 md:flex-row">
            <BlogPostCard
              title="Initial Commit"
              slug="initial-commit"
              gradient="from-[#D8B4FE] via-[#726dde] to-[#818CF8]"
            />
            <BlogPostCard
              title="Best Terminal Setup"
              slug="terminal-setup"
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
            <BlogPostCard
              title="How to Deploy a full stack web app on vercel"
              slug="terminal-setup"
              gradient="from-[#9333EA] via-[#818CF8] to-[#3B82F6]"
            />
          </div>
          <Link
            href="/blog"
            className="mt-8 mb-16 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            Read All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>

          <h3
            id="projects"
            className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl"
          >
            Projects
          </h3>
          <h2 className="text-gray-600 dark:text-gray-200">
            <Project fallbackData={fallbackData} />
          </h2>
          <Link
            href="/projects"
            className="mt-4 mb-16 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </Suspense>
    </Layout>
  )
}

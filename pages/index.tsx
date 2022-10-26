import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '@/components/layout'
import Project from '@/components/projects'
import type { Projects } from '@/lib/types'
import profilePic from '../public/static/images/PP.jpg'

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/dhruv-bvpdev/repos?per_page=100&sort=pushed'
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
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="w-64 h-64 mx-auto mb-16">
          <Image
            className="rounded-full"
            src={profilePic}
            placeholder="blur"
            alt="Profile picture"
            width="500"
            height="500"
            quality={100}
            loading="lazy"
          />
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Hey, I&apos;m Dhruv Gursahani
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          I&apos;m a MBA student, developer, writer, and creator. I am a student
          at Fore School of Management, New Delhi. You’ve found my personal
          slice of the internet –&nbsp;sign my guestbook while you&apos;re here
          or learn more about me.
        </h2>
        <h3
          id="about"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          About
        </h3>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            Hey, I&apos;m Dhruv. I&apos;m {new Date().getFullYear() - 2001}{' '}
            years old and come from India. I live in New Delhi and spend my free
            time playing sports, listening to music or enjoying time with
            friends and family.
          </p>
          <p className="mb-6">
            I started working with computers when I was young and started
            programming in school.
          </p>
          <p className="mb-6">
            I&apos;m currently learning .NET Core but my favourite framework is
            NextJs. In the future I want to build my own Kubernetes cluster with
            backend services, database integration and a solid frontend combined
            by Nginx.
          </p>
        </h2>
        <h3
          id="projects"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          Projects
        </h3>
        <h2 className="text-gray-600 dark:text-gray-200">
          <Project fallbackData={fallbackData} />
        </h2>
      </div>
    </Layout>
  )
}

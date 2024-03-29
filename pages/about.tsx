import Link from 'next/link'
import { ArrowRight, MousePointerClick, Calendar } from 'lucide-react'
import Layout from '@/components/layout'
import Tools from '@/components/tools'

export default function About() {
  return (
    <Layout title="About - Dhruv Gursahani">
      <div className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          About
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            As Mark Zuckerberg rightly said coding is an outlet for creativity
            and its has been my outlet for a very long time now. Having started
            programming in school I have become fluent in C, Java, C# and
            Javascript. I apply my passion for developing products with Node.js
            and Modern Javascript Libraries and Frameworks like React.js and
            Next.js.
          </p>
          <p className="mb-6">
            {' '}
            However having gained all this coding knowledge I decided to pursue
            MBA because I wanted an introduction to the management side of
            things.
          </p>
          <p>
            Currently, I am learning R to level up my data visualization and
            analytics skills. I am also a seasoned Power BI developer
          </p>
        </h2>
        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Links
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2] prose dark:prose-dark">
          <ul className="list-disc">
            <li>
              Github:{' '}
              <Link
                href="https://github.com/dhruv-bvpdev"
                className="text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-dark"
              >
                @dhruv-bvpdev
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <Link
                href="https://linkedin.com/in/dhruvgursahani"
                className="text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-dark"
              >
                dhruvgursahani
              </Link>
            </li>
            <li>
              Website:{' '}
              <Link
                href="https://dhruvgursahani.vercel.app"
                className="text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-dark"
              >
                https://dhruvgursahani.vercel.app/
              </Link>
            </li>
          </ul>
        </h2>

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Tools
        </h1>
        <h2 className="mb-16">
          <p className="text-gray-600 dark:text-[#c2c2c2]">
            These are the tools I almost use daily. I really enjoy finding new
            technologies improving my workflow.
          </p>
          <Tools />
        </h2>

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Timeline
        </h1>

        <ol className="relative mb-16 border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 border border-white rounded-full -left-1.5 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              July 2022
            </time>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              MBA at Fore School of Management, New Delhi
            </h2>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Looking forward to excel at the unmatched learning environment at
              FSM and grooming myself to become a top notch corporate manager.
            </p>
            <Link href="https://www.fsm.ac.in/" aria-label="FSM HomePage">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Learn more <ArrowRight className="ml-2 h-3 w-3" />
              </div>
            </Link>
          </li>
          <li className="ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 border border-white rounded-full -left-1.5 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              June 2022
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Completed Bachelor&apos;s in Computer Applications from Bharati
              Vidyapeeth Institute of Management and Research, New Delhi
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Graduated suma cum laude -- 9.33 GPA. Specialized in web
              development
            </p>
          </li>
          <li className="ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 border border-white rounded-full -left-1.5 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Mar 2019
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Completed schooling from Bhatnagar International School, New Delhi
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Bid Adieu to my school after 14 years. Had chosen Commerce as my
              stream for Class XII (CBSE) [91.25%]
            </p>
          </li>
        </ol>

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          SAAS Journey
        </h1>

        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-gray-100 dark:ring-gray-800 dark:bg-blue-900">
              <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Feed You Back v0.0.2-alpha
              <span className="ml-3 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded px-2.5 py-0.5 dark:bg-blue-200 dark:text-blue-800">
                Latest
              </span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on October 23rd, 2022
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              This release builds upon the previous one and adds functionality
              to the product
            </p>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Click here
              <MousePointerClick className="ml-2 h-3 w-3" />
            </a>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Feed You Back v0.0.1-alpha
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on October 1st, 2022
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              The vision behinf Feed You Back is to remove the complexity behind
              adding comments to your static sites
            </p>
          </li>
        </ol>
      </div>
    </Layout>
  )
}

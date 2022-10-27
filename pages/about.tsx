import Layout from '@/components/layout'

export default function About() {
  const age = Math.floor(
    (new Date().getTime() - new Date('2001-09-22').getTime()) / 3.15576e10
  )
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          About
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            Hey, I&apos;m Dhruv. I&apos;m {new Date().getFullYear() - 2001}{' '}
            years old and come from India. I live in New Delhi and spend my free
            time playing sports, listening to music or enjoying time with
            friends and family.
          </p>
          <p className="mb-6">
            {' '}
            I started working with computers when I was young and started
            programming in school.
          </p>
          <p>
            I&apos;m currently learning .NET Core but my favourite framework is
            NextJs. In the future I want to build my own Kubernetes cluster with
            backend services, database integration and a solid frontend combined
            by Nginx.
          </p>
        </h2>
        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Links
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]"></h2>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
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
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                ></path>
              </svg>{' '}
              Click here
            </a>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
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

import useSWR from 'swr'
import { Github, Home } from 'lucide-react'
import type { Projects } from '@/lib/types'
import fetcher from '@/lib/fetcher'

const Project = ({
  fallbackData,
  amount = 3
}: {
  fallbackData: Projects[]
  amount?: number
}): JSX.Element => {
  const { data, error } = useSWR<Projects[]>(
    `/api/repos?per_page=${amount}`,
    fetcher,
    {
      fallbackData
    }
  )

  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      {data.length > 0 &&
        data.map((project: Projects, index: number) => (
          <div
            key={index}
            id={project.name}
            className="my-3 grid grid-cols-2 gap-4 rounded-lg border border-gray-200 p-6 shadow hover:border-primary dark:border-gray-700 dark:hover:border-primary md:grid-cols-5"
          >
            <div className="flex flex-row">
              <p className="font-semibold text-gray-500 dark:text-white">
                {project.name}
              </p>
            </div>
            <p className="col-span-2">{project.description}</p>
            <sub className="md:mx-4 md:hidden">{project.language}</sub>
            <p className="hidden md:mx-4 md:inline">{project.language}</p>
            <div className="flex flex-row justify-end gap-x-4">
              {project.homepage !== '' && project.homepage !== null && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="homepage"
                >
                  <Home
                    strokeWidth={1.5}
                    className="default-transition default-focus relative inline-flex h-10 w-10 justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:w-10"
                  />
                </a>
              )}

              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github"
              >
                <Github className="default-transition default-focus relative inline-flex h-10 w-10 justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:w-10" />
              </a>
            </div>
          </div>
        ))}
      {!Array.isArray(data) && (
        <div className="p-6 my-3 border border-gray-200 rounded-lg shadow dark:border-gray-700 grid lg:grid-cols-5 md:grid-cols-2 gap-4">
          <div className="flex flex-row">
            <p className="font-semibold text-gray-500 dark:text-gray-200">
              Projects Not Found
            </p>
          </div>
          <p className="col-span-2"> </p>
          <sub className="md:mx-4 md:hidden"> </sub>
          <p className="hidden md:mx-4 md:inline"> </p>
          <div className="flex flex-row justify-end gap-x-4">
            <a
              href="https://github.com/dhruv-bvpdev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home
                strokeWidth={1.5}
                className="default-transition default-focus relative inline-flex h-10 w-10 justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:w-10"
              />
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Project

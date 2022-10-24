import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Projects } from '@/lib/types'

const Project = (): JSX.Element => {
  const [projects, setProjects] = useState<Projects[]>([
    {
      name: '',
      html_url: '',
      description: '',
      language: ''
    }
  ])

  useEffect(() => {
    const getData = async () => {
      await axios
        .get<Projects[]>('https://api.github.com/users/dhruv-bvpdev/repos', {
          responseType: 'json'
        })
        .then(response => {
          setProjects(response.data)
        })
        .catch(() => {
          getLocalData()
        })
    }

    const getLocalData = async () => {
      await axios
        .get<Projects[]>('/static/projects.json', {
          responseType: 'json'
        })
        .then(response => {
          setProjects(response.data)
        })
    }

    getData()
  }, [])

  return (
    <>
      {projects.map((project, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-3 p-3"
        >
          <h3 className="font-semibold text-lg tracking-wide">
            <a
              className="hover:text-blue-800 text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition"
              target="_blank"
              rel="noopener noreferrer"
              href={project.html_url}
            >
              {project.name}
            </a>
          </h3>
          <p className="col-span-2">{project.description}</p>
          <p>{project.language}</p>
        </div>
      ))}
    </>
  )
}

export default Project

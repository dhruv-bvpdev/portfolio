export type ObjectType = {
  [x: string]: string
}

export type Projects = {
  name: string
  html_url: string
  description: string
  language: string
}

export type healthData = {
  status: string
  env: string
  uptime: string
  mem: NodeJS.MemoryUsage
  vercel: {
    deployed: boolean
    env: string
  }
}

export type errorApiReponse = {
  status: string
}

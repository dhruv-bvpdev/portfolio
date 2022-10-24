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
  mem: {
    rss: string
    heapTotal: string
    heapUsed: string
    external: string
    arrayBuffers: string
  }
  vercel: {
    deployed: boolean
    env: string
  }
}

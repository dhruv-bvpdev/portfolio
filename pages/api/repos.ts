import { type NextRequest } from 'next/server'
import { isValidHttpMethod, MethodNotAllowedEdge } from '@/lib/api'

export const config = {
  runtime: 'experimental-edge'
}

export default async function handler(req: NextRequest) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowedEdge()
  }

  const per_page = req.nextUrl.searchParams.get('per_page') || '20'

  const reposResponse = await fetch(
    `https://api.github.com/users/dhruv-bvpdev/repos?per_page=${per_page}&sort=pushed`
  )

  const repos = await reposResponse.json()

  return new Response(JSON.stringify(repos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
    }
  })
}

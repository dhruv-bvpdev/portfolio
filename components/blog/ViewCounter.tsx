import { useEffect } from 'react'

import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import type { Views } from '@/lib/types'

type Props = {
  slug: string
}

export default function ViewCounter({ slug }: Props) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  const views = data?.total ?? -1

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      })

    registerView()
  }, [slug])

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>
}

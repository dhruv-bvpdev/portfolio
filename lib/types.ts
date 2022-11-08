export type ObjectType = {
  [x: string]: string
}

export type Projects = {
  name: string
  html_url: string
  homepage: string
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

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export type Song = {
  songUrl: string
  artist: string
  cover: string
  title: string
}

export type TopTracks = {
  tracks: Song[]
}

export type Views = {
  total: number
}

export type GuestbookData = {
  id: string
  email: string
  body: string
  created_by: string
  created_at: Date
  updated_at: Date
}

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form
  message?: string
}

export type ClickEvent = {
  preventDefault: () => void
}

export type forwardedTweet = {
  public_metrics: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
  edit_history_tweet_ids: string[]
  created_at: string
  text: string
  author_id: string
  id: string
  media: {
    url: string
    media_key: string
    width: number
    type: string
    height: number
  }[]
  author: {
    name: string
    id: string
    username: string
    url: string
    protected: boolean
    profile_image_url: string
    verified: boolean
  }
}

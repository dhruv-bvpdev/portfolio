import { Suspense } from 'react'
import Tweet from '@/components/tweet'
import { getTweets } from '@/lib/twitter'
import Layout from '@/components/layout'
import { forwardedTweet } from '@/lib/types'

export default function Tweets({ tweets }: { tweets: forwardedTweet[] }) {
  return (
    <Layout title="Tweets – Dhruv Gursahani" description="My favourite tweets">
      <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Tweets
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          This is a collection of tweets I&apos;ve enjoyed. I use Twitter quite
          a bit, so I wanted a place to publicly share what inspires me, makes
          me laugh, and makes me think.
        </p>
        <Suspense>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </Suspense>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const tweets = await getTweets([
    '1002104154737684480',
    '1385236589547331589',
    '1189444653059174401',
    '1573341639615123457',
    '1579561293069316096',
    '1551966765973897217',
    '1523474848411840512',
    '1533852479355555844',
    '1026872652290379776'
  ])

  return { props: { tweets } }
}

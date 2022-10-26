import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'
import Layout from '@/components/layout'
import { Guestbook as GuestbookComponent } from '@/components/guestbook'
import type { GuestbookData } from '@/lib/types'

export default function Guestbook({
  fallbackData
}: {
  fallbackData: GuestbookData[]
}) {
  return (
    <Layout title="Guestbook - Dhruv Gursahani">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Guestbook
        </h1>
        <p className="mb-3 text-gray-600 dark:text-[#c2c2c2]">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
        <GuestbookComponent fallbackData={fallbackData} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  })

  const fallbackData = entries.map(entry => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString()
  }))

  return {
    props: {
      fallbackData
    },
    revalidate: 60
  }
}

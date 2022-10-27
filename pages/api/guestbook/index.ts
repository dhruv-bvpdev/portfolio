import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (req.query.count) {
      const count = await prisma.guestbook.count()
      return res.json({ count })
    }

    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: 'desc'
      }
    })

    return res.json(
      entries.map(entry => ({
        id: entry.id.toString(),
        body: entry.body,
        created_by: entry.created_by,
        updated_at: entry.updated_at
      }))
    )
  }

  const session = await getSession({ req })

  if (!session || !session.user || !session.user.email || !session.user.name) {
    return res.status(403).send('Unauthorized')
  }

  const { email, name } = session.user

  if (req.method === 'POST') {
    if (req.body.body.trim().length === 0) {
      return res.status(400).send({ error: 'Body is required.' })
    }

    const newEntry = await prisma.guestbook.create({
      data: {
        email,
        body: (req.body.body || '').slice(0, 500),
        created_by: name
      }
    })

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      created_by: newEntry.created_by,
      updated_at: newEntry.updated_at
    })
  }

  return res.send('Method not allowed.')
}

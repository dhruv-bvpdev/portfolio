import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  Unauthorized
} from '@/lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res)
  }

  if (req.method === 'GET') {
    if (req.query.count) {
      const count = await prisma.guestbook.count()
      return res.status(200).json({ count })
    }

    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: 'desc'
      }
    })

    return res.status(200).json(
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
    return Unauthorized(res)
  }

  const { email, name } = session.user

  if (
    typeof req.body.body !== 'string' ||
    req.body.body.trim().length === 0 ||
    !req.body.body
  ) {
    return BadRequest(res, 'Invalid body')
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

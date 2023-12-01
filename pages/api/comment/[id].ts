import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  Unauthorized
} from '@/lib/api'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'DELETE', 'PUT'])) {
    return MethodNotAllowed(res)
  }

  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (!id || !Number(id)) {
    return BadRequest(res, 'Invalid id')
  }

  const entry = await prisma.comment.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!entry) {
    return BadRequest(res, 'Entry not found')
  }

  if (req.method === 'GET') {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at
    })
  }

  if (
    !session ||
    (session.user?.email !== entry.email && !session.user.isAdmin)
  ) {
    return Unauthorized(res)
  }

  if (req.method === 'DELETE') {
    await prisma.comment.delete({
      where: {
        id: Number(id)
      }
    })

    return res.status(200).json({ message: `Deleted entry ${id}` })
  }

  if (
    typeof req.body.body !== 'string' ||
    req.body.body.trim().length === 0 ||
    !req.body.body
  ) {
    return BadRequest(res, 'Invalid body')
  }

  const body = req.body.body.slice(0, 500)

  await prisma.comment.update({
    where: {
      id: Number(id)
    },
    data: {
      body,
      updated_at: new Date().toISOString()
    }
  })

  return res.status(201).json({
    ...entry,
    body
  })
}

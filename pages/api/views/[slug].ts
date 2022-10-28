import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError
} from '@/lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res)
  }

  try {
    const slug = req?.query?.slug?.toString()

    if (!slug) {
      return BadRequest(res, 'Invalid slug')
    }

    if (req.method === 'POST') {
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug },
        create: {
          slug: slug!
        },
        update: {
          count: {
            increment: 1
          }
        }
      })

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString()
      })
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug: slug!
        }
      })

      return res.status(200).json({ total: views?.count?.toString() })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e) {
    return ServerError(res, e)
  }
}

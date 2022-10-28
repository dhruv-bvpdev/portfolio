import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { isValidHttpMethod, MethodNotAllowed, ServerError } from '@/lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowed(res)
  }

  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true
      }
    })

    return res.status(200).json({ total: totalViews._sum.count?.toString() })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e) {
    return ServerError(res, e)
  }
}

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge'
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Dhruv Gursahani'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: 'white',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px'
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontStyle: 'normal',
              color: 'black',
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap'
            }}
          >
            <b>{title}</b>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

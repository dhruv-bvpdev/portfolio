import Script from 'next/script'

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="ae4f9d38-446a-40b5-a83f-632ee2901bb4"
          src="https://dhruvg-analytics.vercel.app/umami.js"
        />
      )}
    </>
  )
}

export default Analytics

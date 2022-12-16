import Script from 'next/script'

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="b60e1541-0542-46c0-8f8f-45a814d46232"
          src="https://dhruvg-analytics.vercel.app/umami.js"
        />
      )}
    </>
  )
}

export default Analytics

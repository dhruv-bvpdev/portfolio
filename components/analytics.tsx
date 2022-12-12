import Script from 'next/script'

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="cbea7cd3-dc1d-4fe2-89b1-ae9ea7e3fd7a"
          src="https://dhruvg-analytics.vercel.app/umami.js"
        />
      )}
    </>
  )
}

export default Analytics

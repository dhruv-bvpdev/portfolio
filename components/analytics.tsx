import Script from 'next/script'

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="052f4994-f659-40d3-886a-52c84ad6d749"
          src="https://dhruvg-analytics.vercel.app/script.js"
        />
      )}
    </>
  )
}

export default Analytics

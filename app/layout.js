import "./globals.css"
import Script from "next/script"

export const metadata = {
  title: "Hospital Veterinário Popular",
  description: "Hospital Veterinário Popular",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/a06f84c14d1214b8d9f238cd/script.js"
          strategy="beforeInteractive"></Script>
      </head>
      <body className="max-w-screen-2xl mx-auto font-worksans-regular">{children}</body>
    </html>
  )
}

export default RootLayout

import "./globals.css"

export const metadata = {
  title: "Hospital Veterinário Popular",
  description: "Hospital Veterinário Popular",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="max-w-screen-2xl mx-auto font-worksans-regular">{children}</body>
    </html>
  )
}

export default RootLayout

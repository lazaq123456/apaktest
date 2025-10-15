import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Next.js Auth App",
  description: "Aplikacja Next.js z Auth.js i Next-Admin",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  )
}



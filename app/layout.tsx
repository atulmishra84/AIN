import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AiN - AI Platform',
  description: 'Advanced AI platform for modern applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AudioPlayer from './components/AudioPlayer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'For Joan Fong',
  description: 'A romantic invitation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

// Configurar la fuente Inter como fallback
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PerfumesBandido - La esencia del poder',
  description: 'Perfumes exclusivos para los que mandan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Preconectar a Google Fonts para mejor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <Navbar />
        <main className="pt-16"> {/* Padding para que el contenido no quede detrás del Navbar */}
          {children}
        </main>
        {/* Aquí irá el Footer después */}
      </body>
    </html>
  )
}
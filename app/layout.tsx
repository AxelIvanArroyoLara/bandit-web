import { Inter, UnifrakturCook, Archivo_Black } from 'next/font/google' //
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const gothic = UnifrakturCook({ weight: '700', subsets: ['latin'], variable: '--font-gothic' })
const archivo = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${gothic.variable} ${archivo.variable}`}> 
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

import {Providers} from "./providers";
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DICE',
  description: 'Decentralized Immutable Credential Ecosystem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <html lang="en">
      <body className={montserrat.className}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

import {Providers} from "./providers";
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
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
          <ThemeSwitcher />
          {children}
        </Providers>
      </body>
    </html>
  )
}

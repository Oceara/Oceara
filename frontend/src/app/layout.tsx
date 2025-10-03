import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider, LanguageSwitcher } from '@/i18n/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oceara - Sustainable Agriculture Carbon Credit Platform',
  description: 'Connect farmers, buyers, and administrators in a comprehensive ecosystem for carbon credit trading and sustainable agriculture management.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <div className="fixed top-3 right-3 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
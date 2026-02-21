import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Repet',
  description: 'Sistema de fidelidade inteligente para petshops',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
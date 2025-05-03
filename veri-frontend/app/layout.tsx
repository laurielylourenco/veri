

import type { Metadata } from 'next'
import './globals.css'
import { GlobalStateProvider } from './global/ContextGlobalState'
import { ReactQueryProvider } from './global/ReactQueryProvider'
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: 'Veri',
  description: 'Criado pela Lauriely Lourenço'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryProvider>
          <GlobalStateProvider>
            {children}
          </GlobalStateProvider>
        </ReactQueryProvider>
        <Toaster richColors position="top-center" />

      </body>
    </html>
  )
}

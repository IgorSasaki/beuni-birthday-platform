import { Metadata, NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'BeUni Aniversários - Gestão de Aniversariantes',
  description:
    'Sistema profissional para gestão de aniversariantes e brindes corporativos'
}

const RootLayout: NextPage<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster />

        {children}
      </body>
    </html>
  )
}

export default RootLayout

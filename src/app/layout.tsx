import { NextPage } from 'next'
import { PropsWithChildren } from 'react'

import '@/styles/globals.css'

const RootLayout: NextPage<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

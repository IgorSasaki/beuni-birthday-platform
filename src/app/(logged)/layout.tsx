import { NextPage } from 'next'
import { PropsWithChildren } from 'react'

import { Header } from '@/components/structure/Header'
import { Sidebar } from '@/components/structure/Sidebar'

const LoggedLayout: NextPage<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default LoggedLayout

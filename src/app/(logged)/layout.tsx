'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

import { Header } from '@/components/structure/Header'
import { Sidebar } from '@/components/structure/Sidebar'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const LoggedLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [token] = useLocalStorage<string>('auth_token', '')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !token) {
      router.push('/acesso')
    }
  }, [token, mounted, router])

  if (!mounted) {
    return
  }

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

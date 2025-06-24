'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'

const PublicLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const [token] = useLocalStorage<string>('auth_token', '')

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [token])

  return <>{children}</>
}

export default PublicLayout

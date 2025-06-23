'use client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'

import { Header } from './_components/Header'
import { StatsCards } from './_components/StatsCards'
import { UpcomingBirthdays } from './_components/UpcomingBirthdays'
import { DashboardStats } from './types'

const Page: NextPage = () => {
  const [token] = useLocalStorage('auth_token', '')

  const [stats, setStats] = useState<DashboardStats>({} as DashboardStats)

  useEffect(() => {
    internalAPIInstance.dashboard
      .getDashboard(token)
      .then(({ data }) => {
        setStats(data)
      })
      .catch(error => {
        console.error({ getDashboardError: error })
      })
  }, [token])

  return (
    <div className="space-y-8">
      <Header />

      <StatsCards stats={stats} />

      <UpcomingBirthdays stats={stats} />
    </div>
  )
}

export default Page

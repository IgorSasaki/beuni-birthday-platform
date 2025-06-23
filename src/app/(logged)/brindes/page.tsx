'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Gift } from '@/models/Gifts'

import { BirthdayFilter } from '../funcionarios/types'
import { Filters } from './_components/Filters'
import { GiftsList } from './_components/GiftsList'
import { Header } from './_components/Header'
import { StatsCards } from './_components/StatsCards'

const Page: NextPage = () => {
  const [token] = useLocalStorage('auth_token', '')

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<BirthdayFilter>({})
  const [update, setUpdate] = useState(false)

  const [gifts, setGifts] = useState<Gift[]>([])

  useEffect(() => {
    internalAPIInstance.gifts
      .listGifts(token, searchTerm, filters)
      .then(response => {
        setGifts(response.data)
      })
      .catch(error => {
        console.error({ listGiftsError: error })
      })
  }, [token, searchTerm, filters, update])

  return (
    <div className="space-y-8">
      <Header />

      <StatsCards gifts={gifts} />

      <Filters
        filters={filters}
        searchTerm={searchTerm}
        setFilters={setFilters}
        setSearchTerm={setSearchTerm}
      />

      <GiftsList
        filters={filters}
        gifts={gifts}
        searchTerm={searchTerm}
        setUpdate={setUpdate}
        update={update}
      />
    </div>
  )
}

export default Page

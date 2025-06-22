import { NextPage } from 'next'

import { Filters } from './_components/Filters'
import { GiftsList } from './_components/GiftsList'
import { Header } from './_components/Header'
import { StatsCards } from './_components/StatsCards'

const Page: NextPage = async () => {
  return (
    <div className="space-y-8">
      <Header />

      <StatsCards />

      <Filters />

      <GiftsList />
    </div>
  )
}

export default Page

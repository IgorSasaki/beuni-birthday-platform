import { NextPage } from 'next'

import { Header } from './_components/Header'
import { StatsCards } from './_components/StatsCards'
import { UpcomingBirthdays } from './_components/UpcomingBirthdays'

const Page: NextPage = async () => {
  return (
    <div className="space-y-8">
      <Header />

      <StatsCards />

      <UpcomingBirthdays />
    </div>
  )
}

export default Page

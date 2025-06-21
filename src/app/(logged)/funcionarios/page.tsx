import { NextPage } from 'next'

import { Employees } from './_components/Employees'
import { Filters } from './_components/Filters'
import { Header } from './_components/Header'

const Page: NextPage = async () => {
  return (
    <div className="space-y-8">
      <Header />

      <Filters />

      <Employees />
    </div>
  )
}

export default Page

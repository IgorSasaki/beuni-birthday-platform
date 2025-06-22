import { NextPage } from 'next'

import { Form } from './_components/Form'
import { Header } from './_components/Header'

const Page: NextPage = async () => {
  return (
    <div className="space-y-8">
      <Header />

      <Form />
    </div>
  )
}

export default Page

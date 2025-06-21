import { NextPage } from 'next'

import { Container } from './_components/Container'

const Page: NextPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Container />
    </main>
  )
}

export default Page

import { NextPage } from 'next'
import { redirect } from 'next/navigation'

const Page: NextPage = async () => {
  redirect('/acesso')
}

export default Page

import { NextPage } from 'next'

import { Container } from './_components/Container'
import { EmployeePageProps } from './types'

const Page: NextPage<EmployeePageProps> = async ({ params }) => {
  const id = (await params).id

  return <Container id={id} />
}

export default Page

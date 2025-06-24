import { NextPage } from 'next'

import { Container } from './_components/Container'
import { EmployeePageProps } from './types'

const Page: NextPage<EmployeePageProps> = ({ params }) => {
  const { id } = params

  return <Container id={id} />
}

export default Page

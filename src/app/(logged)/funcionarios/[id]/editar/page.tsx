import { NextPage } from 'next'

import { EmployeePageProps } from '../types'
import { Container } from './_components/Container'

const Page: NextPage<EmployeePageProps> = ({ params }) => {
  const { id } = params

  return <Container id={id} />
}

export default Page

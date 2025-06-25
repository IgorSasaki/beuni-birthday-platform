import { NextPage } from 'next'

import { Container } from './_components/Container'
import { EditEmployeePageProps } from './types'

const Page: NextPage<EditEmployeePageProps> = async ({ params }) => {
  const id = (await params).id

  return <Container id={id} />
}

export default Page

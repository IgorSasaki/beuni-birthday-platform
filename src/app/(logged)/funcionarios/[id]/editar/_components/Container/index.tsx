'use client'

import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Employee } from '@/models/Employee'

import { Form } from '../Form'
import { Header } from '../Header'
import { NotFound } from '../NotFound'
import { ContainerProps } from './types'

export const Container: React.FC<ContainerProps> = ({ id }) => {
  const [token] = useLocalStorage('auth_token', '')

  const [employee, setEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    if (!id) return

    internalAPIInstance.employee
      .getEmployeeById(id, token)
      .then(response => {
        setEmployee(response.data)
      })
      .catch(error => {
        console.log({ getEmployeeByIdError: error })
      })
  }, [id, token])

  if (!employee) {
    return <NotFound />
  }

  return (
    <div className="space-y-8">
      <Header employee={employee} />

      <Form employee={employee} token={token} />
    </div>
  )
}

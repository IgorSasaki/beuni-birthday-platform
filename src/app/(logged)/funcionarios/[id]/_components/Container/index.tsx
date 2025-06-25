'use client'

import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Employee } from '@/models/Employee'

import { QuickStats } from '../ QuickStats'
import { AddressInformation } from '../AddressInformation'
import { GiftStatus } from '../GiftStatus'
import { Header } from '../Header'
import { NotFound } from '../NotFound'
import { PersonalInformation } from '../PersonalInformation'
import { WorkInformation } from '../WorkInformation'
import { ContainerProps } from './types'

export const Container: React.FC<ContainerProps> = ({ id }) => {
  const [token] = useLocalStorage('auth_token', '')

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [update, setUpdate] = useState(false)

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
  }, [id, token, update])

  if (!employee) {
    return <NotFound />
  }

  return (
    <div className="space-y-8">
      <Header employee={employee} token={token} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PersonalInformation employee={employee} />

          <AddressInformation employee={employee} />

          <WorkInformation employee={employee} />
        </div>

        <div className="space-y-6">
          <GiftStatus
            employee={employee}
            setUpdate={setUpdate}
            token={token}
            update={update}
          />

          <QuickStats employee={employee} />
        </div>
      </div>
    </div>
  )
}

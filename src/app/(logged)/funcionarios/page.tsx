'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Employee } from '@/models/Employee'

import { Employees } from './_components/Employees'
import { Filters } from './_components/Filters'
import { Header } from './_components/Header'
import { BirthdayFilter } from './types'

const Page: NextPage = () => {
  const [token] = useLocalStorage('auth_token', '')

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<BirthdayFilter>({})
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    internalAPIInstance.employee
      .getAllEmployees(token, searchTerm, filters)
      .then(response => {
        setEmployees(response.data)
      })
      .catch(error => {
        console.error({ getAllEmployeesError: error })
      })
  }, [token, searchTerm, filters])

  return (
    <div className="space-y-8">
      <Header />

      <Filters
        filters={filters}
        searchTerm={searchTerm}
        setFilters={setFilters}
        setSearchTerm={setSearchTerm}
      />

      <Employees
        employees={employees}
        filters={filters}
        searchTerm={searchTerm}
        setFilters={setFilters}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default Page

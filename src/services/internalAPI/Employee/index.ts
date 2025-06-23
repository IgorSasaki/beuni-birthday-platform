import { AxiosInstance, AxiosResponse } from 'axios'

import { EmployeeFormData } from '@/app/(logged)/funcionarios/novo/_components/Form/types'
import { BirthdayFilter } from '@/app/(logged)/funcionarios/types'

export class Employee {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async getAllEmployees(
    token: string,
    searchTerm: string,
    filters: BirthdayFilter = {}
  ): Promise<AxiosResponse> {
    const { department, status, month } = filters

    const cleanedFilters: BirthdayFilter = {
      month:
        typeof month === 'string' && month !== 'ALL'
          ? parseInt(month, 10)
          : undefined,
      department: department && department !== 'ALL' ? department : undefined,
      status: status && status !== 'ALL' ? status : undefined
    }

    const params = {
      searchText: searchTerm || undefined,
      ...cleanedFilters
    }

    return this.instance.get('/employees', {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async getEmployeeById(employeeId: string): Promise<AxiosResponse> {
    return this.instance.get(`/employees/${employeeId}`)
  }

  public async createEmployee(
    payload: EmployeeFormData,
    token: string
  ): Promise<AxiosResponse> {
    return this.instance.post('/employees', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

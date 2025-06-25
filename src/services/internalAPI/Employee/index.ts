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

    const cleanedFilters = {
      month:
        typeof month === 'number' && month >= 1 && month <= 12
          ? month.toString()
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

  public async getEmployeeById(
    employeeId: string,
    token: string
  ): Promise<AxiosResponse> {
    return this.instance.get(`/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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

  public async deleteEmployee(
    employeeId: string,
    token: string
  ): Promise<AxiosResponse> {
    return this.instance.delete(`/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async updateEmployee(
    employeeId: string,
    payload: EmployeeFormData,
    token: string
  ): Promise<AxiosResponse> {
    return this.instance.put(`/employees/${employeeId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

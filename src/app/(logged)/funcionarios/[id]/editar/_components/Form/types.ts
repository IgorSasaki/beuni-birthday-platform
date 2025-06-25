import { Employee } from '@/models/Employee'

export interface FormProps {
  employee: Employee
  token: string
}

export interface EmployeeFormData {
  birthDate: string
  cep: string
  city: string
  complement?: string
  department: string
  fullName: string
  giftSize: 'P' | 'M' | 'G' | 'GG' | 'XG'
  neighborhood: string
  number: string
  position: string
  state: string
  street: string
}

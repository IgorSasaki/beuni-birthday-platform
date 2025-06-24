import { Employee } from '@/models/Employee'

export interface GiftStatusProps {
  employee: Employee
  setUpdate(update: boolean): void
  token: string
  update: boolean
}

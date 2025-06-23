import { Employee } from '@/models/Employee'
import { Gift } from '@/models/Gifts'

export interface DashboardStats {
  birthdaysThisMonth: Employee[]
  pendingGifts: Gift[]
  sendingGifts: Gift[]
  totalEmployees: number
}

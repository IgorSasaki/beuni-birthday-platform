import { CheckCircle, Clock, Package, Truck } from 'lucide-react'

export const getGiftStatusIcon = (status: string) => {
  switch (status) {
    case 'NOT_REQUESTED':
      return Package
    case 'PENDING':
      return Clock
    case 'SENT':
      return Truck
    case 'DELIVERED':
      return CheckCircle
    default:
      return Package
  }
}

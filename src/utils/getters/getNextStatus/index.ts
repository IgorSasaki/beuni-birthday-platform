export const getNextStatus = (currentStatus: string): string | null => {
  switch (currentStatus) {
    case 'NOT_REQUESTED':
      return 'PENDING'
    case 'PENDING':
      return 'SENT'
    case 'SENT':
      return 'DELIVERED'
    default:
      return null
  }
}

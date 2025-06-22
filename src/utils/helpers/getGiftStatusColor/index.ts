export const getGiftStatusColor = (status: string) => {
  return (
    {
      PENDING: 'bg-yellow-100 text-yellow-800',
      SENDING: 'bg-blue-100 text-blue-800',
      DELIVERED: 'bg-green-100 text-green-800'
    }[status] || 'bg-gray-100 text-gray-800'
  )
}

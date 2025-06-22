export const getGiftStatusText = (status: string) => {
  return (
    {
      PENDING: 'Pendente',
      SENDING: 'Enviado',
      DELIVERED: 'Entregue'
    }[status] || 'Desconhecido'
  )
}

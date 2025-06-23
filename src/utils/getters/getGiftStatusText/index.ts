export const getGiftStatusText = (status: string) => {
  return (
    {
      NOT_REQUESTED: 'Não solicitado',
      PENDING: 'Pendente',
      SENT: 'Enviado',
      DELIVERED: 'Entregue'
    }[status] || 'Desconhecido'
  )
}

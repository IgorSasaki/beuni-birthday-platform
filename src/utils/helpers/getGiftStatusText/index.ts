export const getGiftStatusText = (status: string) => {
  return (
    {
      NOT_REQUESTED: 'Não solicitado',
      PENDING: 'Pendente',
      SENDING: 'Enviado',
      DELIVERED: 'Entregue'
    }[status] || 'Desconhecido'
  )
}

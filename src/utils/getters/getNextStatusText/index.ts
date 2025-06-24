export const getNextStatusText = (currentStatus: string): string => {
  switch (currentStatus) {
    case 'NOT_REQUESTED':
      return 'Marcar como Pendente'
    case 'PENDING':
      return 'Marcar como Enviado'
    case 'SENT':
      return 'Marcar como Entregue'
    default:
      return ''
  }
}

'use client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  MapPin,
  Package,
  Truck,
  User
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Employee } from '@/models/Employee'
import { getDepartmentLabel } from '@/utils/getters/getDepartmentLabel'
import { getGiftStatusColor } from '@/utils/getters/getGiftStatusColor'
import { getGiftStatusText } from '@/utils/getters/getGiftStatusText'
import { getPositionLabel } from '@/utils/getters/getPositionLabel'

import { GiftsListProps } from './types'

export const GiftsList: React.FC<GiftsListProps> = ({
  gifts,
  filters,
  searchTerm,
  setUpdate,
  update
}) => {
  const [token] = useLocalStorage('auth_token', '')

  const getGiftStatusIcon = (status: string) => {
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

  const getNextStatus = (currentStatus: string): string | null => {
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

  const getNextStatusText = (currentStatus: string): string => {
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

  const handleStatusUpdate = async (
    giftId: string,
    newStatus: Employee['status']
  ) => {
    try {
      await internalAPIInstance.gifts.updateGiftStatus(giftId, newStatus, token)

      setUpdate(!update)

      toast.success('Status atualizado', {
        description: `Status do brinde alterado para ${getGiftStatusText(newStatus)}`
      })
    } catch (error) {
      console.error({ handleStatusUpdateError: error })

      toast.error('Erro ao atualizar status', {
        description: 'Não foi possível atualizar o status do brinde'
      })
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="text-beuni-orange h-5 w-5" />
            Brindes ({gifts?.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gifts?.length === 0 ? (
            <div className="py-12 text-center">
              <Gift className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Nenhum brinde encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || Object.keys(filters).length > 0
                  ? 'Tente ajustar os filtros de busca'
                  : 'Não há brindes para gerenciar no momento'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {gifts?.map((gift, index) => {
                const StatusIcon = getGiftStatusIcon(gift.status)
                const nextStatus = getNextStatus(gift.status)

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    key={gift.giftId}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-1 items-start space-x-4">
                            <div className="bg-beuni-gradient flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white">
                              {gift.sendTo.fullName
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .slice(0, 2)}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {gift.sendTo.fullName}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {getPositionLabel(gift.sendTo.position)} •{' '}
                                    {getDepartmentLabel(gift.sendTo.department)}
                                  </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={getGiftStatusColor(gift.status)}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {getGiftStatusText(gift.status)}
                                  </Badge>
                                  <Badge
                                    className="text-beuni-orange border-orange-200 bg-orange-50"
                                    variant="outline"
                                  >
                                    Tamanho {gift.sendTo.giftSize}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
                                <div className="flex items-center">
                                  <Calendar className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {format(
                                      gift.sendTo.birthDate,
                                      "dd 'de' MMMM",
                                      {
                                        locale: ptBR
                                      }
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  <MapPin className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {gift.sendTo.city}, {gift.sendTo.state}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  <User className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {gift.sendTo.street}, {gift.sendTo.number}
                                  </span>
                                </div>
                              </div>

                              {nextStatus && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  <Button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        gift.giftId,
                                        nextStatus
                                      )
                                    }
                                    className="bg-beuni-orange hover:bg-beuni-orange/90"
                                    size="sm"
                                  >
                                    {getNextStatusText(gift.status)}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

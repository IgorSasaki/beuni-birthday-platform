'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { internalAPIInstance } from '@/instances/internalAPI'
import { Employee } from '@/models/Employee'
import { getGiftStatusColor } from '@/utils/getters/getGiftStatusColor'
import { getGiftStatusIcon } from '@/utils/getters/getGiftStatusIcon'
import { getGiftStatusText } from '@/utils/getters/getGiftStatusText'
import { getNextStatus } from '@/utils/getters/getNextStatus'
import { getNextStatusText } from '@/utils/getters/getNextStatusText'

import { GiftStatusProps } from './types'

export const GiftStatus: React.FC<GiftStatusProps> = ({
  employee,
  token,
  update,
  setUpdate
}) => {
  const StatusIcon = getGiftStatusIcon(employee.status)
  const nextStatus = getNextStatus(employee.status)

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
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 20 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="text-beuni-orange h-5 w-5" />
            Status do Brinde
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <article className="flex items-center justify-between">
            <Badge className={getGiftStatusColor(employee.status)}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {getGiftStatusText(employee.status)}
            </Badge>

            <Badge
              className="text-beuni-orange border-orange-200 bg-orange-50"
              variant="outline"
            >
              Tamanho {employee.giftSize}
            </Badge>
          </article>

          {nextStatus && (
            <Button
              className="bg-beuni-orange hover:bg-beuni-orange/90 w-full"
              onClick={() => handleStatusUpdate(employee.giftId, nextStatus)}
              size="sm"
            >
              {getNextStatusText(employee.status)}
            </Button>
          )}

          <article className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500">
              Última atualização:{' '}
              {format(employee.updatedAt, "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR
              })}
            </p>
          </article>
        </CardContent>
      </Card>
    </motion.div>
  )
}

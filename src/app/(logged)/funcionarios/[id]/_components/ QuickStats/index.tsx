'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDaysUntilBirthday } from '@/utils/getters/getDaysUntilBirthday'
import { calculateAge } from '@/utils/helpers/calculateAge'

import { QuickStatsProps } from './types'

export const QuickStats: React.FC<QuickStatsProps> = ({ employee }) => {
  const age = calculateAge(new Date(employee.birthDate))
  const daysUntilBirthday = getDaysUntilBirthday(new Date(employee.birthDate))

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 20 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Rápidas</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <article className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Idade</span>
            <span className="font-medium">{age} anos</span>
          </article>

          <article className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Próximo aniversário</span>
            <span className="font-medium">
              {daysUntilBirthday === 0 ? 'Hoje!' : `${daysUntilBirthday} dias`}
            </span>
          </article>

          <article className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tamanho do brinde</span>
            <span className="font-medium">{employee.giftSize}</span>
          </article>

          <article className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cadastrado em</span>
            <span className="font-medium">
              {format(employee.createdAt, 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          </article>
        </CardContent>
      </Card>
    </motion.div>
  )
}

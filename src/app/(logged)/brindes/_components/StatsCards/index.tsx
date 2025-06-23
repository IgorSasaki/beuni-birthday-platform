'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, Truck } from 'lucide-react'
import { useMemo } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { StatsCardsProps } from './types'

export const StatsCards: React.FC<StatsCardsProps> = ({ gifts }) => {
  const pendingGifts = useMemo(
    () => gifts?.filter(item => item.status === 'PENDING').length ?? 0,
    [gifts]
  )
  const sendGifts = useMemo(
    () => gifts?.filter(item => item.status === 'SENT').length ?? 0,
    [gifts]
  )
  const deliveredGifts = useMemo(
    () => gifts?.filter(item => item.status === 'DELIVERED').length ?? 0,
    [gifts]
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {[
        {
          title: 'Brindes Pendentes',
          value: pendingGifts,
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        },
        {
          title: 'Brindes Enviados',
          value: sendGifts,
          icon: Truck,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        },
        {
          title: 'Brindes Entregues',
          value: deliveredGifts,
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      ].map((stat, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          key={stat.title}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`border-l-4 transition-shadow hover:shadow-md ${stat.borderColor}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <article>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </article>

                <figure className={`rounded-full p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </figure>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

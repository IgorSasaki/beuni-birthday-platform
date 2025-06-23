'use client'

import { motion } from 'framer-motion'
import { Calendar, Gift, TrendingUp, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { StatsCardsProps } from './types'

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: 'Total de Funcionários',
          value: stats?.totalEmployees ?? 0,
          icon: Users,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Aniversários este Mês',
          value: stats?.birthdaysThisMonth.length ?? 0,
          icon: Calendar,
          color: 'text-beuni-orange',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Brindes Pendentes',
          value: stats?.pendingGifts.length ?? 0,
          icon: Gift,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        },
        {
          title: 'Brindes Enviados',
          value: stats?.sendingGifts.length ?? 0,
          icon: TrendingUp,
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        }
      ].map((stat, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          key={stat.title}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <section className="flex items-center justify-between">
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
              </section>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

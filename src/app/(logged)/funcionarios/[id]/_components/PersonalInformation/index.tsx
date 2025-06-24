'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Calendar, Gift, User } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDaysUntilBirthday } from '@/utils/getters/getDaysUntilBirthday'
import { calculateAge } from '@/utils/helpers/calculateAge'

import { PersonalInformationProps } from './types'

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  employee
}) => {
  const age = calculateAge(new Date(employee.birthDate))
  const daysUntilBirthday = getDaysUntilBirthday(new Date(employee.birthDate))

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-beuni-orange h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-beuni-gradient flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white">
              {employee.fullName
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)}
            </div>

            <article>
              <h3 className="text-xl font-semibold text-gray-900">
                {employee.fullName}
              </h3>
              <p className="text-gray-600">{age} anos</p>
            </article>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <section className="flex items-center space-x-3">
                <Calendar className="text-beuni-orange h-5 w-5" />

                <article>
                  <p className="text-sm font-medium text-gray-600">
                    Data de Nascimento
                  </p>

                  <p className="text-gray-900">
                    {format(
                      new Date(employee.birthDate),
                      "dd 'de' MMMM 'de' yyyy",
                      {
                        locale: ptBR
                      }
                    )}
                  </p>
                </article>
              </section>
            </div>

            <div className="space-y-4">
              <section className="flex items-center space-x-3">
                <Gift className="text-beuni-orange h-5 w-5" />

                <article>
                  <p className="text-sm font-medium text-gray-600">
                    Próximo Aniversário
                  </p>
                  <p className="text-gray-900">
                    {daysUntilBirthday === 0
                      ? 'Hoje!'
                      : daysUntilBirthday === 1
                        ? 'Amanhã'
                        : `Em ${daysUntilBirthday} dias`}
                  </p>
                </article>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

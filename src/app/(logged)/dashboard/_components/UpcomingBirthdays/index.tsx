'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const UpcomingBirthdays: React.FC = () => {
  const router = useRouter()

  const getGiftStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'sent':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getGiftStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'sent':
        return 'Enviado'
      case 'delivered':
        return 'Entregue'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-beuni-orange h-5 w-5" />
              Próximos Aniversários
            </CardTitle>
            <CardDescription>
              Funcionários que fazem aniversário em breve
            </CardDescription>
          </div>
          <Button
            className="hover:border-beuni-orange hover:bg-orange-50"
            onClick={() => router.push('/funcionarios')}
            size="sm"
            variant="outline"
          >
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {[].length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p>Nenhum aniversário próximo encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  fullName: 'João da Silva',
                  position: 'Desenvolvedor Frontend',
                  department: 'Tecnologia',
                  birthDate: new Date('2023-10-15')
                }
              ].map((employee, index) => (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  key={employee.id}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-beuni-gradient flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white">
                      {employee.fullName
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>

                    <article>
                      <h4 className="font-semibold text-gray-900">
                        {employee.fullName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {employee.position} • {employee.department}
                      </p>
                      <p className="text-beuni-orange text-sm font-medium">
                        {format(employee.birthDate, "dd 'de' MMMM", {
                          locale: ptBR
                        })}
                      </p>
                    </article>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getGiftStatusColor('pending')}>
                      {getGiftStatusText('pending')}
                    </Badge>

                    <Badge variant="outline">G</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

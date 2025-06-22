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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const GiftsList: React.FC = () => {
  const updatingGifts: Set<string> = new Set() // Simulate updating state
  const isLoading = false // Simulate loading state
  const searchTerm = '' // Simulate search term
  const filters = {} // Simulate filters
  const filteredEmployees = [
    // Simulated employee data
    {
      id: '1',
      fullName: 'João da Silva',
      position: 'Desenvolvedor',
      department: 'TI',
      giftStatus: 'pending',
      giftSize: 'M',
      birthDate: new Date('1990-05-15'),
      address: {
        city: 'São Paulo',
        state: 'SP',
        street: 'Rua A',
        number: '123'
      }
    },
    {
      id: '2',
      fullName: 'Maria Oliveira',
      position: 'Designer',
      department: 'Marketing',
      giftStatus: 'sent',
      giftSize: 'S',
      birthDate: new Date('1985-08-20'),
      address: {
        city: 'Rio de Janeiro',
        state: 'RJ',
        street: 'Rua B',
        number: '456'
      }
    }
  ]

  const getGiftStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const getGiftStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'sent':
        return Truck
      case 'delivered':
        return CheckCircle
      default:
        return Package
    }
  }

  const getNextStatus = (currentStatus: string): string | null => {
    switch (currentStatus) {
      case 'pending':
        return 'sent'
      case 'sent':
        return 'delivered'
      default:
        return null
    }
  }

  const getNextStatusText = (currentStatus: string): string => {
    switch (currentStatus) {
      case 'pending':
        return 'Marcar como Enviado'
      case 'sent':
        return 'Marcar como Entregue'
      default:
        return ''
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
            Brindes ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <span>Carregando...</span>
            </div>
          ) : filteredEmployees.length === 0 ? (
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
              {filteredEmployees.map((employee, index) => {
                const StatusIcon = getGiftStatusIcon(employee.giftStatus)
                const nextStatus = getNextStatus(employee.giftStatus)
                const isUpdating = updatingGifts.has(employee.id)

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    key={employee.id}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-1 items-start space-x-4">
                            <div className="bg-beuni-gradient flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white">
                              {employee.fullName
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .slice(0, 2)}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {employee.fullName}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {employee.position} • {employee.department}
                                  </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={getGiftStatusColor(
                                      employee.giftStatus
                                    )}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {getGiftStatusText(employee.giftStatus)}
                                  </Badge>
                                  <Badge
                                    className="text-beuni-orange border-orange-200 bg-orange-50"
                                    variant="outline"
                                  >
                                    Tamanho {employee.giftSize}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
                                <div className="flex items-center">
                                  <Calendar className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {format(
                                      employee.birthDate,
                                      "dd 'de' MMMM",
                                      { locale: ptBR }
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  <MapPin className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {employee.address.city},{' '}
                                    {employee.address.state}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  <User className="text-beuni-orange mr-2 h-4 w-4" />
                                  <span>
                                    {employee.address.street},{' '}
                                    {employee.address.number}
                                  </span>
                                </div>
                              </div>

                              {nextStatus && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  <Button
                                    className="bg-beuni-orange hover:bg-beuni-orange/90"
                                    disabled={isUpdating}
                                    size="sm"
                                  >
                                    {isUpdating && <span>carregando...</span>}

                                    {getNextStatusText(employee.giftStatus)}
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

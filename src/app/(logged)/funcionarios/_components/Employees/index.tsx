'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Calendar, Gift, Plus, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Employees: React.FC = () => {
  const router = useRouter()

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
      address: { city: 'São Paulo', state: 'SP' }
    },
    {
      id: '2',
      fullName: 'Maria Oliveira',
      position: 'Designer',
      department: 'Marketing',
      giftStatus: 'sent',
      giftSize: 'S',
      birthDate: new Date('1985-08-20'),
      address: { city: 'Rio de Janeiro', state: 'RJ' }
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

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-beuni-orange h-5 w-5" />
            Funcionários ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              Carregando
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Nenhum funcionário encontrado
              </h3>
              <p className="mb-4 text-gray-600">
                {searchTerm || Object.keys(filters).length > 0
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando um novo funcionário'}
              </p>

              <Button
                className="bg-beuni-orange hover:bg-beuni-orange/90"
                onClick={() => router.push('/funcionarios/novo')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Funcionário
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredEmployees.map((employee, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  key={employee.id}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full transition-all duration-200 group-hover:shadow-lg hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-beuni-gradient flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white">
                            {employee.fullName
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="group-hover:text-beuni-orange font-semibold text-gray-900 transition-colors">
                              {employee.fullName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {employee.position}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={getGiftStatusColor(employee.giftStatus)}
                        >
                          {getGiftStatusText(employee.giftStatus)}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="text-beuni-orange mr-2 h-4 w-4" />
                          {format(employee.birthDate, "dd 'de' MMMM", {
                            locale: ptBR
                          })}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="text-beuni-orange mr-2 h-4 w-4" />
                          {employee.department}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Gift className="text-beuni-orange mr-2 h-4 w-4" />
                          Brinde tamanho {employee.giftSize}
                        </div>
                      </div>

                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {employee.address.city}, {employee.address.state}
                          </span>

                          <Button
                            onClick={() =>
                              router.push(`/funcionarios/${employee.id}`)
                            }
                            className="hover:border-beuni-orange hover:text-beuni-orange opacity-0 transition-opacity group-hover:opacity-100 hover:bg-orange-50"
                            size="sm"
                            variant="outline"
                          >
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

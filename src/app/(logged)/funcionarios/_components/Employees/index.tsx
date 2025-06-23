'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Calendar, Gift, Plus, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DEPARTMENTS } from '@/constants/departments'
import { JOB_TITLE_BY_GROUP } from '@/constants/jobTitle'
import { getGiftStatusColor } from '@/utils/helpers/getGiftStatusColor'
import { getGiftStatusText } from '@/utils/helpers/getGiftStatusText'

import { EmployeesProps } from './types'

export const Employees: React.FC<EmployeesProps> = ({
  employees,
  filters,
  searchTerm
}) => {
  const router = useRouter()

  const getDepartmentLabel = (department: string) => {
    const departmentData = DEPARTMENTS.find(dept => dept.value === department)

    return departmentData?.label || department
  }

  const getPositionLabel = (position: string) => {
    for (const group of JOB_TITLE_BY_GROUP) {
      const match = group.items.find(
        item => item.value.trim().toLowerCase() === position
      )

      if (match) return match.label
    }

    return position
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
            Funcionários ({employees.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {employees.length === 0 ? (
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
              {employees.map((employee, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  key={employee.employeeId}
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
                              {getPositionLabel(employee.position)}
                            </p>
                          </div>
                        </div>
                        <Badge className={getGiftStatusColor(employee.status)}>
                          {getGiftStatusText(employee.status)}
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
                          {getDepartmentLabel(employee.department)}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Gift className="text-beuni-orange mr-2 h-4 w-4" />
                          Brinde tamanho {employee.giftSize}
                        </div>
                      </div>

                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {employee.city}, {employee.state}
                          </span>

                          <Button
                            onClick={() =>
                              router.push(
                                `/funcionarios/${employee.employeeId}`
                              )
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

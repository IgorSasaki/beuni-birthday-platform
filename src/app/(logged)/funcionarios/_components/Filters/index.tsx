'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DEPARTMENTS } from '@/constants/departments'

import { MONTHS } from './data'
import { BirthdayFilter } from './types'

export const Filters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<BirthdayFilter>({})

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.1 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <form className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome, cargo ou departamento..."
                  value={searchTerm}
                />
              </form>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Select
                onValueChange={value =>
                  setFilters(prev => ({
                    ...prev,
                    month: value === 'all' ? undefined : parseInt(value)
                  }))
                }
                value={filters.month?.toString() || 'all'}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por mês" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>

                  {MONTHS.map(month => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={value =>
                  setFilters(prev => ({
                    ...prev,
                    department: value === 'all' ? undefined : value
                  }))
                }
                value={filters.department || 'all'}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por depto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os departamentos</SelectItem>
                  {DEPARTMENTS.map(dept => (
                    <SelectItem key={dept.label} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={value =>
                  setFilters(prev => ({
                    ...prev,
                    giftStatus: value === 'all' ? undefined : (value as string)
                  }))
                }
                value={filters.giftStatus || 'all'}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status do brinde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="sent">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

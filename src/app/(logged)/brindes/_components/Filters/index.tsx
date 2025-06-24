'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useCallback } from 'react'

import { BirthdayFilter } from '@/app/(logged)/funcionarios/types'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DEPARTMENTS } from '@/constants/departments'
import { GIFT_STATUS } from '@/constants/gifttStatus'
import { MONTHS } from '@/constants/months'

import { FilterSelect } from './FilterSelect'
import { FiltersProps } from './types'

export const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters
}) => {
  const handleChange = useCallback(
    <K extends keyof BirthdayFilter>(key: K, value: string) => {
      setFilters(prev => ({
        ...prev,
        [key]:
          value === 'ALL'
            ? undefined
            : key === 'month'
              ? parseInt(value, 10)
              : value
      }))
    },
    [setFilters]
  )

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome, cargo ou departamento..."
                  value={searchTerm}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <FilterSelect
                options={[
                  { label: 'Todos os meses', value: 'ALL' },
                  ...MONTHS.map(m => ({
                    label: m.label,
                    value: m.value.toString()
                  }))
                ]}
                label="Filtrar por mês"
                onValueChange={value => handleChange('month', value)}
                value={filters.month?.toString() || 'ALL'}
              />

              <FilterSelect
                options={[
                  { label: 'Todos os departamentos', value: 'ALL' },
                  ...DEPARTMENTS
                ]}
                label="Filtrar por departamento"
                onValueChange={value => handleChange('department', value)}
                value={filters.department || 'ALL'}
              />

              <FilterSelect
                options={[
                  { label: 'Todos os status', value: 'ALL' },
                  ...GIFT_STATUS
                ]}
                label="Status do brinde"
                onValueChange={value => handleChange('status', value)}
                value={filters.status || 'ALL'}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

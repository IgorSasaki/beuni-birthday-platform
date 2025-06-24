'use client'

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDepartmentLabel } from '@/utils/getters/getDepartmentLabel'
import { getPositionLabel } from '@/utils/getters/getPositionLabel'

import { WorkInformationProps } from './types'

export const WorkInformation: React.FC<WorkInformationProps> = ({
  employee
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="text-beuni-orange h-5 w-5" />
            Informações Profissionais
          </CardTitle>
        </CardHeader>

        <CardContent>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article>
              <p className="mb-1 text-sm font-medium text-gray-600">Cargo</p>
              <p className="text-gray-900">
                {getPositionLabel(employee.position)}
              </p>
            </article>

            <article>
              <p className="mb-1 text-sm font-medium text-gray-600">
                Departamento
              </p>
              <p className="text-gray-900">
                {getDepartmentLabel(employee.department)}
              </p>
            </article>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  )
}

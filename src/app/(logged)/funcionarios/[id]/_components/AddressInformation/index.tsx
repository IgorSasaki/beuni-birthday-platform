'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { AddressInformationProps } from './types'

export const AddressInformation: React.FC<AddressInformationProps> = ({
  employee
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-beuni-orange h-5 w-5" />
            Endereço
          </CardTitle>
        </CardHeader>

        <CardContent>
          <article className="space-y-2">
            <p className="font-medium text-gray-900">
              {employee.street}, {employee.number}
              {employee.complement && ` - ${employee.complement}`}
            </p>
            <p className="text-gray-600">{employee.neighborhood}</p>
            <p className="text-gray-600">
              {employee.city} - {employee.state}
            </p>
            <p className="text-gray-600">CEP: {employee.cep}</p>
          </article>
        </CardContent>
      </Card>
    </motion.div>
  )
}

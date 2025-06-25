'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { HeaderProps } from './types'

export const Header: React.FC<HeaderProps> = ({ employee }) => {
  const router = useRouter()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-between space-y-2 lg:flex-row"
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center space-x-4">
        <Button
          className="hover:border-beuni-orange hover:bg-orange-50"
          onClick={() => router.back()}
          size="sm"
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Editar Funcionário
          </h1>
          <p className="mt-1 text-gray-600">
            Atualize as informações de {employee.fullName}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const Header: React.FC = () => {
  const router = useRouter()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
    >
      <article>
        <h1 className="text-3xl font-bold text-gray-900">Aniversariantes</h1>
        <p className="mt-1 text-gray-600">
          Gerencie os funcionários e seus aniversários
        </p>
      </article>

      <Button
        className="bg-beuni-orange hover:bg-beuni-orange/90"
        onClick={() => router.push('/funcionarios/novo')}
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Funcionário
      </Button>
    </motion.div>
  )
}

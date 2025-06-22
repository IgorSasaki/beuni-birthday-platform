'use client'

import { motion } from 'framer-motion'

export const Header: React.FC = () => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Brindes</h1>
        <p className="mt-1 text-gray-600">
          Gerencie o status dos brindes de aniversário
        </p>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export const Container: React.FC = () => {
  return (
    <>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <article className="mb-8 text-center">
          <motion.div
            animate={{ scale: 1 }}
            className="bg-beuni-gradient mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full"
            initial={{ scale: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Calendar className="h-8 w-8 text-neutral-50" />
          </motion.div>

          <h1 className="bg-beuni-gradient bg-clip-text text-3xl font-bold text-transparent">
            BeUni Aniversários
          </h1>

          <p className="mt-2 text-gray-600">
            Gestão profissional de aniversariantes
          </p>
        </article>
      </motion.div>
    </>
  )
}

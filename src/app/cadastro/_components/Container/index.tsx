'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Form } from '../Form'

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

          <p className="mt-2 text-gray-600">Crie sua conta para começar</p>
        </article>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Criar conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form />

            <article className="mt-6 text-center">
              <Link
                className="text-beuni-orange hover:text-beuni-orange/80 inline-flex items-center text-sm font-medium transition-colors"
                href="/acesso"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para login
              </Link>
            </article>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

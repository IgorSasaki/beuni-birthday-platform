'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

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

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Fazer login</CardTitle>

            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <Button
                className="bg-beuni-orange hover:bg-beuni-orange/90 transition-all-smooth w-full cursor-pointer"
                type="submit"
              >
                Entrar
              </Button>
            </form>

            <article className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link
                  className="text-beuni-orange hover:text-beuni-orange/80 font-medium transition-colors"
                  href="/register"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </article>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

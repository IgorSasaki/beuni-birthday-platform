'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { internalAPIInstance } from '@/instances/internalAPI'
import { getDepartmentLabel } from '@/utils/getters/getDepartmentLabel'
import { getPositionLabel } from '@/utils/getters/getPositionLabel'

import { HeaderProps } from './types'

export const Header: React.FC<HeaderProps> = ({ employee, token }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await internalAPIInstance.employee.deleteEmployee(
        employee.employeeId,
        token
      )
      toast.success('Funcionário removido', {
        description: `${employee.fullName} foi removido do sistema`
      })

      router.push('/funcionarios')
    } catch (error) {
      console.error({ handleDeleteError: error })

      toast.error('Erro ao remover funcionário', {
        description: 'Não foi possível remover o funcionário'
      })
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-between space-y-2 lg:flex-row"
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="flex flex-col items-center space-y-4 space-x-4 lg:flex-row lg:space-y-0">
        <Button
          className="hover:border-beuni-orange hover:bg-orange-50"
          onClick={() => router.back()}
          size="sm"
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <article>
          <h1 className="text-3xl font-bold text-gray-900">
            {employee.fullName}
          </h1>
          <p className="mt-1 text-gray-600">
            {getPositionLabel(employee.position)} •{' '}
            {getDepartmentLabel(employee.department)}
          </p>
        </article>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() =>
            router.push(`/funcionarios/${employee.employeeId}/editar`)
          }
          className="hover:border-beuni-orange hover:bg-orange-50"
          variant="outline"
        >
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              variant="outline"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>

              <AlertDialogDescription>
                Tem certeza que deseja excluir{' '}
                <strong>{employee.fullName}</strong>? Esta ação não pode ser
                desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  )
}

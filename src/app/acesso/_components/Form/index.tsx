'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchema } from './schema'
import { LoginFormData } from './types'

export const Form: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      console.log({ data })

      toast.success('Login realizado com sucesso!', {
        description: 'Bem-vindo ao sistema BeUni Aniversários'
      })

      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro no login', {
        description:
          error instanceof Error ? error.message : 'Credenciais inválidas'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          className={cn(
            'transition-all-smooth focus-beuni',
            errors.email && 'border-red-500'
          )}
          id="email"
          placeholder="seu@email.com"
          type="email"
          {...register('email')}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>

        <div className="relative">
          <Input
            className={cn(
              'transition-all-smooth focus-beuni pr-10',
              errors.password && 'border-red-500'
            )}
            id="password"
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />

          <Button
            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            size="sm"
            type="button"
            variant="ghost"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="bg-beuni-orange hover:bg-beuni-orange/90 transition-all-smooth w-full cursor-pointer"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Carregando...' : 'Entrar'}
      </Button>
    </form>
  )
}

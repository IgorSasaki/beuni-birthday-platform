'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Briefcase, CalendarIcon, MapPin, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DEPARTMENTS } from '@/constants/departments'
import { JOB_TITLE_BY_GROUP } from '@/constants/jobTitle'
import { externalAPIInstance } from '@/instances/externalAPI'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchema } from './schema'
import { EmployeeFormData } from './types'

export const Form: React.FC = () => {
  const router = useRouter()

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      console.log({ data })

      toast.success('Funcionário cadastrado com sucesso!', {
        description: `${data.fullName} foi adicionado ao sistema`
      })

      router.push('/funcionarios')
    } catch (error) {
      toast.error('Erro ao cadastrar funcionário', {
        description:
          error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setBirthDate(date)

    if (date) {
      setValue('birthDate', format(date, 'yyyy-MM-dd'))
      clearErrors('birthDate')
    }
  }

  const handleCepLookup = async (cep: string) => {
    if (cep.replace(/\D/g, '').length !== 8) return

    setIsLoadingCep(true)
    try {
      const { data } = await externalAPIInstance.cep.getAddressByCEP(cep)

      if ('error' in data) {
        toast.error('Erro ao consultar CEP', {
          description: data.message
        })
        return
      }

      setValue('street', data.logradouro)
      setValue('neighborhood', data.bairro)
      setValue('city', data.localidade)
      setValue('state', data.uf)

      clearErrors(['street', 'neighborhood', 'city', 'state'])

      toast.success('CEP encontrado', {
        description: 'Endereço preenchido automaticamente'
      })
    } catch (error) {
      console.error({ handleCepLookupError: error })

      toast.error('Erro ao consultar CEP', {
        description: 'Tente novamente mais tarde'
      })
    } finally {
      setIsLoadingCep(false)
    }
  }

  const formatCepInput = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')

    if (cleanValue.length <= 8) {
      setValue('cep', externalAPIInstance.cep.formatCEP(cleanValue))
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-beuni-orange h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <fieldset className="space-y-2">
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                className={cn(errors.fullName && 'border-red-500')}
                id="fullName"
                placeholder="Digite o nome completo"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </fieldset>

            <fieldset className="space-y-2">
              <Label>Data de Nascimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !birthDate && 'text-muted-foreground',
                      errors.birthDate && 'border-red-500'
                    )}
                    variant="outline"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? (
                      format(birthDate, 'dd/MM/yyyy', { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    locale={ptBR}
                    mode="single"
                    onSelect={handleDateSelect}
                    selected={birthDate}
                  />
                </PopoverContent>
              </Popover>
              {errors.birthDate && (
                <p className="text-sm text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
            </fieldset>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-beuni-orange h-5 w-5" />
              Endereço
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <fieldset className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    {...register('cep')}
                    onChange={e => {
                      formatCepInput(e.target.value)
                      if (e.target.value.replace(/\D/g, '').length === 8) {
                        handleCepLookup(e.target.value)
                      }
                    }}
                    className={cn(errors.cep && 'border-red-500')}
                    placeholder="00000-000"
                  />
                  {isLoadingCep && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2">
                      Carregando...
                    </div>
                  )}
                </div>
                {errors.cep && (
                  <p className="text-sm text-red-500">{errors.cep.message}</p>
                )}
              </fieldset>

              <fieldset className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Logradouro *</Label>
                <Input
                  id="street"
                  {...register('street')}
                  className={cn(errors.street && 'border-red-500')}
                  placeholder="Rua, Avenida, etc."
                />
                {errors.street && (
                  <p className="text-sm text-red-500">
                    {errors.street.message}
                  </p>
                )}
              </fieldset>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <fieldset className="space-y-2">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  {...register('number')}
                  className={cn(errors.number && 'border-red-500')}
                  placeholder="123"
                />
                {errors.number && (
                  <p className="text-sm text-red-500">
                    {errors.number.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="space-y-2 md:col-span-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  {...register('complement')}
                  placeholder="Apartamento, sala, etc."
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <fieldset className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  {...register('neighborhood')}
                  className={cn(errors.neighborhood && 'border-red-500')}
                  placeholder="Bairro"
                />
                {errors.neighborhood && (
                  <p className="text-sm text-red-500">
                    {errors.neighborhood.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  {...register('city')}
                  className={cn(errors.city && 'border-red-500')}
                  placeholder="Cidade"
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </fieldset>

              <fieldset className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  {...register('state')}
                  className={cn(errors.state && 'border-red-500')}
                  maxLength={2}
                  placeholder="UF"
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </fieldset>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="text-beuni-orange h-5 w-5" />
              Informações Profissionais
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <fieldset className="space-y-2">
                <Label htmlFor="position">Cargo *</Label>
                <Select
                  name="position"
                  onValueChange={value => setValue('position', value)}
                >
                  <SelectTrigger
                    className={cn(errors.position && 'border-red-500')}
                  >
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TITLE_BY_GROUP.map(group => (
                      <SelectGroup key={group.group}>
                        <SelectLabel>{group.group}</SelectLabel>
                        {group.items.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>

                {errors.position && (
                  <p className="text-sm text-red-500">
                    {errors.position.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="space-y-2">
                <Label htmlFor="department">Departamento *</Label>
                <Select
                  name="department"
                  onValueChange={value => setValue('department', value)}
                >
                  <SelectTrigger
                    className={cn(errors.department && 'border-red-500')}
                  >
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>

                  <SelectContent>
                    {DEPARTMENTS.map(dep => (
                      <SelectItem key={dep.value} value={dep.value}>
                        {dep.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.department && (
                  <p className="text-sm text-red-500">
                    {errors.department.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="space-y-2">
                <Label htmlFor="giftSize">Tamanho do Brinde *</Label>
                <Select
                  onValueChange={value =>
                    setValue('giftSize', value as 'P' | 'M' | 'G' | 'GG' | 'XG')
                  }
                >
                  <SelectTrigger
                    className={cn(errors.giftSize && 'border-red-500')}
                  >
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="P">P - Pequeno</SelectItem>
                    <SelectItem value="M">M - Médio</SelectItem>
                    <SelectItem value="G">G - Grande</SelectItem>
                    <SelectItem value="GG">GG - Extra Grande</SelectItem>
                    <SelectItem value="XG">XG - Extra Extra Grande</SelectItem>
                  </SelectContent>
                </Select>

                {errors.giftSize && (
                  <p className="text-sm text-red-500">
                    {errors.giftSize.message}
                  </p>
                )}
              </fieldset>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            className="bg-beuni-orange hover:bg-beuni-orange/90"
            type="submit"
          >
            Cadastrar Funcionário
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

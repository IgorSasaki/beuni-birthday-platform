import { z } from 'zod'

export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),

  birthDate: z
    .string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine(date => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 16 && age <= 100
    }, 'Idade deve estar entre 16 e 100 anos'),

  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-?\d{3}$/, 'CEP deve ter o formato 00000-000'),

  street: z
    .string()
    .min(1, 'Logradouro é obrigatório')
    .max(200, 'Logradouro deve ter no máximo 200 caracteres'),

  number: z
    .string()
    .min(1, 'Número é obrigatório')
    .max(20, 'Número deve ter no máximo 20 caracteres'),

  complement: z
    .string()
    .max(100, 'Complemento deve ter no máximo 100 caracteres')
    .optional(),

  neighborhood: z
    .string()
    .min(1, 'Bairro é obrigatório')
    .max(100, 'Bairro deve ter no máximo 100 caracteres'),

  city: z
    .string()
    .min(1, 'Cidade é obrigatória')
    .max(100, 'Cidade deve ter no máximo 100 caracteres'),

  state: z
    .string()
    .min(1, 'Estado é obrigatório')
    .length(2, 'Estado deve ter 2 caracteres (UF)'),

  giftSize: z.enum(['P', 'M', 'G', 'GG', 'XG'], {
    required_error: 'Tamanho do brinde é obrigatório',
    invalid_type_error: 'Tamanho inválido'
  }),

  position: z
    .string()
    .min(1, 'Cargo é obrigatório')
    .max(100, 'Cargo deve ter no máximo 100 caracteres'),

  department: z
    .string()
    .min(1, 'Departamento é obrigatório')
    .max(100, 'Departamento deve ter no máximo 100 caracteres')
})

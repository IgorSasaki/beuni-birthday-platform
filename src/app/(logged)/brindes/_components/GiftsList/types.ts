import { BirthdayFilter } from '@/app/(logged)/funcionarios/types'
import { Gift } from '@/models/Gifts'

export interface GiftsListProps {
  filters: BirthdayFilter
  gifts: Gift[]
  searchTerm: string
}

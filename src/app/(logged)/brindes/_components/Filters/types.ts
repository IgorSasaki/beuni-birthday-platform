import { Dispatch, SetStateAction } from 'react'

import { BirthdayFilter } from '@/app/(logged)/funcionarios/types'

export interface FiltersProps {
  filters: BirthdayFilter
  searchTerm: string
  setFilters: Dispatch<SetStateAction<BirthdayFilter>>
  setSearchTerm: (value: string) => void
}

export interface FilterSelectProps {
  label: string
  onValueChange: (value: string) => void
  options: { label: string; value: string }[]
  value: string
}

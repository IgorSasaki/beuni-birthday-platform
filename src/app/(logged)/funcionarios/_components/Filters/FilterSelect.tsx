'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { FilterSelectProps } from './types'

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onValueChange,
  options
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger aria-label={label} className="w-full sm:w-48">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

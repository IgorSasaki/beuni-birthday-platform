import { Employee } from '@/models/Employee'

import { FiltersProps } from '../Filters/types'

export interface EmployeesProps extends FiltersProps {
  employees: Employee[]
}

import { DEPARTMENTS } from '@/constants/departments'

export const getDepartmentLabel = (department: string) => {
  const departmentData = DEPARTMENTS.find(dept => dept.value === department)

  return departmentData?.label || department
}

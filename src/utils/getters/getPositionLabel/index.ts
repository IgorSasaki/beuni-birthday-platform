import { JOB_TITLE_BY_GROUP } from '@/constants/jobTitle'

export const getPositionLabel = (position: string) => {
  for (const group of JOB_TITLE_BY_GROUP) {
    const match = group.items.find(
      item => item.value.trim().toLowerCase() === position
    )

    if (match) return match.label
  }

  return position
}

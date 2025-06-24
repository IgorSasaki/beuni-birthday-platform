import { getNextBirthday } from '../getNextBirthday'

export const getDaysUntilBirthday = (birthDate: Date): number => {
  const today = new Date()

  const nextBirthday = getNextBirthday(birthDate)
  const diffTime = nextBirthday.getTime() - today.getTime()

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const getNextBirthday = (birthDate: Date): Date => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const nextBirthday = new Date(
    thisYear,
    birthDate.getMonth(),
    birthDate.getDate()
  )

  if (nextBirthday < today) {
    nextBirthday.setFullYear(thisYear + 1)
  }

  return nextBirthday
}

import { addDays } from 'date-fns'

export function randomDateFromToday() {
  const minDays = 3
  const maxDays = 30
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays
  const randomDate = addDays(new Date(), randomDays)
  return randomDate
}

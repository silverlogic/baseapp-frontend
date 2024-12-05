import { DATE_FORMAT, formatDateFromApi, isToday, isYesterday } from '@baseapp-frontend/utils'

export const displayFormattedDate = (date: string) => {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return formatDateFromApi(date, { toFormat: DATE_FORMAT[2] })
}

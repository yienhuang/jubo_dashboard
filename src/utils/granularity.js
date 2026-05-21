import dayjs from 'dayjs'

export function getGranularity(from, to) {
  const diff = dayjs(to).diff(dayjs(from), 'month')
  return diff <= 1 ? 'day' : 'month'
}

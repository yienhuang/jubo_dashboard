import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

const VALID_GRANULARITIES = ['month', 'quarter', 'year']

function currentPeriodFor(granularity) {
  const now = dayjs()
  if (granularity === 'quarter') {
    return `${now.year()}-Q${Math.floor(now.month() / 3) + 1}`
  }
  if (granularity === 'year') {
    return `${now.year()}`
  }
  return now.format('YYYY-MM')
}

function isValidPeriod(granularity, period) {
  if (!period) return false
  if (granularity === 'month') return /^\d{4}-(0[1-9]|1[0-2])$/.test(period)
  if (granularity === 'quarter') return /^\d{4}-Q[1-4]$/.test(period)
  if (granularity === 'year') return /^\d{4}$/.test(period)
  return false
}

export function usePeriod() {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawGranularity = searchParams.get('granularity')
  const granularity = VALID_GRANULARITIES.includes(rawGranularity)
    ? rawGranularity
    : 'month'

  const rawPeriod = searchParams.get('period')
  const period = isValidPeriod(granularity, rawPeriod)
    ? rawPeriod
    : currentPeriodFor(granularity)

  const setPeriod = useCallback(
    (newGranularity, newPeriod) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('granularity', newGranularity)
          next.set('period', newPeriod)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { granularity, period, setPeriod, currentPeriodFor }
}

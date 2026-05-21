import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

function defaultRange() {
  const to = dayjs().format('YYYY-MM')
  const from = dayjs().subtract(2, 'month').format('YYYY-MM')
  return { from, to }
}

export function useDateRange() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaults = defaultRange()

  const from = searchParams.get('from') || defaults.from
  const to = searchParams.get('to') || defaults.to

  const setRange = useCallback(
    (newFrom, newTo) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('from', newFrom)
          next.set('to', newTo)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { from, to, setRange }
}

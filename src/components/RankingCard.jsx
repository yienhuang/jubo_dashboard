import { Fragment } from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { SummaryCard } from '@/components/SectionBlocks'

const PRIMARY_DARK = '#005F64'

export function RankingBadge({ rank }) {
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: 'rgba(0,151,167,0.12)',
        color: PRIMARY_DARK,
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '0.15px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {rank}
    </Box>
  )
}

const defaultValueFormatter = (item) => (
  <>
    ${item.value.toLocaleString()}{' '}
    <Typography component="span" variant="caption" color="textSecondary">
      {item.unit ?? '萬'}
    </Typography>
  </>
)

export function RankingRow({ row, valueFormatter, showTypeLabel }) {
  const fmt = valueFormatter ?? defaultValueFormatter
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <RankingBadge rank={row.rank} />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
        <Typography
          variant="body1"
          sx={{ color: 'text.primary' }}
          noWrap
        >
          {row.name}
        </Typography>
        {showTypeLabel && row.typeLabel && (
          <Typography variant="body2" color="textSecondary">
            {row.typeLabel}
          </Typography>
        )}
        {row.subtitle && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block' }}
          >
            {row.subtitle}
          </Typography>
        )}
      </Box>
      <Typography
        variant="body1"
        sx={{ fontWeight: 500, color: 'text.primary', whiteSpace: 'nowrap' }}
      >
        {fmt(row)}
      </Typography>
    </Box>
  )
}

export default function RankingCard({
  title,
  subtitle,
  items,
  valueFormatter,
  showTypeLabel = false,
}) {
  return (
    <SummaryCard title={title} subtitle={subtitle}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((row, idx) => (
          <Fragment key={row.id ?? `${row.rank}-${row.name}`}>
            {idx > 0 && <Divider />}
            <RankingRow
              row={row}
              valueFormatter={valueFormatter}
              showTypeLabel={showTypeLabel}
            />
          </Fragment>
        ))}
      </Box>
    </SummaryCard>
  )
}

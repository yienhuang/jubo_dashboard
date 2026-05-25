import { Box, Paper, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'

import ServiceShareChart from '@/components/charts/ServiceShareChart'

const PRIMARY_DARK = '#005F64'
const WARNING = '#ED6C02'

// ── Delta indicator (↑ +5% / ↓ -2% / flat) ─────────────────
export function DeltaRow({ delta }) {
  if (!delta) return null
  if (delta.threshold) {
    return (
      <Box
        className="flex items-center justify-between"
        sx={{ mt: 0.5, gap: 1 }}
      >
        <Typography
          variant="caption"
          sx={{
            color: delta.isWarning ? WARNING : 'rgba(0,0,0,0.6)',
            fontWeight: delta.isWarning ? 500 : 400,
          }}
        >
          {delta.text}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.38)' }}>
          {delta.threshold}
        </Typography>
      </Box>
    )
  }
  if (delta.noIcon) {
    return (
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ display: 'block', mt: 0.5 }}
      >
        {delta.text}
      </Typography>
    )
  }
  const color = delta.isWarning
    ? WARNING
    : delta.dir === 'flat'
      ? 'rgba(0,0,0,0.6)'
      : green[600]
  const Icon =
    delta.dir === 'up'
      ? ArrowUpwardIcon
      : delta.dir === 'down'
        ? ArrowDownwardIcon
        : TrendingFlatIcon
  return (
    <Box className="flex items-center gap-0.5" sx={{ mt: 0.5 }}>
      <Icon sx={{ fontSize: 12, color }} />
      <Typography variant="caption" sx={{ color, fontWeight: 500 }}>
        {delta.text}
      </Typography>
    </Box>
  )
}

// ── Category section title (icon + title + subtitle) ───────
export function SectionTitle({ icon, title, subtitle }) {
  return (
    <Box className="flex items-center gap-3" sx={{ mb: 2 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '8px',
          bgcolor: 'rgba(0,151,167,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: PRIMARY_DARK,
          '& svg': { fontSize: 28 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: '#37474F', lineHeight: 1.3, letterSpacing: '0.15px' }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

// ── Category-level wrapper (white paper + SectionTitle) ────
export function CategoryPaper({ icon, title, subtitle, children }) {
  return (
    <Paper sx={{ borderRadius: '8px', p: 2, boxShadow: 'none' }}>
      <SectionTitle icon={icon} title={title} subtitle={subtitle} />
      {children}
    </Paper>
  )
}

// ── Summary card (white paper with title/subtitle header) ──
// Used as wrapper for HighlightsCard / RankingCard
export function SummaryCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box>
        <Typography variant="subtitle4" sx={{ color: '#37474F' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', mt: 0.25 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </Paper>
  )
}

// ── Sub-block (1px-bordered card for charts/tables) ────────
export function OutlinedBlock({
  title,
  subtitle,
  headerRight,
  children,
  fullHeight = true,
  bodyPadding = 0,
}) {
  return (
    <Box
      sx={{
        height: fullHeight ? '100%' : 'auto',
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box className="flex items-start justify-between" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', mt: 0.25 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {headerRight}
      </Box>
      <Box sx={{ flex: 1, p: bodyPadding }}>{children}</Box>
    </Box>
  )
}

// ── KPI tile (soft grey background, no border) ─────────────
export function KpiTile({ title, value, unit, delta, hint }) {
  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'rgba(120,144,156,0.08)',
        borderRadius: '8px',
        p: 2,
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Box className="mt-3 flex items-baseline gap-1">
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: 'text.primary',
            letterSpacing: 0,
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography variant="body2" color="textSecondary" sx={{ pb: '2px' }}>
            {unit}
          </Typography>
        )}
      </Box>
      {delta && <DeltaRow delta={delta} />}
      {!delta && hint && (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: 'block', mt: 0.5 }}
        >
          {hint}
        </Typography>
      )}
    </Box>
  )
}

// ── YoY badge (small pill with up arrow) ───────────────────
export function YoyBadge({ value, sx }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'rgba(46,125,50,0.12)',
        color: green[700],
        px: 1,
        py: 0.25,
        borderRadius: '16px',
        flexShrink: 0,
        ...sx,
      }}
    >
      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
      <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
        YoY +{value}%
      </Typography>
    </Box>
  )
}

// ── Pie + legend (donut on left, legend rows on right) ─────
export function ShareCardContent({
  data,
  totalLabel,
  unit,
  valueFormatter,
  centerOverride,
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const fmt = valueFormatter ?? ((v) => v.toLocaleString())
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Box sx={{ width: 220, flexShrink: 0 }}>
        <ServiceShareChart
          data={data}
          totalLabel={totalLabel}
          unit={unit}
          totalFormatter={fmt}
          height={220}
          centerOverride={centerOverride}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1)
          return (
            <Box
              key={item.name}
              className="flex items-center justify-between"
              sx={{ py: 0.75 }}
            >
              <Box className="flex items-center gap-2">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: item.color,
                  }}
                />
                <Typography variant="body1">{item.name}</Typography>
              </Box>
              <Box
                className="flex items-baseline"
                sx={{ gap: 2, flexShrink: 0 }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, textAlign: 'right', minWidth: 80 }}
                >
                  {fmt(item.value)} {unit}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ textAlign: 'right', minWidth: 48 }}
                >
                  {pct}%
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

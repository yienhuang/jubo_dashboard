import { Box, LinearProgress, Typography } from '@mui/material'

const PRIMARY = '#0097A7'
const WARNING = '#ED6C02'
const WARNING_LIGHT = '#FF9800'

// Horizontal progress bar with right-aligned percentage label
// Used in ranking tables to visualize a 0-100% metric (收款率 / 收案率 / 離職率)
export default function CollectionRateBar({
  value,
  warningThreshold,
  warningBelow,
  width = 140,
  showMarker = false,
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const isWarning =
    (warningThreshold != null && value > warningThreshold) ||
    (warningBelow != null && value < warningBelow)
  const barColor = isWarning ? WARNING_LIGHT : PRIMARY

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        width,
      }}
    >
      <Box sx={{ flex: 1, position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={clamped}
          sx={{
            height: 6,
            borderRadius: 4,
            bgcolor: 'rgba(120,144,156,0.16)',
            '& .MuiLinearProgress-bar': {
              bgcolor: barColor,
              borderRadius: 4,
            },
          }}
        />
        {showMarker && isWarning && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${clamped}%`,
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: WARNING,
              border: '2px solid #fff',
            }}
          />
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: isWarning ? WARNING : 'text.primary',
          minWidth: 44,
          textAlign: 'right',
        }}
      >
        {value.toFixed(1)}%
      </Typography>
    </Box>
  )
}

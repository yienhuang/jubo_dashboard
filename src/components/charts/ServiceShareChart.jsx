import { PieChart, Pie, Tooltip } from 'recharts'
import { Box, Typography } from '@mui/material'

export default function ServiceShareChart({
  data,
  height = 220,
  totalLabel = '服務人數',
  unit = '人',
  totalFormatter,
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const totalDisplay = totalFormatter ? totalFormatter(total) : total.toLocaleString()
  const chartData = data.map((d) => ({ ...d, fill: d.color }))

  return (
    <Box sx={{ position: 'relative', width: height, height }}>
      <PieChart width={height} height={height} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx={height / 2}
          cy={height / 2}
          innerRadius={62}
          outerRadius={92}
          paddingAngle={2}
          stroke="none"
          isAnimationActive={false}
        />
        <Tooltip
          formatter={(value, name) => [`${value.toLocaleString()} ${unit} (${((value / total) * 100).toFixed(1)}%)`, name]}
          contentStyle={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 8,
            boxShadow: 'none',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 13,
          }}
        />
      </PieChart>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Typography variant="caption" sx={{ color: '#546E7A' }}>
          {totalLabel}
        </Typography>
        <Typography sx={{ fontSize: 28, fontWeight: 500, color: 'text.primary', lineHeight: 1.2 }}>
          {totalDisplay}
        </Typography>
        <Typography variant="caption" sx={{ color: '#546E7A' }}>
          {unit}
        </Typography>
      </Box>
    </Box>
  )
}

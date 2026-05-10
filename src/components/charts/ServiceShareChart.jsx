import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Box, Typography } from '@mui/material'

export default function ServiceShareChart({ data, height = 220, totalLabel = '服務人數' }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Box sx={{ position: 'relative', width: '100%', height }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} 人 (${((value / total) * 100).toFixed(1)}%)`, name]}
            contentStyle={{
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 8,
              boxShadow: 'none',
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 13,
            }}
          />
        </PieChart>
      </ResponsiveContainer>

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
        <Typography sx={{ fontSize: 28, fontWeight: 500, color: '#005F64', lineHeight: 1.2 }}>
          {total.toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ color: '#546E7A' }}>
          人
        </Typography>
      </Box>
    </Box>
  )
}

import { Box, Paper, Typography } from '@mui/material'
import MonthRangePicker from './MonthRangePicker'

export default function PageHeader({ title, showDateRange = true }) {
  return (
    <Paper sx={{ borderRadius: '8px' }}>
      <Box
        sx={{
          px: 2,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          minHeight: 64,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {showDateRange && <MonthRangePicker />}
      </Box>
    </Paper>
  )
}

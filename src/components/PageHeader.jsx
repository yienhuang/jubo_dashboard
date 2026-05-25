import { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import PeriodPicker from './PeriodPicker'

export default function PageHeader({ title, showDateRange = true }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 64,
        zIndex: 1100,
        backgroundColor: '#EAF3F5',
      }}
    >
      <Paper
        sx={{
          borderRadius: isScrolled ? '8px 8px 0 0' : '8px',
          borderBottom: '1px solid',
          borderBottomColor: isScrolled ? 'rgba(0,0,0,0.08)' : 'transparent',
          transition: 'border-color 200ms ease, border-radius 200ms ease',
        }}
      >
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
          {showDateRange && <PeriodPicker />}
        </Box>
      </Paper>
    </Box>
  )
}

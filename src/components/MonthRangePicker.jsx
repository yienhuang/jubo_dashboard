import { useState } from 'react'
import { Box, Button, Chip, Popover, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useDateRange } from '@/hooks/useDateRange'

function buildPresets(today) {
  return [
    { label: '本月', from: today.format('YYYY-MM'), to: today.format('YYYY-MM') },
    {
      label: '近3個月',
      from: today.subtract(2, 'month').format('YYYY-MM'),
      to: today.format('YYYY-MM'),
    },
    {
      label: '近6個月',
      from: today.subtract(5, 'month').format('YYYY-MM'),
      to: today.format('YYYY-MM'),
    },
    {
      label: '近1年',
      from: today.subtract(11, 'month').format('YYYY-MM'),
      to: today.format('YYYY-MM'),
    },
  ]
}

const CHIP_BASE_SX = {
  fontSize: 14,
  '& .MuiChip-label': { px: 1.5 },
}

const CHIP_ACTIVE_SX = {
  ...CHIP_BASE_SX,
  backgroundColor: 'rgba(0,151,167,0.12)',
  color: '#0097A7',
  fontWeight: 500,
  '&:hover': { backgroundColor: 'rgba(0,151,167,0.2)' },
}

const CHIP_DEFAULT_SX = {
  ...CHIP_BASE_SX,
  color: 'rgba(0,0,0,0.6)',
  borderColor: 'rgba(0,0,0,0.23)',
  '&:hover': { backgroundColor: 'rgba(0,151,167,0.08)' },
}

export default function MonthRangePicker() {
  const { from, to, setRange } = useDateRange()
  const [anchorEl, setAnchorEl] = useState(null)
  const [customFrom, setCustomFrom] = useState(null)
  const [customTo, setCustomTo] = useState(null)

  const today = dayjs()
  const presets = buildPresets(today)
  const activePreset = presets.find((p) => p.from === from && p.to === to)
  const isCustom = !activePreset

  const handlePreset = (preset) => setRange(preset.from, preset.to)

  const handleCustomOpen = (e) => {
    setCustomFrom(dayjs(from + '-01'))
    setCustomTo(dayjs(to + '-01'))
    setAnchorEl(e.currentTarget)
  }

  const handleCustomClose = () => setAnchorEl(null)

  const handleApply = () => {
    if (customFrom && customTo) {
      setRange(customFrom.format('YYYY-MM'), customTo.format('YYYY-MM'))
    }
    setAnchorEl(null)
  }

  return (
    <Box className="flex items-center gap-1.5">
      {presets.map((preset) => {
        const active = activePreset?.label === preset.label
        return (
          <Chip
            key={preset.label}
            label={preset.label}
            size="small"
            variant={active ? 'filled' : 'outlined'}
            onClick={() => handlePreset(preset)}
            sx={active ? CHIP_ACTIVE_SX : CHIP_DEFAULT_SX}
          />
        )
      })}

      <Chip
        label={
          isCustom
            ? `${from.replace('-', '/')} ~ ${to.replace('-', '/')}`
            : '自訂'
        }
        size="small"
        variant={isCustom ? 'filled' : 'outlined'}
        onClick={handleCustomOpen}
        sx={isCustom ? CHIP_ACTIVE_SX : CHIP_DEFAULT_SX}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCustomClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              mt: 0.5,
              width: 240,
              overflow: 'visible',
              boxShadow:
                '0px 11px 15px rgba(0,0,0,0.2), 0px 9px 46px rgba(0,0,0,0.12)',
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
            自訂月份區間
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <DatePicker
              label="開始月份"
              views={['year', 'month']}
              openTo="month"
              format="YYYY/MM"
              value={customFrom}
              onChange={setCustomFrom}
              maxDate={customTo ?? today}
              slotProps={{
                popper: { disablePortal: true },
                textField: { size: 'small', sx: { width: '100%' } },
              }}
            />
            <DatePicker
              label="結束月份"
              views={['year', 'month']}
              openTo="month"
              format="YYYY/MM"
              value={customTo}
              onChange={setCustomTo}
              minDate={customFrom ?? undefined}
              maxDate={today}
              slotProps={{
                popper: { disablePortal: true },
                textField: { size: 'small', sx: { width: '100%' } },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button size="small" onClick={handleCustomClose} sx={{ mr: 1 }}>
              取消
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleApply}
              disabled={!customFrom || !customTo}
            >
              套用
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

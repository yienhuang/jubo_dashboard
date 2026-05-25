import { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import dayjs from 'dayjs'
import { usePeriod } from '@/hooks/usePeriod'

const GRANULARITIES = [
  { value: 'month', label: '月' },
  { value: 'quarter', label: '季' },
  { value: 'year', label: '年' },
]

const OPTION_COUNT = {
  month: 24,
  quarter: 16,
  year: 10,
}

function formatActiveLabel(granularity, period) {
  if (granularity === 'month') {
    const d = dayjs(`${period}-01`)
    return `${d.year()} 年 ${d.month() + 1} 月`
  }
  if (granularity === 'quarter') {
    const [year, q] = period.split('-Q')
    return `${year} ${q ? `Q${q}` : ''}`.trim()
  }
  return period
}

function buildOptions(granularity) {
  const count = OPTION_COUNT[granularity]
  const now = dayjs()

  if (granularity === 'month') {
    return Array.from({ length: count }, (_, i) => {
      const d = now.subtract(i, 'month')
      return {
        value: d.format('YYYY-MM'),
        label: `${d.year()} 年 ${d.month() + 1} 月`,
      }
    })
  }

  if (granularity === 'quarter') {
    const currentQ = Math.floor(now.month() / 3) + 1
    return Array.from({ length: count }, (_, i) => {
      const totalQ = now.year() * 4 + (currentQ - 1) - i
      const year = Math.floor(totalQ / 4)
      const q = (totalQ % 4) + 1
      return { value: `${year}-Q${q}`, label: `${year} Q${q}` }
    })
  }

  return Array.from({ length: count }, (_, i) => {
    const y = now.year() - i
    return { value: String(y), label: `${y} 年` }
  })
}

const ACTIVE_BTN_SX = {
  backgroundColor: 'rgba(0,151,167,0.12)',
  borderColor: 'rgba(0,151,167,0.5)',
  color: 'primary.main',
  '&:hover': {
    backgroundColor: 'rgba(0,151,167,0.2)',
    borderColor: 'rgba(0,151,167,0.5)',
  },
}

const INACTIVE_BTN_SX = {
  color: 'rgba(0,0,0,0.87)',
  borderColor: 'rgba(0,0,0,0.23)',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0,151,167,0.04)',
    borderColor: 'rgba(0,0,0,0.23)',
  },
}

const MENU_ITEM_SX = {
  px: 2,
  py: 0.75,
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: '0.15px',
  color: 'rgba(0,0,0,0.87)',
  '&.Mui-selected': {
    color: 'primary.main',
    backgroundColor: 'rgba(0,151,167,0.12)',
    '&:hover': { backgroundColor: 'rgba(0,151,167,0.2)' },
  },
  '&:hover': { backgroundColor: 'rgba(0,151,167,0.08)' },
}

export default function PeriodPicker() {
  const { granularity, period, setPeriod } = usePeriod()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openFor, setOpenFor] = useState(null)

  const openMenu = (e, g) => {
    setAnchorEl(e.currentTarget)
    setOpenFor(g)
  }

  const closeMenu = () => {
    setAnchorEl(null)
    setOpenFor(null)
  }

  const handleSelect = (value) => {
    setPeriod(openFor, value)
    closeMenu()
  }

  const options = openFor ? buildOptions(openFor) : []
  const selectedValue = openFor && granularity === openFor ? period : null

  return (
    <Box>
      <Box className="flex">
        {GRANULARITIES.map(({ value, label }, idx) => {
          const isActive = granularity === value
          const isFirst = idx === 0
          const isLast = idx === GRANULARITIES.length - 1
          return (
            <Button
              key={value}
              variant="outlined"
              size="small"
              disableElevation
              onClick={(e) => openMenu(e, value)}
              endIcon={<ArrowDropDownIcon sx={{ fontSize: 20 }} />}
              sx={{
                px: 2,
                py: 0.75,
                minWidth: 0,
                textTransform: 'none',
                fontWeight: 500,
                letterSpacing: '0.4px',
                whiteSpace: 'nowrap',
                marginLeft: isFirst ? 0 : '-1px',
                borderRadius: isFirst ? '4px 0 0 4px' : isLast ? '0 4px 4px 0' : 0,
                zIndex: isActive ? 1 : 0,
                ...(isActive ? ACTIVE_BTN_SX : INACTIVE_BTN_SX),
              }}
            >
              {isActive ? `${label}：${formatActiveLabel(value, period)}` : label}
            </Button>
          )
        })}
      </Box>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              width: 160,
              maxHeight: 320,
              borderRadius: '4px',
              boxShadow:
                '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
            },
          },
          list: { sx: { py: 1 } },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            dense
            selected={selectedValue === opt.value}
            onClick={() => handleSelect(opt.value)}
            sx={MENU_ITEM_SX}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

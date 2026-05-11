import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import BadgeIcon from '@mui/icons-material/Badge'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import HomeIcon from '@mui/icons-material/Home'
import HotelIcon from '@mui/icons-material/Hotel'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import StatCard from '@/components/StatCard'
import ServiceShareChart from '@/components/charts/ServiceShareChart'
import OccupancyChart from '@/components/charts/OccupancyChart'
import { green } from '@mui/material/colors'
import {
  reportDate,
  kpis,
  serviceShare,
  facilities,
  serviceOverviews,
} from '@/features/dashboard/mockData'

const SERVICE_ICONS = {
  hotel: <HotelIcon />,
  sun: <WbSunnyIcon />,
  home: <HomeIcon />,
}

const kpiIcons = {
  serviceTotal: <GroupIcon />,
  staffTotal: <BadgeIcon />,
  newHired: <PersonAddIcon />,
  resigned: <PersonRemoveIcon />,
}

function SectionHeader({ title, action }) {
  return (
    <Box className="flex items-center justify-between" sx={{ mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {action}
    </Box>
  )
}

function PageHeader() {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
          集團總覽
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {reportDate}
        </Typography>
      </Box>
    </Box>
  )
}

function KpiRow() {
  return (
    <Grid container spacing={2}>
      {kpis.map((kpi) => (
        <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            hint={kpi.hint}
            delta={kpi.delta}
            icon={kpiIcons[kpi.key]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

function ServiceShareCard() {
  const total = serviceShare.reduce((s, d) => s + d.value, 0)
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <SectionHeader title="全集團服務佔比" />
        <ServiceShareChart data={serviceShare} />
        <Box sx={{ mt: 2 }}>
          {serviceShare.map((item) => {
            const ratio = ((item.value / total) * 100).toFixed(1)
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
                <Box className="flex items-baseline gap-4">
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.value} 人
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {ratio}%
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}

function OccupancyTrendCard() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SectionHeader title="近 6 個月住宿空床率與日照出席率" />
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <OccupancyChart height="100%" />
        </Box>
      </CardContent>
    </Card>
  )
}

const FACILITY_GROUPS = [
  { label: '住宿長照', type: '住宿長照', color: '#0097A7', capacityUnit: '床' },
  { label: '日間照顧', type: '日間照顧', color: '#005F64', capacityUnit: '人' },
  { label: '居家服務', type: '居家服務', color: '#26A69A', capacityUnit: null },
]

function FacilitySummaryCard() {
  const groups = FACILITY_GROUPS.map((g) => ({
    ...g,
    items: facilities.filter((f) => f.type === g.type),
  }))

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <SectionHeader title="旗下機構總覽" />

        <Box className="flex flex-col">
          {groups.map((g, i) => (
            <Box key={g.type}>
              {i > 0 && <Divider sx={{ my: 1.5 }} />}
              <Box className="flex items-center" sx={{ mb: 0.75 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: g.color }}>
                  {g.items.length} 間{g.label}
                </Typography>
              </Box>
              {g.items.map((f) => (
                <Box
                  key={f.id}
                  className="flex items-center justify-between"
                  sx={{ py: 0.5 }}
                >
                  <Typography variant="body1">{f.name}</Typography>
                  {g.capacityUnit && (
                    <Typography variant="body1" color="textSecondary">
                      核定 {f.capacity} {g.capacityUnit}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function SectionStatCard({ title, value, unit, hint, delta, alert }) {
  let DeltaIcon = null
  if (delta?.dir === 'up') DeltaIcon = ArrowUpwardIcon
  else if (delta?.dir === 'down') DeltaIcon = ArrowDownwardIcon
  else if (delta?.dir === 'flat') DeltaIcon = TrendingFlatIcon

  const deltaColor = delta?.isWarning ? 'warning.main' : delta?.dir === 'flat' ? 'text.secondary' : green[500]

  return (
    <Box
      sx={{
        bgcolor: 'rgba(120,144,156,0.08)',
        borderRadius: '8px',
        pl: '15px',
        pr: '12px',
        py: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="body1">
        {title}
      </Typography>
      <Box className="flex items-baseline gap-1">
        <Typography
          sx={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: 'text.primary', letterSpacing: 0 }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography variant="caption" color="textSecondary">
            {unit}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {delta && DeltaIcon && (
          <>
            <DeltaIcon sx={{ fontSize: 12, color: deltaColor }} />
            <Typography variant="caption" sx={{ color: deltaColor, fontWeight: 500 }}>
              {delta.text}
            </Typography>
          </>
        )}
        {alert && (
          <>
            <WarningAmberIcon sx={{ fontSize: 12, color: 'warning.main' }} />
            <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 500 }}>
              {alert}
            </Typography>
          </>
        )}
        {hint && !delta && !alert && (
          <Typography variant="caption" color="textSecondary">
            {hint}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

function ServiceOverviewSection({ overview }) {
  const { label, icon, badgeColor, facilities: facs, stats } = overview
  return (
    <Box>
      <Box className="flex items-center justify-between" sx={{ mb: 1.5 }}>
        <Box className="flex items-center gap-2">
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: badgeColor,
              color: '#fff',
              borderRadius: '16px',
              px: 1.5,
              py: 0.75,
              '& svg': { fontSize: 18 },
            }}
          >
            {SERVICE_ICONS[icon]}
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'inherit', lineHeight: 1 }}>
              {label}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            {facs.join(' + ')} · 今日合計
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          endIcon={<ChevronRightIcon />}
          sx={{ color: '#546E7A' }}
        >
          看更多
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {stats.map((stat) => (
          <Box key={stat.title} sx={{ flex: 1, minWidth: 0 }}>
            <SectionStatCard {...stat} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function Dashboard() {
  return (
    <Box className="flex flex-col gap-4">
      <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <PageHeader />
      </Paper>

      <KpiRow />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FacilitySummaryCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ServiceShareCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OccupancyTrendCard />
        </Grid>
      </Grid>

      {serviceOverviews.map((overview) => (
        <Paper key={overview.key} sx={{ borderRadius: '8px', p: 2 }}>
          <ServiceOverviewSection overview={overview} />
        </Paper>
      ))}
    </Box>
  )
}

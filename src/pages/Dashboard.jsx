import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import BadgeIcon from '@mui/icons-material/Badge'
import HotelIcon from '@mui/icons-material/Hotel'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import IosShareIcon from '@mui/icons-material/IosShare'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import HomeIcon from '@mui/icons-material/Home'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import StatCard from '@/components/StatCard'
import ServiceShareChart from '@/components/charts/ServiceShareChart'
import {
  reportDate,
  kpis,
  serviceShare,
  headcount,
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
  vacancyRate: <HotelIcon />,
  attendanceRate: <EventAvailableIcon />,
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
        height: 64,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
          集團總覽
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {reportDate}
        </Typography>
      </Box>
      <Box className="flex items-center gap-1">
        <IconButton size="small" sx={{ color: '#546E7A' }} aria-label="share">
          <IosShareIcon fontSize="small" />
        </IconButton>
        <Button variant="contained" size="medium">
          匯出報表
        </Button>
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

function HeadcountCard() {
  const metrics = [
    {
      label: '本月新入職',
      value: headcount.newHired,
      unit: '人',
      delta: headcount.newHiredDelta,
      downIsGood: false,
    },
    {
      label: '本月離職',
      value: headcount.resigned,
      unit: '人',
      delta: headcount.resignedDelta,
      downIsGood: true,
    },
    {
      label: '離職率',
      value: headcount.resignRate,
      delta: headcount.resignRateDelta,
      downIsGood: true,
    },
    {
      label: '全集團人力比',
      value: headcount.staffRatio,
      note: '員工 ÷ 服務個案',
      delta: null,
    },
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <SectionHeader title="全集團人力概況" />

        <Box className="grid grid-cols-2 gap-3" sx={{ mb: 2 }}>
          {metrics.map((m) => {
            const DeltaIcon = m.delta?.dir === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon

            return (
              <Box
                key={m.label}
                sx={{
                  bgcolor: 'rgba(120,144,156,0.08)',
                  borderRadius: '8px',
                  pl: '15px',
                  pr: '12px',
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography variant="body2">
                  {m.label}
                </Typography>
                <Box className="flex items-baseline gap-1">
                  <Typography
                    sx={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: 'text.primary' }}
                  >
                    {m.value}
                  </Typography>
                  {m.unit && (
                    <Typography variant="caption" color="textSecondary">
                      {m.unit}
                    </Typography>
                  )}
                </Box>
                {m.delta ? (
                  <Box className="flex items-center gap-0.5">
                    <DeltaIcon sx={{ fontSize: 12, color: '#0097A7' }} />
                    <Typography variant="caption" sx={{ color: '#0097A7', fontWeight: 500 }}>
                      較上月 {m.delta.text}
                    </Typography>
                  </Box>
                ) : m.note ? (
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(0,0,0,0.38)', display: 'block' }}
                  >
                    {m.note}
                  </Typography>
                ) : null}
              </Box>
            )
          })}
        </Box>

        <Alert severity="warning" sx={{ mt: 2, py: 0.75, fontSize: '0.8125rem' }}>
          <strong>新北板橋居服所照服員短缺</strong>
          <br />
          人力比 1:22 已超出法規標準，建議緊急調度支援。
        </Alert>
      </CardContent>
    </Card>
  )
}

const FACILITY_GROUPS = [
  { label: '住宿長照', type: '住宿長照', color: '#0097A7' },
  { label: '居家服務', type: '居家服務', color: '#26A69A' },
  { label: '日間照顧', type: '日間照顧', color: '#005F64' },
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
                  <Typography variant="body1" color="textSecondary">
                    核定 {f.capacity} 人
                  </Typography>
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

  const deltaColor = delta?.isWarning ? 'warning.main' : delta?.dir === 'flat' ? 'text.secondary' : 'primary.main'

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
      <Typography variant="body2">
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
        <Box className="flex items-center gap-1">
          <Button variant="text" size="small" sx={{ color: '#546E7A' }}>
            看更多
          </Button>
          <IconButton size="small" sx={{ color: '#546E7A' }} aria-label="share">
            <IosShareIcon fontSize="small" />
          </IconButton>
        </Box>
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
          <HeadcountCard />
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

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import BadgeIcon from '@mui/icons-material/Badge'
import HotelIcon from '@mui/icons-material/Hotel'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import IosShareIcon from '@mui/icons-material/IosShare'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StatCard from '@/components/StatCard'
import OccupancyChart from '@/components/charts/OccupancyChart'
import ServiceShareChart from '@/components/charts/ServiceShareChart'
import {
  reportDate,
  kpis,
  serviceShare,
  headcount,
  trend6m,
  facilities,
  statusMeta,
} from '@/features/dashboard/mockData'

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
        <Typography variant="caption" color="text.secondary">
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
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Box className="flex items-baseline gap-2">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.value} 人
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
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
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <SectionHeader title="全集團人力概況" />

        <Box className="grid grid-cols-3 gap-2" sx={{ mb: 2 }}>
          {[
            { label: '本月新入職', value: headcount.newHired, tone: '#2E7D32' },
            { label: '本月離職', value: headcount.resigned, tone: '#D32F2F' },
            { label: '離職率', value: headcount.resignRate, tone: '#546E7A' },
          ].map((m) => (
            <Box
              key={m.label}
              sx={{
                bgcolor: '#ECEFF1',
                borderRadius: '8px',
                p: 1.5,
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{ fontSize: 22, fontWeight: 500, color: m.tone, lineHeight: 1.2 }}
              >
                {m.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {m.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box className="mb-1 flex items-center justify-between">
            <Typography variant="body2" color="text.secondary">
              專業執照持有率
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {headcount.licensed} 人 · {headcount.licensedRate}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={headcount.licensedRate}
            sx={{
              height: 16,
              borderRadius: 4,
              bgcolor: 'rgba(120,144,156,0.08)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#0097A7',
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          職類組成
        </Typography>
        <Box>
          {headcount.composition.map((row) => (
            <Box
              key={row.role}
              className="flex items-center justify-between"
              sx={{ py: 0.5 }}
            >
              <Typography variant="body2">{row.role}</Typography>
              <Box className="flex items-baseline gap-2">
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {row.count}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 44, textAlign: 'right' }}>
                  {row.ratio}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function TrendCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <SectionHeader
          title="近 6 個月空床率與出席率"
          action={
            <Typography variant="caption" color="text.secondary">
              單位：%
            </Typography>
          }
        />
        <OccupancyChart data={trend6m} />
      </CardContent>
    </Card>
  )
}

function FacilityTable() {
  return (
    <Card>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box
          className="flex items-center justify-between"
          sx={{ px: 2, py: 1.5 }}
        >
          <Typography variant="h6">旗下機構總覽</Typography>
          <Button size="small" sx={{ color: '#0097A7' }}>
            查看全部
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>機構名稱</TableCell>
                <TableCell>類型</TableCell>
                <TableCell align="right">在院 / 出席</TableCell>
                <TableCell align="right">核定人數</TableCell>
                <TableCell sx={{ width: 200 }}>使用率</TableCell>
                <TableCell>狀態</TableCell>
                <TableCell align="right" sx={{ width: 56 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {facilities.map((f) => {
                const meta = statusMeta[f.status]
                const chipColor =
                  meta.color === 'success'
                    ? { bg: 'rgba(46,125,50,0.12)', text: '#2E7D32' }
                    : meta.color === 'warning'
                      ? { bg: 'rgba(245,124,0,0.12)', text: '#E65100' }
                      : { bg: 'rgba(211,47,47,0.12)', text: '#D32F2F' }
                return (
                  <TableRow key={f.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {f.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {f.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {f.type}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {f.inService}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary">
                        {f.capacity}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center gap-2">
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={f.utilization}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(120,144,156,0.12)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: f.utilization >= 85 ? '#0097A7' : '#80CBC4',
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ minWidth: 44, textAlign: 'right', color: '#37474F' }}
                        >
                          {f.utilization.toFixed(1)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={meta.label}
                        sx={{
                          bgcolor: chipColor.bg,
                          color: chipColor.text,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: '#546E7A' }}>
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
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
          <ServiceShareCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <HeadcountCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TrendCard />
        </Grid>
      </Grid>

      <FacilityTable />
    </Box>
  )
}

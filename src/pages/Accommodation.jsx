import { useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import PeopleIcon from '@mui/icons-material/People'
import BadgeIcon from '@mui/icons-material/Badge'
import BedIcon from '@mui/icons-material/Bed'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import TrendLineChart from '@/components/charts/TrendLineChart'
import RevenueComposedChart from '@/components/charts/RevenueComposedChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import ServiceShareChart from '@/components/charts/ServiceShareChart'
import MovementWaterfallChart from '@/components/charts/MovementWaterfallChart'

import {
  reportDate,
  overviewKpis,
  occupancyTrend,
  revenueByBranch,
  branchServiceShare,
  branchRevenueShare,
  branchRanking,
  BRANCHES,
  branchData,
} from '@/features/accommodation/mockData'

// ── Constants ─────────────────────────────────────────────
const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'
const WARNING = '#ED6C02'

const KPI_ICONS_OVERVIEW = {
  serviceTotal: <PeopleIcon />,
  staffTotal: <BadgeIcon />,
  occupancy: <BedIcon />,
  revenue: <AttachMoneyIcon />,
}

// ── Shared atoms ──────────────────────────────────────────

function DeltaRow({ delta }) {
  if (!delta) return null
  const color = delta.isWarning ? WARNING : delta.dir === 'flat' ? 'rgba(0,0,0,0.6)' : green[600]
  const Icon =
    delta.dir === 'up' ? ArrowUpwardIcon
    : delta.dir === 'down' ? ArrowDownwardIcon
    : TrendingFlatIcon
  return (
    <Box className="flex items-center gap-0.5" sx={{ mt: 0.5 }}>
      <Icon sx={{ fontSize: 12, color }} />
      <Typography variant="caption" sx={{ color, fontWeight: 500 }}>
        {delta.text}
      </Typography>
    </Box>
  )
}

function KpiCard({ title, value, unit, delta, icon, warningBg }) {
  return (
    <Card
      sx={{
        height: '100%',
        ...(warningBg && { border: `1px solid rgba(237,108,2,0.3)` }),
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box className="flex items-start justify-between">
          <Typography variant="body1">{title}</Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: warningBg ? 'rgba(237,108,2,0.12)' : '#C5F0F7',
              color: warningBg ? WARNING : PRIMARY_DARK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '& svg': { fontSize: 20 },
            }}
          >
            {icon}
          </Box>
        </Box>
        <Box className="mt-3 flex items-baseline gap-1">
          <Typography sx={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, color: 'text.primary', letterSpacing: 0 }}>
            {value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="textSecondary" sx={{ pb: '2px' }}>
              {unit}
            </Typography>
          )}
        </Box>
        <DeltaRow delta={delta} />
      </CardContent>
    </Card>
  )
}

function SectionCard({ title, subtitle, headerRight, children, fullHeight = true }) {
  return (
    <Card sx={{ height: fullHeight ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ p: 2, '&:last-child': { pb: 2 }, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box className="flex items-start justify-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h6">{title}</Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerRight}
        </Box>
        <Box sx={{ flex: 1 }}>{children}</Box>
      </CardContent>
    </Card>
  )
}

// ── BranchTab building blocks ─────────────────────────────

function CategoryPaper({ title, children }) {
  return (
    <Paper sx={{ borderRadius: '8px', p: 2, boxShadow: 'none' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}

function OutlinedBlock({ title, subtitle, headerRight, children, fullHeight = true }) {
  return (
    <Box
      sx={{
        height: fullHeight ? '100%' : 'auto',
        bgcolor: 'rgba(84,110,122,0.06)',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box className="flex items-start justify-between" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {headerRight}
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  )
}

function KpiTile({ title, value, unit, delta, warningBg }) {
  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: warningBg ? 'rgba(237,108,2,0.06)' : 'rgba(84,110,122,0.06)',
        borderRadius: '8px',
        p: 2,
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Box className="mt-3 flex items-baseline gap-1">
        <Typography sx={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, color: 'text.primary', letterSpacing: 0 }}>
          {value}
        </Typography>
        {unit && (
          <Typography variant="body2" color="textSecondary" sx={{ pb: '2px' }}>
            {unit}
          </Typography>
        )}
      </Box>
      <DeltaRow delta={delta} />
    </Box>
  )
}

// ── Share Card Content (pie + legend) ─────────────────────

function ShareCardContent({ data, totalLabel, unit, valueFormatter }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const fmt = valueFormatter ?? ((v) => v.toLocaleString())
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <Box sx={{ width: 220, flexShrink: 0 }}>
        <ServiceShareChart
          data={data}
          totalLabel={totalLabel}
          unit={unit}
          totalFormatter={fmt}
          height={220}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1)
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
                  {fmt(item.value)} {unit}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {pct}%
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ── Staff Cost Bar Chart ──────────────────────────────────

function StaffCostBarChart({ months, data, height = 280 }) {
  const chartData = months.map((month, i) => ({ month, value: data[i] }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}萬`}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', boxShadow: 'none', fontSize: 12 }}
          formatter={(v) => [`${v} 萬`, '人事成本']}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={26} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── CMS Level Bar Chart ───────────────────────────────────

function CmsBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="level"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
          tickFormatter={(v) => `CMS ${v}`}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', boxShadow: 'none', fontSize: 12 }}
          formatter={(v, name) => [`${v} 人`, `CMS ${name}`]}
          labelFormatter={(l) => `CMS ${l}`}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={28} radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="value"
            position="top"
            style={{ fontSize: 11, fill: 'rgba(0,0,0,0.6)' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Quality Alert Card ────────────────────────────────────

function QualityAlertCard({ alerts }) {
  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'rgba(84,110,122,0.06)',
        borderRadius: '8px',
        p: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>品監異常項目</Typography>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.25, mb: 2 }}>
        當月（2026/05）
      </Typography>
      {alerts.length === 0 ? (
        <Typography variant="body2" color="textSecondary">本月無異常項目</Typography>
      ) : (
        <Box className="flex flex-col gap-2">
          {alerts.map((item, i) => (
            <Box key={i} className="flex items-center justify-between gap-2" sx={{ py: 0.75, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Typography variant="body2" sx={{ flex: 1 }}>{item.name}</Typography>
              <Box className="flex items-center gap-2">
                <Typography variant="body2" color="textSecondary">
                  閾值 {item.threshold}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: WARNING }}>
                  {item.current}
                </Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: '16px',
                    bgcolor: 'rgba(237,108,2,0.12)',
                    color: WARNING,
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  異常
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

// ── YoY Badge ─────────────────────────────────────────────

function YoyBadge({ value }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'rgba(46,125,50,0.12)',
        color: green[700],
        px: 1,
        py: 0.25,
        borderRadius: '16px',
        flexShrink: 0,
      }}
    >
      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
      <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
        YoY +{value}%
      </Typography>
    </Box>
  )
}

// ── Branch Ranking Table ──────────────────────────────────

const STATUS_CFG = {
  good:    { label: '良好',   Icon: CheckCircleIcon,  bg: 'rgba(46,125,50,0.12)', color: '#2E7D32', priority: 0 },
  warning: { label: '需注意', Icon: WarningAmberIcon, bg: 'rgba(237,108,2,0.12)', color: WARNING,   priority: 1 },
}

const rankingHeadCellSx = {
  bgcolor: '#ECEFF1',
  color: '#546E7A',
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '0.17px',
  py: 1,
  px: 2,
  borderBottom: 'none',
  whiteSpace: 'nowrap',
}

const rankingBodyCellSx = {
  py: 1.25,
  px: 2,
  fontSize: 14,
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  verticalAlign: 'middle',
}

const rankingSortLabelSx = {
  color: 'inherit !important',
  '& .MuiTableSortLabel-icon': { color: 'inherit !important', opacity: 0.5 },
  '&.Mui-active .MuiTableSortLabel-icon': { opacity: 1 },
}

function RankingDelta({ value }) {
  if (value == null) {
    return <Typography variant="body2" color="textSecondary">—</Typography>
  }
  const isUp = value >= 0
  const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon
  const color = isUp ? green[500] : WARNING
  return (
    <Box className="flex items-center gap-0.5">
      <Icon sx={{ fontSize: 14, color }} />
      <Typography variant="body2" sx={{ color, fontWeight: 500 }}>
        {isUp ? `+${value}` : value}%
      </Typography>
    </Box>
  )
}

const RANKING_COLUMNS = [
  { key: 'rank',           label: '排名',           align: 'center', width: 72  },
  { key: 'name',           label: '機構名稱',       align: 'left'                },
  { key: 'status',         label: '營運狀態',       align: 'center', width: 110 },
  { key: 'ytdRevenue',     label: '本年營收 (YTD)', align: 'right'               },
  { key: 'monthRevenue',   label: '本月營收',       align: 'right'               },
  { key: 'vacancyRate',    label: '空床率',         align: 'right',  width: 96  },
  { key: 'staffCost',      label: '人事成本',       align: 'right'               },
  { key: 'collectionRate', label: '收款率',         align: 'right',  width: 96  },
  { key: 'alert',          label: '關鍵警示',       align: 'left',   sortable: false },
]

function BranchRankingTable({ data }) {
  const [sortBy, setSortBy] = useState('rank')
  const [order, setOrder] = useState('asc')

  const handleSort = (key) => {
    if (sortBy === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setOrder('asc')
    }
  }

  const sorted = useMemo(() => {
    const getVal = (row) => sortBy === 'status' ? STATUS_CFG[row.status].priority : row[sortBy]
    return [...data].sort((a, b) => {
      const v1 = getVal(a)
      const v2 = getVal(b)
      const cmp = typeof v1 === 'number' ? v1 - v2 : String(v1).localeCompare(String(v2), 'zh-Hant')
      return order === 'asc' ? cmp : -cmp
    })
  }, [data, sortBy, order])

  return (
    <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h6">住宿機構排行</Typography>
        <Typography variant="caption" color="textSecondary">
          3 家比較・當月（2026/05）
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small" sx={{ '& th, & td': { whiteSpace: 'nowrap' } }}>
          <TableHead>
            <TableRow>
              {RANKING_COLUMNS.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align}
                  sx={{ ...rankingHeadCellSx, width: col.width }}
                >
                  {col.sortable === false ? (
                    col.label
                  ) : (
                    <TableSortLabel
                      active={sortBy === col.key}
                      direction={sortBy === col.key ? order : 'asc'}
                      onClick={() => handleSort(col.key)}
                      sx={rankingSortLabelSx}
                    >
                      {col.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row) => {
              const st = STATUS_CFG[row.status]
              return (
                <TableRow key={row.name} hover>
                  <TableCell sx={rankingBodyCellSx} align="center">
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: PRIMARY,
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: 13,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {row.rank}
                    </Box>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="center">
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1,
                        py: 0.25,
                        borderRadius: '16px',
                        bgcolor: st.bg,
                        color: st.color,
                        fontSize: 12,
                        lineHeight: '18px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <st.Icon sx={{ fontSize: 14 }} />
                      {st.label}
                    </Box>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${row.ytdRevenue.toLocaleString()} 萬
                    </Typography>
                    <Box sx={{ display: 'inline-flex', justifyContent: 'flex-end', mt: 0.25 }}>
                      <RankingDelta value={row.ytdYoy} />
                    </Box>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${row.monthRevenue.toLocaleString()} 萬
                    </Typography>
                    <Box sx={{ display: 'inline-flex', justifyContent: 'flex-end', mt: 0.25 }}>
                      <RankingDelta value={row.monthYoy} />
                    </Box>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {row.vacancyRate}%
                    </Typography>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${row.staffCost} 萬/月
                    </Typography>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx} align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {row.collectionRate}%
                    </Typography>
                  </TableCell>
                  <TableCell sx={rankingBodyCellSx}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: row.alertTone === 'warning' ? WARNING : 'text.primary',
                        fontWeight: 500,
                      }}
                    >
                      {row.alert}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

// ── Tab 0: 總覽 ───────────────────────────────────────────

function OverviewTab() {
  return (
    <Box className="flex flex-col gap-4">
      {/* KPI */}
      <Grid container spacing={2}>
        {overviewKpis.map((kpi) => (
          <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              delta={kpi.delta}
              icon={KPI_ICONS_OVERVIEW[kpi.key]}
            />
          </Grid>
        ))}
      </Grid>

      {/* 趨勢圖區 */}
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: '100%' }}>
            <SectionCard title="營收佔比" subtitle="當月（2026/05，單位：萬元）">
              <ShareCardContent
                data={branchRevenueShare}
                totalLabel="月營收"
                unit="萬"
              />
            </SectionCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: '100%' }}>
            <SectionCard
              title="月營收趨勢"
              subtitle="近 13 個月（單位：萬元）"
              headerRight={<YoyBadge value={revenueByBranch.yoyCurrent} />}
            >
              <RevenueComposedChart
                months={revenueByBranch.months}
                series={revenueByBranch.series}
                yoy={revenueByBranch.yoy}
                height={280}
              />
            </SectionCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: '100%' }}>
            <SectionCard title="服務人數佔比" subtitle="當月（2026/05）">
              <ShareCardContent
                data={branchServiceShare}
                totalLabel="服務人數"
                unit="人"
              />
            </SectionCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: '100%' }}>
            <SectionCard title="佔床率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
              <TrendLineChart
                months={occupancyTrend.months}
                series={occupancyTrend.series}
                yAxisSuffix="%"
                height={280}
              />
            </SectionCard>
          </Box>
        </Grid>
      </Grid>

      {/* 機構排行表 */}
      <BranchRankingTable data={branchRanking} />
    </Box>
  )
}

// ── Tab 1–3: 各機構 ───────────────────────────────────────

function BranchTab({ branchName }) {
  const data = branchData[branchName]

  const branchOccupancySeries = useMemo(() => {
    const match = occupancyTrend.series.find((s) => s.name === branchName)
    return match ? [{ name: '占床率', color: PRIMARY, data: match.data }] : []
  }, [branchName])

  return (
    <Box className="flex flex-col gap-4">

      {/* 財務狀況 */}
      <CategoryPaper title="財務狀況">
        <Box className="flex flex-col gap-4">
          {/* 本月財務快照 KPI × 5 — 獨立一橫排 */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.financeKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, sm: 4, md: 'grow' }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                  warningBg={kpi.delta?.isWarning}
                />
              </Grid>
            ))}
          </Grid>

          {/* 營收趨勢 + 人事成本趨勢 — 左右排 */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock
                title="營收趨勢"
                subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）"
                headerRight={<YoyBadge value={data.revenueTrend.yoyCurrent} />}
              >
                <RevenueComposedChart
                  months={data.revenueTrend.months}
                  series={[{ name: '營收', color: PRIMARY, data: data.revenueTrend.data }]}
                  yoy={data.revenueTrend.yoy}
                  height={280}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="人事成本趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）">
                <StaffCostBarChart
                  months={data.staffCostTrend.months}
                  data={data.staffCostTrend.data}
                  height={280}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </Box>
      </CategoryPaper>

      {/* 營運指標 */}
      <CategoryPaper title="營運指標">
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {data.operationKpis.map((kpi) => (
            <Grid key={kpi.key} size={{ xs: 6, sm: 6, md: 3 }}>
              <KpiTile
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                delta={kpi.delta}
              />
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="占床率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
              <TrendLineChart
                months={occupancyTrend.months}
                series={branchOccupancySeries}
                yAxisSuffix="%"
                height={260}
              />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="住民異動分析" subtitle="近 13 個月（25/05 ～ 26/05）">
              <MovementWaterfallChart
                months={data.residentMovement.months}
                series={data.residentMovement.series}
                baseline={data.residentMovement.baselineResidents}
                height={260}
              />
            </OutlinedBlock>
          </Grid>
        </Grid>
      </CategoryPaper>

      {/* 住民分析 */}
      <CategoryPaper title="住民分析">
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="服務類型分佈" subtitle="當月（2026/05）">
              <HorizontalBarChart data={data.serviceTypes} height={260} />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="居住年期分佈" subtitle="當月（2026/05）">
              <HorizontalBarChart data={data.residencyYears} color={PRIMARY} height={260} />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="身障比例" subtitle="當月（2026/05）">
              <ShareCardContent
                data={data.disabilityRatio}
                totalLabel="住民總數"
                unit="人"
              />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="CMS 等級分佈" subtitle="當月（2026/05）">
              <CmsBarChart data={data.cmsLevels} />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <OutlinedBlock title="退住原因" subtitle="當月（2026/05）">
              <HorizontalBarChart data={data.dischargeReasons} color={PRIMARY} height={260} />
            </OutlinedBlock>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <QualityAlertCard alerts={data.qualityAlerts} />
          </Grid>
        </Grid>
      </CategoryPaper>

    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function Accommodation() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <Box className="flex flex-col gap-4">
      {/* Page header */}
      <Paper sx={{ borderRadius: '8px' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography variant="h6">住宿機構</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            {reportDate}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{
            px: 1,
            '& .MuiTab-root': { fontSize: 14, minHeight: 44, textTransform: 'none', color: 'text.secondary' },
            '& .Mui-selected': { color: `${PRIMARY} !important`, fontWeight: 500 },
            '& .MuiTabs-indicator': { backgroundColor: PRIMARY },
          }}
        >
          <Tab label="總覽" />
          {BRANCHES.map((name) => (
            <Tab key={name} label={name} />
          ))}
        </Tabs>
      </Paper>

      {/* Tab content */}
      {tabIndex === 0 && <OverviewTab />}
      {tabIndex > 0 && (
        <BranchTab
          key={BRANCHES[tabIndex - 1]}
          branchName={BRANCHES[tabIndex - 1]}
        />
      )}
    </Box>
  )
}

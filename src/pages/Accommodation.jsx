import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
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
import AssessmentIcon from '@mui/icons-material/Assessment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InventoryIcon from '@mui/icons-material/Inventory'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
import ShareableBlock from '@/components/ShareableBlock'
import PageHeader from '@/components/PageHeader'
import {
  CategoryPaper,
  OutlinedBlock,
  KpiTile,
  YoyBadge,
  ShareCardContent,
} from '@/components/SectionBlocks'

import {
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
  const color = delta.isWarning
    ? WARNING
    : delta.dir === 'flat'
      ? 'rgba(0,0,0,0.6)'
      : green[600]
  const Icon =
    delta.dir === 'up'
      ? ArrowUpwardIcon
      : delta.dir === 'down'
        ? ArrowDownwardIcon
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
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'text.primary',
              letterSpacing: 0,
            }}
          >
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
    <Card
      sx={{
        height: fullHeight ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className="flex items-start justify-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h6">{title}</Typography>
            {subtitle && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: 'block', mt: 0.25 }}
              >
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

// ── Staff Cost Bar Chart ──────────────────────────────────

function StaffCostBarChart({ months, data, height = 280, label = '人事成本' }) {
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
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          formatter={(v) => [`${v} 萬`, label]}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={26} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Quality Monitoring Table ──────────────────────────────

const qualityHeadCellSx = {
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

const qualityBodyCellSx = {
  py: 1.25,
  px: 2,
  fontSize: 14,
  borderBottom: '1px solid rgba(0,0,0,0.08)',
}

function QualityMonitoringTable({ data }) {
  return (
    <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={qualityHeadCellSx}>項目</TableCell>
            <TableCell sx={qualityHeadCellSx} align="right">
              個案數
            </TableCell>
            <TableCell sx={qualityHeadCellSx} align="right">
              發生率
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell sx={qualityBodyCellSx}>
                <Typography variant="body2">{row.name}</Typography>
              </TableCell>
              <TableCell sx={qualityBodyCellSx} align="right">
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {row.cases}
                </Typography>
              </TableCell>
              <TableCell sx={qualityBodyCellSx} align="right">
                <Typography variant="body2" sx={{ fontWeight: 500, color: PRIMARY_DARK }}>
                  {row.rate.toFixed(1)}%
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// ── Incidents Pie ─────────────────────────────────────────

function IncidentsPie({ incidents }) {
  const data = [
    { name: '已結案', value: incidents.closed, color: PRIMARY },
    { name: '未結案', value: incidents.open, color: '#FF9800' },
  ]
  const total = incidents.total
  const closedPct = ((incidents.closed / total) * 100).toFixed(1)
  const openPct = ((incidents.open / total) * 100).toFixed(1)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <Box sx={{ width: 220, flexShrink: 0 }}>
        <ServiceShareChart data={data} totalLabel="意外事件總數" unit="件" height={220} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        {[
          { name: '已結案', value: incidents.closed, pct: closedPct, color: PRIMARY },
          { name: '未結案', value: incidents.open, pct: openPct, color: '#FF9800' },
        ].map((item) => (
          <Box
            key={item.name}
            className="flex items-center justify-between"
            sx={{ py: 0.75 }}
          >
            <Box className="flex items-center gap-2">
              <Box
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }}
              />
              <Typography variant="body1">{item.name}</Typography>
            </Box>
            <Box className="flex items-baseline gap-4">
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.value} 件
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {item.pct}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ── Branch Ranking Table ──────────────────────────────────

const STATUS_CFG = {
  good: {
    label: '良好',
    Icon: CheckCircleIcon,
    bg: 'rgba(46,125,50,0.12)',
    color: '#2E7D32',
    priority: 0,
  },
  warning: {
    label: '需注意',
    Icon: WarningAmberIcon,
    bg: 'rgba(237,108,2,0.12)',
    color: WARNING,
    priority: 1,
  },
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
    return (
      <Typography variant="body2" color="textSecondary">
        —
      </Typography>
    )
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
  { key: 'rank', label: '排名', align: 'center', width: 72 },
  { key: 'name', label: '機構名稱', align: 'left' },
  { key: 'status', label: '營運狀態', align: 'center', width: 110 },
  { key: 'ytdRevenue', label: '本年營收 (YTD)', align: 'right' },
  { key: 'monthRevenue', label: '本月營收', align: 'right' },
  { key: 'vacancyRate', label: '空床率', align: 'right', width: 96 },
  { key: 'staffCost', label: '人事成本', align: 'right' },
  { key: 'collectionRate', label: '收款率', align: 'right', width: 96 },
  { key: 'alert', label: '關鍵警示', align: 'left', sortable: false },
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
    const getVal = (row) =>
      sortBy === 'status' ? STATUS_CFG[row.status].priority : row[sortBy]
    return [...data].sort((a, b) => {
      const v1 = getVal(a)
      const v2 = getVal(b)
      const cmp =
        typeof v1 === 'number' ? v1 - v2 : String(v1).localeCompare(String(v2), 'zh-Hant')
      return order === 'asc' ? cmp : -cmp
    })
  }, [data, sortBy, order])

  return (
    <ShareableBlock title="住宿機構排行">
      <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1, pr: 6 }}>
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
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, lineHeight: 1.3 }}
                      >
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
                      <Box
                        sx={{
                          display: 'inline-flex',
                          justifyContent: 'flex-end',
                          mt: 0.25,
                        }}
                      >
                        <RankingDelta value={row.ytdYoy} />
                      </Box>
                    </TableCell>
                    <TableCell sx={rankingBodyCellSx} align="right">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ${row.monthRevenue.toLocaleString()} 萬
                      </Typography>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          justifyContent: 'flex-end',
                          mt: 0.25,
                        }}
                      >
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
    </ShareableBlock>
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
          <ShareableBlock title="營收佔比">
            <Box sx={{ height: '100%' }}>
              <SectionCard title="營收佔比" subtitle="當月（2026/05，單位：萬元）">
                <ShareCardContent
                  data={branchRevenueShare}
                  totalLabel="月營收"
                  unit="萬"
                />
              </SectionCard>
            </Box>
          </ShareableBlock>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShareableBlock title="月營收趨勢">
            <Box sx={{ height: '100%' }}>
              <SectionCard
                title="月營收趨勢"
                subtitle="近 13 個月（單位：萬元）"
                headerRight={
                  <YoyBadge value={revenueByBranch.yoyCurrent} sx={{ mr: 5 }} />
                }
              >
                <RevenueComposedChart
                  months={revenueByBranch.months}
                  series={revenueByBranch.series}
                  yoy={revenueByBranch.yoy}
                  height={280}
                />
              </SectionCard>
            </Box>
          </ShareableBlock>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShareableBlock title="服務人數佔比">
            <Box sx={{ height: '100%' }}>
              <SectionCard title="服務人數佔比" subtitle="當月（2026/05）">
                <ShareCardContent
                  data={branchServiceShare}
                  totalLabel="服務人數"
                  unit="人"
                />
              </SectionCard>
            </Box>
          </ShareableBlock>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShareableBlock title="佔床率趨勢">
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
          </ShareableBlock>
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
      <ShareableBlock title={`${branchName} - 財務狀況`}>
        <CategoryPaper
          icon={<AttachMoneyIcon />}
          title="財務狀況"
          subtitle="本月財務快照與近 13 個月趨勢"
        >
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
                    series={[
                      { name: '營收', color: PRIMARY, data: data.revenueTrend.data },
                    ]}
                    yoy={data.revenueTrend.yoy}
                    height={280}
                  />
                </OutlinedBlock>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <OutlinedBlock
                  title="人事成本趨勢"
                  subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）"
                >
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
      </ShareableBlock>

      {/* 營運指標 */}
      <ShareableBlock title={`${branchName} - 營運指標`}>
        <CategoryPaper
          icon={<AssessmentIcon />}
          title="營運指標"
          subtitle="佔床率・住民異動"
        >
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
      </ShareableBlock>

      {/* 照護品質 */}
      <ShareableBlock title={`${branchName} - 照護品質`}>
        <CategoryPaper
          icon={<FavoriteIcon />}
          title="照護品質"
          subtitle="品質監測與意外事件管理"
        >
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="品質監測" subtitle="當月（2026/05）">
                <QualityMonitoringTable data={data.qualityMonitoring} />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="意外事件" subtitle="當月（2026/05）">
                <IncidentsPie incidents={data.incidents} />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </CategoryPaper>
      </ShareableBlock>

      {/* 住民分析 */}
      <ShareableBlock title={`${branchName} - 住民分析`}>
        <CategoryPaper
          icon={<PeopleIcon />}
          title="住民分析"
          subtitle="服務類型・居住年期・退住分析"
        >
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="服務類型分佈" subtitle="當月（2026/05）">
                <HorizontalBarChart data={data.serviceTypes} height={260} />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="居住年期分佈" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={data.residencyYears}
                  color={PRIMARY}
                  height={260}
                />
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
              <OutlinedBlock title="退住原因" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={data.dischargeReasons}
                  color={PRIMARY}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </CategoryPaper>
      </ShareableBlock>

      {/* 倉儲管理 */}
      <ShareableBlock title={`${branchName} - 倉儲管理`}>
        <CategoryPaper
          icon={<InventoryIcon />}
          title="倉儲管理"
          subtitle="庫存總覽與成本趨勢"
        >
          <Box className="flex flex-col gap-4">
            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <KpiTile
                  title="庫存總金額"
                  value={data.warehouse.totalValue.value}
                  unit={data.warehouse.totalValue.unit}
                  delta={data.warehouse.totalValue.delta}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <KpiTile
                  title="總成本"
                  value={data.warehouse.totalCost.value}
                  unit={data.warehouse.totalCost.unit}
                  delta={data.warehouse.totalCost.delta}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <KpiTile
                  title="品項總數"
                  value={data.warehouse.itemCount.value}
                  unit={data.warehouse.itemCount.unit}
                  delta={data.warehouse.itemCount.delta}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <KpiTile
                  title="低庫存警報"
                  value={data.warehouse.lowStockAlert.value}
                  unit={data.warehouse.lowStockAlert.unit}
                  delta={data.warehouse.lowStockAlert.delta}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <OutlinedBlock
                  title="庫存金額分類佔比"
                  subtitle="當月（2026/05，單位：萬元）"
                >
                  <ShareCardContent
                    data={data.warehouse.categoryBreakdown}
                    totalLabel="庫存總金額"
                    unit="萬"
                  />
                </OutlinedBlock>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <OutlinedBlock
                  title="月度倉儲成本趨勢"
                  subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）"
                >
                  <StaffCostBarChart
                    months={data.warehouse.costTrend.months}
                    data={data.warehouse.costTrend.data}
                    height={280}
                    label="倉儲成本"
                  />
                </OutlinedBlock>
              </Grid>
            </Grid>
          </Box>
        </CategoryPaper>
      </ShareableBlock>
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function Accommodation() {
  const { branch } = useParams()

  return (
    <Box className="flex flex-col gap-4">
      <PageHeader title={branch ?? '住宿機構'} />

      {/* Content */}
      {!branch && <OverviewTab />}
      {branch && BRANCHES.includes(branch) && (
        <BranchTab key={branch} branchName={branch} />
      )}
    </Box>
  )
}

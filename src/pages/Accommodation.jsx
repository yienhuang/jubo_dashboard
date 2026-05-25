import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PeopleIcon from '@mui/icons-material/People'
import BadgeIcon from '@mui/icons-material/Badge'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
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
import HighlightsCard from '@/components/HighlightsCard'
import RankingCard from '@/components/RankingCard'
import CollectionRateBar from '@/components/CollectionRateBar'
import {
  CategoryPaper,
  OutlinedBlock,
  KpiTile,
  ShareCardContent,
} from '@/components/SectionBlocks'

import {
  // BranchTab uses these
  occupancyTrend,
  BRANCHES,
  BRANCH_INFO,
  branchData,
  // OverviewTab uses these
  overviewHighlights,
  monthRevenueRanking,
  occupancyRanking,
  overviewFinanceKpis,
  overviewCollectionDonut,
  aggregateRevenueTrend,
  financeComparison,
  overviewOperationKpis,
  overviewResidentMovement,
  operationComparison,
  overviewResidentKpis,
  overviewServiceTypes,
  overviewDischargeReasons,
  residentComparison,
  overviewQualityKpis,
  overviewQualityMonitoring,
  overviewIncidentTypes,
  qualityComparison,
  overviewHrKpis,
  overviewPositionStats,
  hrComparison,
} from '@/features/accommodation/mockData'

// ── Constants ─────────────────────────────────────────────
const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'
const WARNING = '#ED6C02'

const BRANCH_FULL_NAME = Object.fromEntries(BRANCH_INFO.map((b) => [b.short, b.full]))

// ── Staff Cost / 倉儲 Bar Chart ───────────────────────────

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
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(v) => [`${v} 萬`, label]}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={26} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// 在職人員職位統計 (vertical bar chart)
function PositionStatsBarChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v} 人`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(v) => [`${v} 人`, '人數']}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={36} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Section Comparison Table ──────────────────────────────

const headCellSx = {
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

const bodyCellSx = {
  py: 1.25,
  px: 2,
  fontSize: 14,
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  verticalAlign: 'middle',
}

function DeltaText({ value }) {
  if (value == null) {
    return (
      <Typography variant="body1" color="textSecondary">
        —
      </Typography>
    )
  }
  const isUp = value >= 0
  const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon
  const color = isUp ? green[600] : WARNING
  return (
    <Box className="flex items-center gap-0.5" sx={{ justifyContent: 'flex-end' }}>
      <Icon sx={{ fontSize: 14, color }} />
      <Typography variant="body1" sx={{ color }}>
        {isUp ? `+${value}` : value}%
      </Typography>
    </Box>
  )
}

function ProgressCell({ value, warningBelow = 90 }) {
  return (
    <CollectionRateBar
      value={value}
      warningBelow={warningBelow}
      width={{ xs: 140, lg: 200 }}
    />
  )
}

const COLUMN_RENDERERS = {
  text: (v) => <Typography variant="body1">{v}</Typography>,
  number: (v) => (
    <Typography variant="body1">
      {typeof v === 'number' ? v.toLocaleString() : v}
    </Typography>
  ),
  percent: (v) => <Typography variant="body1">{v}%</Typography>,
  currency: (v) => (
    <Typography variant="body1">
      ${typeof v === 'number' ? v.toLocaleString() : v} 萬
    </Typography>
  ),
  delta: (v) => <DeltaText value={v} />,
  progress: (v, col) => <ProgressCell value={v} warningBelow={col.warningBelow} />,
}

function SectionComparisonTable({ title, subtitle, columns, rows }) {
  return (
    <OutlinedBlock title={title} subtitle={subtitle}>
      <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Table size="small" sx={{ '& th, & td': { whiteSpace: 'nowrap' } }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align ?? 'left'}
                  sx={{ ...headCellSx, width: col.width }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => {
                  const render = COLUMN_RENDERERS[col.type] ?? COLUMN_RENDERERS.text
                  return (
                    <TableCell key={col.key} align={col.align ?? 'left'} sx={bodyCellSx}>
                      {render(row[col.key], col)}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OutlinedBlock>
  )
}

// ── Quality Monitoring Table (used by BranchTab) ──────────

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

// ── Incidents Pie (BranchTab) ─────────────────────────────

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

// ── Comparison table column configs ───────────────────────

const NUMBER_COL_WIDTH = { xs: 110, lg: 140 }
const CURRENCY_COL_WIDTH = { xs: 120, lg: 160 }

const FINANCE_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'monthRevenue', label: '月營收', type: 'currency', align: 'right', width: CURRENCY_COL_WIDTH },
  { key: 'yoyPct', label: 'YoY', type: 'delta', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'momPct', label: 'MoM', type: 'delta', align: 'right', width: NUMBER_COL_WIDTH },
  {
    key: 'collectionRate',
    label: '收款率',
    type: 'progress',
    align: 'left',
    width: 260,
    warningBelow: 90,
  },
]

const OPERATION_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'staffTotal', label: '立案人數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'cases', label: '住民總數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'vacantBeds', label: '空床數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  {
    key: 'occupancyRate',
    label: '佔床率',
    type: 'progress',
    align: 'left',
    width: 260,
    warningBelow: 90,
  },
]

const RESIDENT_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'disability', label: '身障人數', type: 'number', align: 'right' },
  { key: 'over65', label: '65 歲以上人數', type: 'number', align: 'right' },
  { key: 'below65', label: '65 歲以下人數', type: 'number', align: 'right' },
]

const QUALITY_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'falls', label: '跌倒', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'restraints', label: '約束', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'wounds', label: '傷口', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'hospitalizations', label: '住院', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'incidents', label: '意外事件', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
]

const HR_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'fullTime', label: '全職員工', type: 'number', align: 'right' },
  { key: 'partTime', label: '兼職員工', type: 'number', align: 'right' },
  { key: 'resignations', label: '離職人數', type: 'number', align: 'right' },
  {
    key: 'turnoverRate',
    label: '離職率',
    type: 'progress',
    align: 'left',
    width: 200,
    warningBelow: null,
  },
]

// ── Tab 0: 總覽 ───────────────────────────────────────────

function OverviewSummarySection() {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <ShareableBlock title="重點摘要">
          <HighlightsCard title="重點摘要" items={overviewHighlights} />
        </ShareableBlock>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ShareableBlock title="月營收排行榜">
          <RankingCard title="月營收排行榜" items={monthRevenueRanking} />
        </ShareableBlock>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ShareableBlock title="佔床率排行榜">
          <RankingCard
            title="佔床率排行榜"
            items={occupancyRanking}
            valueFormatter={(r) => `${r.value}%`}
          />
        </ShareableBlock>
      </Grid>
    </Grid>
  )
}

function OverviewFinanceSection() {
  return (
    <ShareableBlock title="財務概況">
      <CategoryPaper
        icon={<AttachMoneyIcon />}
        title="財務概況"
        subtitle="本月概況與近 13 個月趨勢"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewFinanceKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, sm: 6, md: 3 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock
                title="營收趨勢"
                subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）"
              >
                <RevenueComposedChart
                  months={aggregateRevenueTrend.months}
                  series={aggregateRevenueTrend.series}
                  yoy={aggregateRevenueTrend.yoy}
                  height={280}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="收款率" subtitle="當月（2026/05，單位：萬元）">
                <ShareCardContent
                  data={overviewCollectionDonut.data}
                  totalLabel="本月應收"
                  unit="萬"
                  centerOverride={{
                    label: '收款率',
                    value: `${overviewCollectionDonut.ratePct}%`,
                    unit: '',
                  }}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構營收比較"
            subtitle="本月（2026/05）"
            columns={FINANCE_COMPARISON_COLUMNS}
            rows={financeComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewOperationsSection() {
  return (
    <ShareableBlock title="營運概況">
      <CategoryPaper
        icon={<AssessmentIcon />}
        title="營運概況"
        subtitle="佔床率與住民異動"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewOperationKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, sm: 4, md: 2 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="佔床率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
                <TrendLineChart
                  months={occupancyTrend.months}
                  series={occupancyTrend.series}
                  yAxisSuffix="%"
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="住民異動分析" subtitle="近 13 個月（25/05 ～ 26/05）">
                <MovementWaterfallChart
                  months={overviewResidentMovement.months}
                  series={overviewResidentMovement.series}
                  baseline={overviewResidentMovement.baselineResidents}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構營運比較"
            subtitle="本月（2026/05）"
            columns={OPERATION_COMPARISON_COLUMNS}
            rows={operationComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewResidentSection() {
  return (
    <ShareableBlock title="住民分析">
      <CategoryPaper
        icon={<PeopleIcon />}
        title="住民分析"
        subtitle="服務類型・退住原因・年齡分布"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewResidentKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, sm: 6, md: 3 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="服務類型分佈" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={overviewServiceTypes}
                  color={PRIMARY}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="退住原因" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={overviewDischargeReasons}
                  color={PRIMARY}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構住民比較"
            subtitle="本月（2026/05）"
            columns={RESIDENT_COMPARISON_COLUMNS}
            rows={residentComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewQualitySection() {
  return (
    <ShareableBlock title="照護品質">
      <CategoryPaper
        icon={<HealthAndSafetyIcon />}
        title="照護品質"
        subtitle="品質監測與意外事件管理"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewQualityKpis.map((kpi) => (
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
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="品質監測" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={overviewQualityMonitoring}
                  color={PRIMARY}
                  unit="件"
                  height={300}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="意外事件類型" subtitle="當月（2026/05）">
                <HorizontalBarChart
                  data={overviewIncidentTypes}
                  color={PRIMARY}
                  unit="件"
                  height={300}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構照護品質比較"
            subtitle="本月（2026/05）"
            columns={QUALITY_COMPARISON_COLUMNS}
            rows={qualityComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewHrSection() {
  return (
    <ShareableBlock title="人力狀況">
      <CategoryPaper icon={<BadgeIcon />} title="人力狀況" subtitle="人力結構與職位統計">
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewHrKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, sm: 6, md: 3 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>
          <OutlinedBlock title="在職人員職位統計" subtitle="當月（2026/05）">
            <PositionStatsBarChart data={overviewPositionStats} height={260} />
          </OutlinedBlock>
          <SectionComparisonTable
            title="各機構人力比較"
            subtitle="本月（2026/05）"
            columns={HR_COMPARISON_COLUMNS}
            rows={hrComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewTab() {
  return (
    <Box className="flex flex-col gap-4">
      <OverviewSummarySection />
      <OverviewFinanceSection />
      <OverviewOperationsSection />
      <OverviewResidentSection />
      <OverviewQualitySection />
      <OverviewHrSection />
    </Box>
  )
}

// ── Tab 1–3: 各機構 (unchanged) ───────────────────────────

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

            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <OutlinedBlock
                  title="營收趨勢"
                  subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）"
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
          icon={<HealthAndSafetyIcon />}
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
                <HorizontalBarChart
                  data={data.serviceTypes}
                  color={PRIMARY}
                  height={260}
                />
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
  const isValidBranch = branch && BRANCHES.includes(branch)
  const pageTitle = isValidBranch
    ? (BRANCH_FULL_NAME[branch] ?? branch)
    : '住宿機構總覽'

  return (
    <Box className="flex flex-col gap-4">
      <PageHeader title={pageTitle} />

      {!branch && <OverviewTab />}
      {isValidBranch && <BranchTab key={branch} branchName={branch} />}
    </Box>
  )
}

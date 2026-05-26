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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
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
import StackedBarChart from '@/components/charts/StackedBarChart'
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
  BRANCHES,
  BRANCH_INFO,
  branchData,
  overviewHighlights,
  monthRevenueRanking,
  caseCountRanking,
  overviewFinanceKpis,
  overviewCollectionDonut,
  aggregateRevenueTrend,
  financeComparison,
  overviewOperationKpis,
  casesTrend,
  newCasesTrend,
  operationComparison,
  overviewReimbursementKpis,
  subsidyUsageTrend,
  codeRevenueRanking,
  reimbursementBreakdownTrend,
  reimbursementComparison,
  overviewCaseKpis,
  welfareTrend,
  cmsLevelDonut,
  caseComparison,
  overviewQualityKpis,
  qualityComparison,
  overviewHrKpis,
  overviewPositionStats,
  hrComparison,
} from '@/features/homecare/mockData'

// ── Constants ─────────────────────────────────────────────
const PRIMARY = '#0097A7'
const WARNING = '#ED6C02'

const BRANCH_FULL_NAME = Object.fromEntries(BRANCH_INFO.map((b) => [b.short, b.full]))

// ── 在職人員職位統計（直條圖）────────────────────────────
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

function ProgressCell({ value, warningBelow }) {
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
  wan: (v) => (
    <Typography variant="body1">
      {typeof v === 'number' ? v.toLocaleString() : v}萬
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

// ── Comparison table column configs ───────────────────────
const NUMBER_COL_WIDTH = { xs: 110, lg: 140 }
const CURRENCY_COL_WIDTH = { xs: 120, lg: 160 }

const FINANCE_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  {
    key: 'monthRevenue',
    label: '月營收',
    type: 'currency',
    align: 'right',
    width: CURRENCY_COL_WIDTH,
  },
  { key: 'yoyPct', label: 'YoY', type: 'delta', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'momPct', label: 'MoM', type: 'delta', align: 'right', width: NUMBER_COL_WIDTH },
  {
    key: 'collectionRate',
    label: '收款率',
    type: 'progress',
    align: 'left',
    width: 260,
    warningBelow: null,
  },
]

const OPERATION_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'licensed', label: '立案人數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'cases', label: '總收案數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  {
    key: 'monthlyServiceCount',
    label: '當月服務個案',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  { key: 'newCases', label: '新個案', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'suspended', label: '暫停服務', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  { key: 'discharged', label: '結案', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
]

const REIMBURSEMENT_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  {
    key: 'subsidyQuota',
    label: '核定補助額度',
    type: 'wan',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'actualServiceCount',
    label: '實際服務金額',
    type: 'wan',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'subsidyUsageRate',
    label: '補助使用率',
    type: 'progress',
    align: 'left',
    width: 260,
    warningBelow: null,
  },
  {
    key: 'growthSpace',
    label: '成長空間',
    type: 'wan',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
]

const CASE_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  { key: 'cases', label: '總收案數', type: 'number', align: 'right', width: NUMBER_COL_WIDTH },
  {
    key: 'lowIncomeCount',
    label: '低收/中低收',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'regularCount',
    label: '一般身份',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'lowIncomePct',
    label: '低收/中低收比例',
    type: 'progress',
    align: 'left',
    width: 260,
    warningBelow: null,
  },
]

const QUALITY_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  {
    key: 'abnormalEvents',
    label: '異常事件數',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'complaints',
    label: '申訴件數',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'closedCaseRate',
    label: '結案率',
    type: 'progress',
    align: 'left',
    width: 200,
    warningBelow: null,
  },
]

const HR_COMPARISON_COLUMNS = [
  { key: 'name', label: '機構', type: 'text', align: 'left' },
  {
    key: 'staffTotal',
    label: '員工總數',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'careWorkers',
    label: '照服員人數',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
  {
    key: 'resignations',
    label: '當月照服員離職人數',
    type: 'number',
    align: 'right',
    width: NUMBER_COL_WIDTH,
  },
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
        <ShareableBlock title="收案數排行榜">
          <RankingCard
            title="收案數排行榜"
            items={caseCountRanking}
            valueFormatter={(r) => `${r.value} 人`}
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
            title="各機構財務概況比較"
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
        subtitle="收案狀況與個案異動"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewOperationKpis.map((kpi) => (
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
              <OutlinedBlock title="總收案數趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：人）">
                <TrendLineChart
                  months={casesTrend.months}
                  series={casesTrend.series}
                  yAxisSuffix="人"
                  yDomain={[55, 175]}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="新個案趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：人）">
                <StackedBarChart
                  months={newCasesTrend.months}
                  series={newCasesTrend.series}
                  yAxisSuffix="人"
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構營運概況比較"
            subtitle="本月（2026/05）"
            columns={OPERATION_COMPARISON_COLUMNS}
            rows={operationComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewReimbursementSection() {
  return (
    <ShareableBlock title="核銷分析">
      <CategoryPaper
        icon={<AccountBalanceIcon />}
        title="核銷分析"
        subtitle="政府補助使用率與核銷結構"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewReimbursementKpis.map((kpi) => (
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
              <OutlinedBlock title="補助使用率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
                <TrendLineChart
                  months={subsidyUsageTrend.months}
                  series={subsidyUsageTrend.series}
                  yAxisSuffix="%"
                  yDomain={[65, 100]}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="碼別營收排行（前 3 名）" subtitle="當月（2026/05，單位：萬元）">
                <HorizontalBarChart
                  data={codeRevenueRanking}
                  color={PRIMARY}
                  unit="萬"
                  height={220}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <OutlinedBlock
            title="核銷統計趨勢圖"
            subtitle="近 13 個月（25/05 ～ 26/05，政府補助／自付／自費，單位：萬元）"
          >
            <StackedBarChart
              months={reimbursementBreakdownTrend.months}
              series={reimbursementBreakdownTrend.series}
              yAxisSuffix="萬"
              height={280}
            />
          </OutlinedBlock>
          <SectionComparisonTable
            title="各機構核銷概況比較"
            subtitle="本月（2026/05）"
            columns={REIMBURSEMENT_COMPARISON_COLUMNS}
            rows={reimbursementComparison}
          />
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function OverviewCaseSection() {
  return (
    <ShareableBlock title="個案分析">
      <CategoryPaper
        icon={<PeopleIcon />}
        title="個案分析"
        subtitle="福利身份別・CMS 等級分布"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewCaseKpis.map((kpi) => (
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
                title="有排班個案福利身份別"
                subtitle="近 13 個月（25/05 ～ 26/05，單位：人）"
              >
                <StackedBarChart
                  months={welfareTrend.months}
                  series={welfareTrend.series}
                  yAxisSuffix="人"
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="當月有排班個案 CMS 等級" subtitle="當月（2026/05）">
                <ShareCardContent
                  data={cmsLevelDonut}
                  totalLabel="排班個案"
                  unit="人"
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <SectionComparisonTable
            title="各機構個案比較"
            subtitle="本月（2026/05）"
            columns={CASE_COMPARISON_COLUMNS}
            rows={caseComparison}
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
        subtitle="品質監測與事件管理"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {overviewQualityKpis.map((kpi) => (
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
      <OverviewReimbursementSection />
      <OverviewCaseSection />
      <OverviewQualitySection />
      <OverviewHrSection />
    </Box>
  )
}

// ── Tab 1–2: 各居服站 ─────────────────────────────────────

function BranchFinanceSection({ data, branchName }) {
  return (
    <ShareableBlock title={`${branchName} - 財務概況`}>
      <CategoryPaper
        icon={<AttachMoneyIcon />}
        title="財務概況"
        subtitle="本月概況與近 13 個月趨勢"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.financeKpis.map((kpi) => (
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
              <OutlinedBlock title="收款率" subtitle="當月（2026/05，單位：萬元）">
                <ShareCardContent
                  data={data.collectionDonut.data}
                  totalLabel="本月應收"
                  unit="萬"
                  centerOverride={{
                    label: '收款率',
                    value: `${data.collectionDonut.ratePct}%`,
                    unit: '',
                  }}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchOperationsSection({ data, branchName, branchCasesSeries, newCasesSeries }) {
  return (
    <ShareableBlock title={`${branchName} - 營運概況`}>
      <CategoryPaper
        icon={<AssessmentIcon />}
        title="營運概況"
        subtitle="收案狀況與個案異動"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.operationKpis.map((kpi) => (
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
              <OutlinedBlock title="總收案數趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：人）">
                <TrendLineChart
                  months={casesTrend.months}
                  series={branchCasesSeries}
                  yAxisSuffix="人"
                  yDomain={[55, 105]}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="新個案趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：人）">
                <StackedBarChart
                  months={newCasesTrend.months}
                  series={newCasesSeries}
                  yAxisSuffix="人"
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchReimbursementSection({ data, branchName, subsidySeries }) {
  return (
    <ShareableBlock title={`${branchName} - 核銷分析`}>
      <CategoryPaper
        icon={<AccountBalanceIcon />}
        title="核銷分析"
        subtitle="政府補助使用率與核銷結構"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.reimbursementKpis.map((kpi) => (
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
              <OutlinedBlock title="補助使用率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
                <TrendLineChart
                  months={subsidyUsageTrend.months}
                  series={subsidySeries}
                  yAxisSuffix="%"
                  yDomain={[65, 100]}
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock
                title="碼別營收排行（前 3 名）"
                subtitle="當月（2026/05，單位：萬元）"
              >
                <HorizontalBarChart
                  data={data.codeRevenueRanking}
                  color={PRIMARY}
                  unit="萬"
                  height={220}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
          <OutlinedBlock
            title="核銷統計趨勢圖"
            subtitle="近 13 個月（25/05 ～ 26/05，政府補助／自付／自費，單位：萬元）"
          >
            <StackedBarChart
              months={data.reimbursementBreakdownTrend.months}
              series={data.reimbursementBreakdownTrend.series}
              yAxisSuffix="萬"
              height={280}
            />
          </OutlinedBlock>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchCaseSection({ data, branchName }) {
  return (
    <ShareableBlock title={`${branchName} - 個案分析`}>
      <CategoryPaper
        icon={<PeopleIcon />}
        title="個案分析"
        subtitle="福利身份別・CMS 等級分布"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.caseKpis.map((kpi) => (
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
                title="有排班個案福利身份別"
                subtitle="近 13 個月（25/05 ～ 26/05，單位：人）"
              >
                <StackedBarChart
                  months={data.welfareTrend.months}
                  series={data.welfareTrend.series}
                  yAxisSuffix="人"
                  height={260}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="當月有排班個案 CMS 等級" subtitle="當月（2026/05）">
                <ShareCardContent
                  data={data.cmsLevelDonut}
                  totalLabel="排班個案"
                  unit="人"
                />
              </OutlinedBlock>
            </Grid>
          </Grid>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchQualitySection({ data, branchName }) {
  return (
    <ShareableBlock title={`${branchName} - 照護品質`}>
      <CategoryPaper
        icon={<HealthAndSafetyIcon />}
        title="照護品質"
        subtitle="品質監測與事件管理"
      >
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.qualityKpis.map((kpi) => (
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
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchHrSection({ data, branchName }) {
  return (
    <ShareableBlock title={`${branchName} - 人力狀況`}>
      <CategoryPaper icon={<BadgeIcon />} title="人力狀況" subtitle="人力結構與職位統計">
        <Box className="flex flex-col gap-4">
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {data.hrKpis.map((kpi) => (
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
            <PositionStatsBarChart data={data.positionStats} height={260} />
          </OutlinedBlock>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

function BranchTab({ branchName }) {
  const data = branchData[branchName]

  const branchCasesSeries = useMemo(() => {
    const match = casesTrend.series.find((s) => s.name === branchName)
    return match ? [{ name: '總收案數', color: PRIMARY, data: match.data }] : []
  }, [branchName])

  const branchNewCasesSeries = useMemo(() => {
    const match = newCasesTrend.series.find((s) => s.name === branchName)
    return match ? [{ name: '新個案', color: PRIMARY, data: match.data }] : []
  }, [branchName])

  const branchSubsidySeries = useMemo(() => {
    const match = subsidyUsageTrend.series.find((s) => s.name === branchName)
    return match ? [{ name: '補助使用率', color: PRIMARY, data: match.data }] : []
  }, [branchName])

  return (
    <Box className="flex flex-col gap-4">
      <BranchFinanceSection data={data} branchName={branchName} />
      <BranchOperationsSection
        data={data}
        branchName={branchName}
        branchCasesSeries={branchCasesSeries}
        newCasesSeries={branchNewCasesSeries}
      />
      <BranchReimbursementSection
        data={data}
        branchName={branchName}
        subsidySeries={branchSubsidySeries}
      />
      <BranchCaseSection data={data} branchName={branchName} />
      <BranchQualitySection data={data} branchName={branchName} />
      <BranchHrSection data={data} branchName={branchName} />
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function HomeCare() {
  const { branch } = useParams()
  const isValidBranch = branch && BRANCHES.includes(branch)
  const pageTitle = isValidBranch ? (BRANCH_FULL_NAME[branch] ?? branch) : '居服機構總覽'

  return (
    <Box className="flex flex-col gap-4">
      <PageHeader title={pageTitle} />

      {!branch && <OverviewTab />}
      {isValidBranch && <BranchTab key={branch} branchName={branch} />}
    </Box>
  )
}

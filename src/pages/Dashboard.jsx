import { Fragment } from 'react'
import {
  Box,
  Divider,
  Grid,
  Paper,
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BadgeIcon from '@mui/icons-material/Badge'

import RevenueComposedChart from '@/components/charts/RevenueComposedChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import ShareableBlock from '@/components/ShareableBlock'
import PageHeader from '@/components/PageHeader'
import CollectionRateBar from '@/components/CollectionRateBar'
import {
  CategoryPaper,
  OutlinedBlock,
  KpiTile,
  ShareCardContent,
} from '@/components/SectionBlocks'

import {
  highlights,
  revenueRankingTop5,
  financialKpis,
  collectionDonut,
  revenueTrend,
  financialRanking,
  operationsKpis,
  caseTrend,
  caseShareCurrent,
  operationsRanking,
  hrKpis,
  hrComparison,
} from '@/features/overview/mockData'

const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'
const WARNING = '#ED6C02'

// ── Table cell sx ─────────────────────────────────────────
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

// ── Shared atoms ──────────────────────────────────────────

function MoMDelta({ value }) {
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

function TypePill({ label }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 0.75,
        py: 0.125,
        mr: 1,
        borderRadius: '4px',
        bgcolor: `${PRIMARY}1F`,
        color: PRIMARY,
        fontSize: 11,
        fontWeight: 500,
        lineHeight: '16px',
        verticalAlign: 'middle',
      }}
    >
      {label}
    </Box>
  )
}

// ── Section 1: 重點摘要 + 月營收排行榜 ───────────────────────

function HighlightItem({ item }) {
  const accent = item.tone === 'warning' ? '#FF9800' : PRIMARY

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, alignSelf: 'stretch' }}>
        <Box
          sx={{
            width: 4,
            alignSelf: 'stretch',
            borderRadius: '18px',
            bgcolor: accent,
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          {item.facility}：{item.metric}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.hint}
        </Typography>
      </Box>
    </Box>
  )
}

function SummaryCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: 'block', mt: 0.25 }}
        >
          {subtitle}
        </Typography>
      </Box>
      {children}
    </Paper>
  )
}

function HighlightsCard() {
  return (
    <SummaryCard title="重點摘要" subtitle="當月（2026/05）">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {highlights.map((item, idx) => (
          <Fragment key={`${item.facility}-${item.metric}`}>
            {idx > 0 && <Divider />}
            <HighlightItem item={item} />
          </Fragment>
        ))}
      </Box>
    </SummaryCard>
  )
}

function RevenueRankBadge({ rank }) {
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: 'rgba(0,151,167,0.12)',
        color: PRIMARY_DARK,
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '0.15px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {rank}
    </Box>
  )
}

function RevenueRankRow({ row }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
      <RevenueRankBadge rank={row.rank} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{ color: 'text.primary', lineHeight: 1.3 }}
          noWrap
        >
          {row.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.4 }}>
          {row.typeLabel}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ fontWeight: 500, color: 'text.primary', whiteSpace: 'nowrap' }}
      >
        ${row.monthRevenue.toLocaleString()}{' '}
        <Typography component="span" variant="caption" color="textSecondary">
          萬
        </Typography>
      </Typography>
    </Box>
  )
}

function RevenueRankingCard() {
  return (
    <SummaryCard title="月營收排行榜" subtitle="當月（2026/05）・Top 5 機構">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {revenueRankingTop5.map((row, idx) => (
          <Fragment key={row.id}>
            {idx > 0 && <Divider />}
            <RevenueRankRow row={row} />
          </Fragment>
        ))}
      </Box>
    </SummaryCard>
  )
}

function HighlightsSection() {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ShareableBlock title="重點摘要">
          <HighlightsCard />
        </ShareableBlock>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ShareableBlock title="月營收排行榜">
          <RevenueRankingCard />
        </ShareableBlock>
      </Grid>
    </Grid>
  )
}

// ── Section 2: 財務概況 ──────────────────────────────────

function FinancialRankingTable() {
  return (
    <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>機構</TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 'auto', lg: 200 } }}
              align="right"
            >
              本月營收
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 96, lg: 140 } }}
              align="right"
            >
              YoY
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 96, lg: 140 } }}
              align="right"
            >
              MoM
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 200, lg: 300 } }}>
              收款率
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {financialRanking.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={bodyCellSx}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <TypePill label={row.typeLabel} />
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">
                  ${row.monthRevenue.toLocaleString()} 萬
                </Typography>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <MoMDelta value={row.yoyPct} />
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <MoMDelta value={row.momPct} />
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <CollectionRateBar
                  value={row.collectionRate}
                  warningBelow={70}
                  width={{ xs: 180, lg: 280 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function FinancialSection() {
  return (
    <ShareableBlock title="財務概況">
      <CategoryPaper
        icon={<AttachMoneyIcon />}
        title="財務概況"
        subtitle="當月（2026/05）"
      >
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {financialKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 3 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                  hint={kpi.hint}
                />
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock
                title="營收趨勢"
                subtitle="近 13 個月（柱狀為各服務別、折線為 YoY 成長率）"
              >
                <RevenueComposedChart
                  months={revenueTrend.months}
                  series={revenueTrend.series}
                  yoy={revenueTrend.yoy}
                  height={280}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="收款率" subtitle="當月（2026/05）">
                <ShareCardContent
                  data={collectionDonut.data}
                  totalLabel="收款率"
                  unit="萬"
                  centerOverride={{
                    label: '收款率',
                    value: `${collectionDonut.ratePct}`,
                    unit: '%',
                  }}
                />
              </OutlinedBlock>
            </Grid>
          </Grid>

          {/* Ranking table */}
          <OutlinedBlock title="各機構營收比較">
            <FinancialRankingTable />
          </OutlinedBlock>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

// ── Section 3: 營運概況 ──────────────────────────────────

function OperationsRankingTable() {
  return (
    <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>機構</TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 120, lg: 160 } }}
              align="right"
            >
              立案人數
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 100, lg: 140 } }}
              align="right"
            >
              個案數
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 200, lg: 300 } }}>
              收案率
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operationsRanking.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={bodyCellSx}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <TypePill label={row.typeLabel} />
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">{row.beds}</Typography>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">{row.cases}</Typography>
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <CollectionRateBar
                  value={row.intakeRate}
                  width={{ xs: 180, lg: 280 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function OperationsSection() {
  return (
    <ShareableBlock title="營運概況">
      <CategoryPaper
        icon={<AssessmentIcon />}
        title="營運概況"
        subtitle="當月（2026/05）"
      >
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {operationsKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 6 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock
                title="個案數趨勢"
                subtitle="近 13 個月（住宿 / 日照 / 居服）"
              >
                <StackedBarChart
                  months={caseTrend.months}
                  series={caseTrend.series}
                  yAxisSuffix=" 人"
                  height={280}
                />
              </OutlinedBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedBlock title="個案數佔比" subtitle="當月（2026/05）">
                <ShareCardContent
                  data={caseShareCurrent}
                  totalLabel="個案總數"
                  unit="人"
                />
              </OutlinedBlock>
            </Grid>
          </Grid>

          {/* Ranking table */}
          <OutlinedBlock title="各機構營運比較">
            <OperationsRankingTable />
          </OutlinedBlock>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

// ── Section 4: 人力狀況 ──────────────────────────────────

function HrComparisonTable() {
  return (
    <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>機構</TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }}
              align="right"
            >
              總員工數
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }}
              align="right"
            >
              全職員工
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }}
              align="right"
            >
              兼職員工
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }}
              align="right"
            >
              離職率
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hrComparison.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={bodyCellSx}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <TypePill label={row.typeLabel} />
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">{row.staffTotal} 人</Typography>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">{row.fullTime} 人</Typography>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">{row.partTime} 人</Typography>
              </TableCell>
              <TableCell sx={bodyCellSx} align="right">
                <Typography variant="body1">
                  {row.turnoverRate.toFixed(1)}%
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function HrSection() {
  return (
    <ShareableBlock title="人力狀況">
      <CategoryPaper icon={<BadgeIcon />} title="人力狀況" subtitle="當月（2026/05）">
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {hrKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 3 }}>
                <KpiTile
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  delta={kpi.delta}
                />
              </Grid>
            ))}
          </Grid>

          {/* Comparison table */}
          <OutlinedBlock title="各機構人力比較">
            <HrComparisonTable />
          </OutlinedBlock>
        </Box>
      </CategoryPaper>
    </ShareableBlock>
  )
}

// ── Page ─────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PageHeader title="集團總覽" />
      <HighlightsSection />
      <FinancialSection />
      <OperationsSection />
      <HrSection />
    </Box>
  )
}

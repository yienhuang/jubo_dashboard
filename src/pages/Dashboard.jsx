import { useState, useMemo } from 'react'
import {
  Box,
  Grid,
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BadgeIcon from '@mui/icons-material/Badge'

import RevenueComposedChart from '@/components/charts/RevenueComposedChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import ShareableBlock from '@/components/ShareableBlock'
import PageHeader from '@/components/PageHeader'
import CollectionRateBar from '@/components/CollectionRateBar'
import HighlightsCard from '@/components/HighlightsCard'
import RankingCard from '@/components/RankingCard'
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

const revenueRankingItems = revenueRankingTop5.map((r) => ({
  rank: r.rank,
  id: r.id,
  name: r.name,
  typeLabel: r.typeLabel,
  value: r.monthRevenue,
  unit: '萬',
}))

function HighlightsSection() {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ShareableBlock title="重點摘要">
          <HighlightsCard title="重點摘要" items={highlights} />
        </ShareableBlock>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ShareableBlock title="月營收排行榜">
          <RankingCard
            title="月營收排行榜"
            items={revenueRankingItems}
            showTypeLabel
          />
        </ShareableBlock>
      </Grid>
    </Grid>
  )
}

// ── Section 2: 財務概況 ──────────────────────────────────

function FinancialRankingTable() {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey) return financialRanking
    return [...financialRanking].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (sortKey === 'name') {
        const typeCmp = String(a.typeLabel ?? '').localeCompare(String(b.typeLabel ?? ''), 'zh-TW')
        if (typeCmp !== 0) return sortDir === 'asc' ? typeCmp : -typeCmp
        const nameCmp = String(av ?? '').localeCompare(String(bv ?? ''), 'zh-TW')
        return sortDir === 'asc' ? nameCmp : -nameCmp
      }
      return sortDir === 'asc'
        ? (av ?? -Infinity) - (bv ?? -Infinity)
        : (bv ?? -Infinity) - (av ?? -Infinity)
    })
  }, [sortKey, sortDir])

  const slSx = {
    color: 'inherit',
    '&.Mui-active': { color: 'inherit' },
    '& .MuiTableSortLabel-icon': { color: 'inherit' },
  }

  return (
    <TableContainer sx={{ borderRadius: '4px', overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headCellSx, minWidth: 160 }}>
              <TableSortLabel active={sortKey === 'name'} direction={sortKey === 'name' ? sortDir : 'asc'} onClick={() => handleSort('name')} sx={slSx}>機構</TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ ...headCellSx, width: { xs: 'auto', lg: 200 } }}
              align="right"
            >
              <TableSortLabel active={sortKey === 'monthRevenue'} direction={sortKey === 'monthRevenue' ? sortDir : 'asc'} onClick={() => handleSort('monthRevenue')} sx={slSx}>本月營收</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 96, lg: 140 } }} align="right">
              <TableSortLabel active={sortKey === 'yoyPct'} direction={sortKey === 'yoyPct' ? sortDir : 'asc'} onClick={() => handleSort('yoyPct')} sx={slSx}>YoY</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 96, lg: 140 } }} align="right">
              <TableSortLabel active={sortKey === 'momPct'} direction={sortKey === 'momPct' ? sortDir : 'asc'} onClick={() => handleSort('momPct')} sx={slSx}>MoM</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 200, lg: 300 } }}>
              <TableSortLabel active={sortKey === 'collectionRate'} direction={sortKey === 'collectionRate' ? sortDir : 'asc'} onClick={() => handleSort('collectionRate')} sx={slSx}>收款率</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
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
                  <Typography component="span" variant="body1" sx={{ lineHeight: 1.3 }}>
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
        subtitle="營收、收款率與各機構財務比較"
      >
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {financialKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, md: 3 }}>
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
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey) return operationsRanking
    return [...operationsRanking].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (sortKey === 'name') {
        const typeCmp = String(a.typeLabel ?? '').localeCompare(String(b.typeLabel ?? ''), 'zh-TW')
        if (typeCmp !== 0) return sortDir === 'asc' ? typeCmp : -typeCmp
        const nameCmp = String(av ?? '').localeCompare(String(bv ?? ''), 'zh-TW')
        return sortDir === 'asc' ? nameCmp : -nameCmp
      }
      return sortDir === 'asc'
        ? (av ?? -Infinity) - (bv ?? -Infinity)
        : (bv ?? -Infinity) - (av ?? -Infinity)
    })
  }, [sortKey, sortDir])

  const slSx = {
    color: 'inherit',
    '&.Mui-active': { color: 'inherit' },
    '& .MuiTableSortLabel-icon': { color: 'inherit' },
  }

  return (
    <TableContainer sx={{ borderRadius: '4px', overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headCellSx, minWidth: 160 }}>
              <TableSortLabel active={sortKey === 'name'} direction={sortKey === 'name' ? sortDir : 'asc'} onClick={() => handleSort('name')} sx={slSx}>機構</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 120, lg: 160 } }} align="right">
              <TableSortLabel active={sortKey === 'beds'} direction={sortKey === 'beds' ? sortDir : 'asc'} onClick={() => handleSort('beds')} sx={slSx}>立案人數</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 100, lg: 140 } }} align="right">
              <TableSortLabel active={sortKey === 'cases'} direction={sortKey === 'cases' ? sortDir : 'asc'} onClick={() => handleSort('cases')} sx={slSx}>個案數</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 200, lg: 300 } }}>
              <TableSortLabel active={sortKey === 'intakeRate'} direction={sortKey === 'intakeRate' ? sortDir : 'asc'} onClick={() => handleSort('intakeRate')} sx={slSx}>收案率</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
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
                  <Typography component="span" variant="body1" sx={{ lineHeight: 1.3 }}>
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
                <CollectionRateBar value={row.intakeRate} width={{ xs: 180, lg: 280 }} />
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
        subtitle="個案數、收案率與各機構營運比較"
      >
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {operationsKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, md: 3 }}>
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
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey) return hrComparison
    return [...hrComparison].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (sortKey === 'name') {
        const typeCmp = String(a.typeLabel ?? '').localeCompare(String(b.typeLabel ?? ''), 'zh-TW')
        if (typeCmp !== 0) return sortDir === 'asc' ? typeCmp : -typeCmp
        const nameCmp = String(av ?? '').localeCompare(String(bv ?? ''), 'zh-TW')
        return sortDir === 'asc' ? nameCmp : -nameCmp
      }
      return sortDir === 'asc'
        ? (av ?? -Infinity) - (bv ?? -Infinity)
        : (bv ?? -Infinity) - (av ?? -Infinity)
    })
  }, [sortKey, sortDir])

  const slSx = {
    color: 'inherit',
    '&.Mui-active': { color: 'inherit' },
    '& .MuiTableSortLabel-icon': { color: 'inherit' },
  }

  return (
    <TableContainer sx={{ borderRadius: '4px', overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headCellSx, minWidth: 160 }}>
              <TableSortLabel active={sortKey === 'name'} direction={sortKey === 'name' ? sortDir : 'asc'} onClick={() => handleSort('name')} sx={slSx}>機構</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }} align="right">
              <TableSortLabel active={sortKey === 'staffTotal'} direction={sortKey === 'staffTotal' ? sortDir : 'asc'} onClick={() => handleSort('staffTotal')} sx={slSx}>總員工數</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }} align="right">
              <TableSortLabel active={sortKey === 'fullTime'} direction={sortKey === 'fullTime' ? sortDir : 'asc'} onClick={() => handleSort('fullTime')} sx={slSx}>全職員工</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }} align="right">
              <TableSortLabel active={sortKey === 'partTime'} direction={sortKey === 'partTime' ? sortDir : 'asc'} onClick={() => handleSort('partTime')} sx={slSx}>兼職員工</TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headCellSx, width: { xs: 110, lg: 150 } }} align="right">
              <TableSortLabel active={sortKey === 'turnoverRate'} direction={sortKey === 'turnoverRate' ? sortDir : 'asc'} onClick={() => handleSort('turnoverRate')} sx={slSx}>離職率</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
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
                  <Typography component="span" variant="body1" sx={{ lineHeight: 1.3 }}>
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
                <Typography variant="body1">{row.turnoverRate.toFixed(1)}%</Typography>
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
      <CategoryPaper icon={<BadgeIcon />} title="人力狀況" subtitle="員工數、離職率與各機構人力比較">
        <Box className="flex flex-col gap-4">
          {/* KPI tiles */}
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {hrKpis.map((kpi) => (
              <Grid key={kpi.key} size={{ xs: 6, md: 3 }}>
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

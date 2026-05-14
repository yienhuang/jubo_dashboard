import { useRef, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'
import PeopleIcon from '@mui/icons-material/People'
import BadgeIcon from '@mui/icons-material/Badge'
import BedIcon from '@mui/icons-material/Bed'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import TrendLineChart from '@/components/charts/TrendLineChart'
import RevenueComposedChart from '@/components/charts/RevenueComposedChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import AreaLineChart from '@/components/charts/AreaLineChart'

import {
  reportDate,
  overviewKpis,
  occupancyTrend,
  revenueByBranch,
  BRANCHES,
  branchData,
} from '@/features/accommodation/mockData'

// ── Constants ─────────────────────────────────────────────
const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'
const WARNING = '#ED6C02'

const OVERVIEW_CHIPS = ['總覽統計', '各機構占床率趨勢', '各機構整體服務營收']
const BRANCH_CHIPS = ['機構概覽', '住民動態', '住民結構', '財務狀況']

const KPI_ICONS_OVERVIEW = {
  serviceTotal: <PeopleIcon />,
  staffTotal: <BadgeIcon />,
  occupancy: <BedIcon />,
  revenue: <AttachMoneyIcon />,
}

const KPI_ICONS_BRANCH = {
  service: <PeopleIcon />,
  staff: <BadgeIcon />,
  occupancy: <BedIcon />,
  revenue: <AttachMoneyIcon />,
}

const KPI_ICONS_FINANCE = {
  revenue: <AttachMoneyIcon />,
  collected: <AccountBalanceWalletIcon />,
  overdue: <WarningAmberIcon />,
  staffCost: <ReceiptLongIcon />,
  costRatio: <ReceiptLongIcon />,
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

function SectionHeader({ id, label }) {
  return (
    <Box id={id} sx={{ pt: 1, pb: 0.5 }}>
      <Typography variant="subtitle3" sx={{ color: PRIMARY_DARK, fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  )
}

function AnchorChips({ chips, sectionRefs }) {
  const handleClick = (label) => {
    const el = sectionRefs.current[label]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <Box className="flex flex-wrap gap-2" sx={{ py: 1.5 }}>
      {chips.map((label) => (
        <Chip
          key={label}
          label={label}
          size="small"
          onClick={() => handleClick(label)}
          sx={{
            cursor: 'pointer',
            bgcolor: 'rgba(0,151,167,0.08)',
            color: PRIMARY_DARK,
            fontWeight: 500,
            '&:hover': { bgcolor: 'rgba(0,151,167,0.16)' },
          }}
        />
      ))}
    </Box>
  )
}

// ── Year Occupancy Bar Chart ──────────────────────────────

function YearOccupancyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 16, bottom: 0, left: -8 }}>
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
          tickFormatter={(v) => `${v}%`}
          domain={[78, 100]}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', boxShadow: 'none', fontSize: 12 }}
          formatter={(value) => (value == null ? ['—', '占床率'] : [`${value}%`, '占床率'])}
        />
        <Bar dataKey="value" fill={PRIMARY} maxBarSize={32} radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="value"
            position="top"
            style={{ fontSize: 11, fill: 'rgba(0,0,0,0.6)' }}
            formatter={(v) => (v == null ? '' : `${v}%`)}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Pie Chart (disability ratio) ──────────────────────────

const RADIAN = Math.PI / 180
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.06) return null
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

function DisabilityPieChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <Box className="flex items-center gap-3">
      <Box sx={{ flexShrink: 0 }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              label={PieLabel}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', boxShadow: 'none', fontSize: 12 }}
              formatter={(value, name) => [`${value} 人（${((value / total) * 100).toFixed(1)}%）`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {data.map((item) => (
          <Box key={item.name} className="flex items-center justify-between" sx={{ py: 0.5 }}>
            <Box className="flex items-center gap-1.5">
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ lineHeight: 1.3 }}>{item.name}</Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 1, flexShrink: 0 }}>
              {item.value} 人
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
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

// ── AI Insight Card ───────────────────────────────────────

function AiInsightCard({ insights }) {
  const chipColor = {
    success: { bg: 'rgba(46,125,50,0.12)', color: '#2E7D32', label: '良好' },
    warning: { bg: 'rgba(237,108,2,0.12)',  color: WARNING,   label: '異常' },
  }
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box className="flex items-center gap-1.5" sx={{ mb: 2 }}>
          <PsychologyAltIcon sx={{ fontSize: 20, color: PRIMARY }} />
          <Typography variant="h6">智慧分析</Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          {insights.map((item, i) => {
            const cfg = chipColor[item.status]
            return (
              <Box key={i} className="flex items-start justify-between gap-2">
                <Typography variant="body2" sx={{ flex: 1, lineHeight: 1.6 }}>
                  {item.text}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.25,
                    borderRadius: '16px',
                    bgcolor: cfg.bg,
                    color: cfg.color,
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {cfg.label}
                </Box>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Quality Alert Card ────────────────────────────────────

function QualityAlertCard({ alerts }) {
  return (
    <Card>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>品監異常項目</Typography>
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
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
      </CardContent>
    </Card>
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

// ── Tab 0: 總覽 ───────────────────────────────────────────

function OverviewTab({ sectionRefs }) {
  const refSetter = (label) => (el) => { sectionRefs.current[label] = el }

  return (
    <Box className="flex flex-col gap-3">
      {/* 總覽統計 */}
      <Box ref={refSetter('總覽統計')}>
        <SectionHeader label="總覽統計" />
        <Grid container spacing={2} sx={{ mt: 0 }}>
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
      </Box>

      {/* 趨勢圖區 */}
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box ref={refSetter('各機構占床率趨勢')} sx={{ height: '100%' }}>
            <SectionCard title="各機構占床率趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
              <TrendLineChart
                months={occupancyTrend.months}
                series={occupancyTrend.series}
                yAxisSuffix="%"
                height={280}
              />
            </SectionCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box ref={refSetter('各機構整體服務營收')} sx={{ height: '100%' }}>
            <SectionCard
              title="各機構整體服務營收"
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
      </Grid>
    </Box>
  )
}

// ── Tab 1–3: 各機構 ───────────────────────────────────────

function BranchTab({ branchName, sectionRefs }) {
  const data = branchData[branchName]
  const refSetter = (label) => (el) => { sectionRefs.current[label] = el }

  return (
    <Box className="flex flex-col gap-4">

      {/* 機構概覽 */}
      <Box ref={refSetter('機構概覽')}>
        <SectionHeader label="機構概覽" />
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {/* 智慧分析 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AiInsightCard insights={data.aiInsights} />
          </Grid>
          {/* KPI × 4（2×2） */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {data.kpis.map((kpi) => (
                <Grid key={kpi.key} size={{ xs: 6 }}>
                  <KpiCard
                    title={kpi.title}
                    value={kpi.value}
                    unit={kpi.unit}
                    delta={kpi.delta}
                    icon={KPI_ICONS_BRANCH[kpi.key]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* 年度占床率（全寬） */}
          <Grid size={{ xs: 12 }}>
            <SectionCard title="2026年度占床率" subtitle="1 ～ 12 月（未到月份留空）" fullHeight={false}>
              <YearOccupancyChart data={data.yearOccupancy} />
            </SectionCard>
          </Grid>
        </Grid>
      </Box>

      {/* 住民動態 */}
      <Box ref={refSetter('住民動態')}>
        <SectionHeader label="住民動態" />
        <Grid container spacing={2} sx={{ mt: 0, alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="結存人日數趨勢" subtitle="近 13 個月（25/05 ～ 26/05）">
              <TrendLineChart
                months={data.patientDays.months}
                series={[{ name: '人日數', color: PRIMARY, data: data.patientDays.data }]}
                yAxisSuffix=""
                height={260}
              />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="住民異動分析" subtitle="近 13 個月（25/05 ～ 26/05）">
              <TrendLineChart
                months={data.residentMovement.months}
                series={data.residentMovement.series}
                yAxisSuffix=" 人"
                height={260}
              />
            </SectionCard>
          </Grid>
        </Grid>
      </Box>

      {/* 住民結構 */}
      <Box ref={refSetter('住民結構')}>
        <SectionHeader label="住民結構" />
        <Grid container spacing={2} sx={{ mt: 0, alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="服務類型分佈" subtitle="當月（2026/05）">
              <HorizontalBarChart data={data.serviceTypes} height={260} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="居住年期分佈" subtitle="當月（2026/05）">
              <HorizontalBarChart data={data.residencyYears} color={PRIMARY} height={260} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="身障比例" subtitle="當月（2026/05）">
              <DisabilityPieChart data={data.disabilityRatio} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="CMS 等級分佈" subtitle="當月（2026/05）">
              <CmsBarChart data={data.cmsLevels} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <QualityAlertCard alerts={data.qualityAlerts} />
          </Grid>
        </Grid>
      </Box>

      {/* 財務狀況 */}
      <Box ref={refSetter('財務狀況')}>
        <SectionHeader label="財務狀況" />
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {/* 本月財務快照 KPI × 5 */}
          {data.financeKpis.map((kpi) => (
            <Grid key={kpi.key} size={{ xs: 6, sm: 4, md: 'grow' }}>
              <KpiCard
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                delta={kpi.delta}
                icon={KPI_ICONS_FINANCE[kpi.key]}
                warningBg={kpi.delta?.isWarning}
              />
            </Grid>
          ))}
          {/* 營收趨勢（全寬） */}
          <Grid size={{ xs: 12 }}>
            <SectionCard title="營收趨勢" subtitle="近 13 個月（25/05 ～ 26/05，單位：萬元）" fullHeight={false}>
              <AreaLineChart
                months={data.revenueTrend.months}
                data={data.revenueTrend.data}
                yAxisSuffix=" 萬"
                height={240}
              />
            </SectionCard>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function Accommodation() {
  const [tabIndex, setTabIndex] = useState(0)
  const sectionRefs = useRef({})

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue)
    sectionRefs.current = {}
  }

  const chips = tabIndex === 0 ? OVERVIEW_CHIPS : BRANCH_CHIPS

  return (
    <Box className="flex flex-col gap-3">
      {/* Page header */}
      <Paper sx={{ borderRadius: '8px' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography variant="h6">住宿管理</Typography>
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

        {/* Anchor chips */}
        <Box sx={{ px: 2 }}>
          <AnchorChips chips={chips} sectionRefs={sectionRefs} />
        </Box>
      </Paper>

      {/* Tab content */}
      {tabIndex === 0 && <OverviewTab sectionRefs={sectionRefs} />}
      {tabIndex > 0 && (
        <BranchTab
          key={BRANCHES[tabIndex - 1]}
          branchName={BRANCHES[tabIndex - 1]}
          sectionRefs={sectionRefs}
        />
      )}
    </Box>
  )
}

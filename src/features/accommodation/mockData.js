// 住宿頁 mock 資料
// 當月基準：2026/05，趨勢區間：2025/05 – 2026/05（近 13 個月）
//
// 三家住宿分院的核心數據與 src/features/overview/mockData.js 的 facilities 對齊
// （台北信義 / 高雄左營 / 新北板橋）；其餘細部欄位以這三家為基準衍生。

export const reportDate = '2026年5月14日 週四'

export const trendMonths = [
  '25/05',
  '25/06',
  '25/07',
  '25/08',
  '25/09',
  '25/10',
  '25/11',
  '25/12',
  '26/01',
  '26/02',
  '26/03',
  '26/04',
  '26/05',
]

export const yearMonths = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]

const COLOR_TAIPEI = '#0097A7'
const COLOR_KAOHSIUNG = '#00838F'
const COLOR_NEWTAIPEI = '#26A69A'
const WARNING_ACCENT = '#FF9800'

// ── 三家住宿分院核心數據（與首頁 facilities 對齊） ──────────
// 同時作為衍生資料的單一來源
export const BRANCH_INFO = [
  {
    short: '台北信義',
    full: '台北信義老人長照分院',
    color: COLOR_TAIPEI,
    beds: 240,
    cases: 222,
    newAdmissions: 5,
    reservations: 8,
    discharges: 4,
    ytdRevenue: 4080,
    monthRevenue: 838,
    momPct: 3.2,
    yoyPct: 8.4,
    collectionRate: 91.9,
    collected: 770,
    uncollected: 68,
    occupancyRate: 92.5,
    staffCost: 318,
    staffTotal: 86,
    fullTime: 72,
    partTime: 14,
    resignations: 4,
    turnoverRate: 4.7,
    status: 'good',
    alert: '無',
    alertTone: 'none',
  },
  {
    short: '高雄左營',
    full: '高雄左營長照分院',
    color: COLOR_KAOHSIUNG,
    beds: 180,
    cases: 168,
    newAdmissions: 3,
    reservations: 6,
    discharges: 2,
    ytdRevenue: 2950,
    monthRevenue: 612,
    momPct: 5.6,
    yoyPct: 11.2,
    collectionRate: 94.8,
    collected: 580,
    uncollected: 32,
    occupancyRate: 93.3,
    staffCost: 234,
    staffTotal: 64,
    fullTime: 54,
    partTime: 10,
    resignations: 2,
    turnoverRate: 3.9,
    status: 'good',
    alert: '無',
    alertTone: 'none',
  },
  {
    short: '新北板橋',
    full: '新北板橋長照分院',
    color: COLOR_NEWTAIPEI,
    beds: 160,
    cases: 142,
    newAdmissions: 4,
    reservations: 5,
    discharges: 3,
    ytdRevenue: 2540,
    monthRevenue: 526,
    momPct: -2.1,
    yoyPct: 4.6,
    collectionRate: 87.8,
    collected: 462,
    uncollected: 64,
    occupancyRate: 88.8,
    staffCost: 206,
    staffTotal: 56,
    fullTime: 47,
    partTime: 9,
    resignations: 3,
    turnoverRate: 5.5,
    status: 'warning',
    alert: '收款率 87.8%、需追蹤逾期應收',
    alertTone: 'warning',
  },
]

// ── 衍生工具 ──────────────────────────────────────────────
const sumBy = (key) => BRANCH_INFO.reduce((s, b) => s + b[key], 0)
const findBy = (short) => BRANCH_INFO.find((b) => b.short === short)

const totalBeds = sumBy('beds')
const totalCases = sumBy('cases')
const totalStaff = sumBy('staffTotal')
const totalFullTime = sumBy('fullTime')
const totalPartTime = sumBy('partTime')
const totalResignations = sumBy('resignations')
const totalMonthRevenue = sumBy('monthRevenue')
const totalYtdRevenue = sumBy('ytdRevenue')
const totalCollected = sumBy('collected')
const totalUncollected = sumBy('uncollected')
const totalReservations = sumBy('reservations')
const totalNewAdmissions = sumBy('newAdmissions')

// 加權平均（用於展示，依規模權重）
const weightedOccupancy = +(
  BRANCH_INFO.reduce((s, b) => s + b.occupancyRate * b.beds, 0) / totalBeds
).toFixed(1)
const weightedCollectionRate = +((totalCollected / totalMonthRevenue) * 100).toFixed(1)
const weightedTurnover = +(
  BRANCH_INFO.reduce((s, b) => s + b.turnoverRate * b.staffTotal, 0) / totalStaff
).toFixed(1)
const totalOccupiedBeds = BRANCH_INFO.reduce(
  (s, b) => s + Math.round(b.beds * (b.occupancyRate / 100)),
  0,
)
const totalVacantBeds = totalBeds - totalOccupiedBeds

// ── 路由 / 短名清單 ───────────────────────────────────────
export const BRANCHES = BRANCH_INFO.map((b) => b.short)

// ── 總覽 KPI（保留 4 欄；給 BranchTab 之外的場合使用）─────
export const overviewKpis = [
  {
    key: 'revenue',
    title: '月營收',
    value: `$${totalMonthRevenue.toLocaleString()}`,
    unit: '萬',
    delta: { dir: 'up', text: 'YoY +8.2%', isWarning: false },
  },
  {
    key: 'serviceTotal',
    title: '當月總服務人數',
    value: String(totalCases),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +8 人', isWarning: false },
  },
  {
    key: 'staffTotal',
    title: '當月員工人數',
    value: String(totalStaff),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
  {
    key: 'occupancy',
    title: '占床率',
    value: String(weightedOccupancy),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +0.5pp', isWarning: false },
  },
]

// ── 各機構占床率趨勢 ──────────────────────────────────────
export const occupancyTrend = {
  months: trendMonths,
  series: [
    {
      name: '整體',
      color: '#546E7A',
      dashed: true,
      data: [
        89.4, 89.1, 88.8, 88.5, 89.2, 89.6, 90.0, 90.3, 90.8, 91.2, 90.8, 91.4, 91.7,
      ],
    },
    {
      name: '台北信義',
      color: COLOR_TAIPEI,
      data: [
        90.5, 90.2, 90.8, 90.4, 91.2, 91.0, 91.5, 91.3, 91.8, 92.0, 91.7, 92.2, 92.5,
      ],
    },
    {
      name: '高雄左營',
      color: COLOR_KAOHSIUNG,
      data: [
        90.8, 90.5, 91.2, 91.0, 91.5, 91.8, 92.1, 92.3, 92.6, 92.9, 92.5, 93.0, 93.3,
      ],
    },
    {
      name: '新北板橋',
      color: COLOR_NEWTAIPEI,
      data: [
        85.2, 85.0, 85.6, 85.3, 86.1, 86.5, 87.0, 87.4, 87.8, 88.2, 87.9, 88.5, 88.8,
      ],
    },
  ],
}

// ── 三機構佔比（當月） ────────────────────────────────────
export const branchServiceShare = BRANCH_INFO.map((b) => ({
  name: b.short,
  value: b.cases,
  color: b.color,
}))

export const branchRevenueShare = BRANCH_INFO.map((b) => ({
  name: b.short,
  value: b.monthRevenue,
  color: b.color,
}))

// ── 各機構整體服務營收（含 13 個月趨勢） ──────────────────
export const revenueByBranch = {
  months: trendMonths,
  series: [
    {
      name: '台北信義',
      color: COLOR_TAIPEI,
      data: [725, 738, 720, 745, 738, 760, 752, 778, 760, 790, 780, 815, 838],
    },
    {
      name: '高雄左營',
      color: COLOR_KAOHSIUNG,
      data: [510, 522, 515, 530, 528, 548, 545, 565, 555, 580, 572, 595, 612],
    },
    {
      name: '新北板橋',
      color: COLOR_NEWTAIPEI,
      data: [462, 470, 458, 478, 472, 490, 485, 502, 495, 515, 510, 537, 526],
    },
  ],
  yoy: [5.2, 5.8, 5.5, 6.1, 5.9, 6.5, 6.3, 6.9, 6.5, 7.3, 7.0, 7.8, 8.2],
  yoyCurrent: 8.2,
}

// 集團合計營收 13 個月（用於 Overview 財務分區）
export const aggregateRevenueTrend = {
  months: trendMonths,
  series: [
    {
      name: '住宿合計',
      color: COLOR_TAIPEI,
      data: revenueByBranch.series[0].data.map((_, i) =>
        revenueByBranch.series.reduce((s, br) => s + br.data[i], 0),
      ),
    },
  ],
  yoy: revenueByBranch.yoy,
  yoyCurrent: revenueByBranch.yoyCurrent,
}

// ── 住宿機構排行（依本月營收） ───────────────────────────
export const branchRanking = [...BRANCH_INFO]
  .sort((a, b) => b.monthRevenue - a.monthRevenue)
  .map((b, i) => ({
    rank: i + 1,
    name: b.full,
    short: b.short,
    status: b.status,
    ytdRevenue: b.ytdRevenue,
    ytdYoy: b.yoyPct,
    monthRevenue: b.monthRevenue,
    monthYoy: b.yoyPct,
    monthMom: b.momPct,
    vacancyRate: +(100 - b.occupancyRate).toFixed(1),
    occupancyRate: b.occupancyRate,
    staffCost: b.staffCost,
    collectionRate: b.collectionRate,
    alert: b.alert,
    alertTone: b.alertTone,
  }))

// ── Overview 排行榜（給 RankingCard 用） ──────────────────
export const monthRevenueRanking = [...BRANCH_INFO]
  .sort((a, b) => b.monthRevenue - a.monthRevenue)
  .map((b, i) => ({
    rank: i + 1,
    id: b.short,
    name: b.full,
    subtitle: `立案數 ${b.beds}`,
    value: b.monthRevenue,
    unit: '萬',
  }))

export const occupancyRanking = [...BRANCH_INFO]
  .sort((a, b) => b.occupancyRate - a.occupancyRate)
  .map((b, i) => {
    const occupiedBeds = Math.round(b.beds * (b.occupancyRate / 100))
    return {
      rank: i + 1,
      id: b.short,
      name: b.full,
      subtitle: `空床 ${b.beds - occupiedBeds} 床`,
      value: b.occupancyRate,
      unit: '%',
    }
  })

// ── 重點摘要（自動推導） ──────────────────────────────────
function deriveHighlights() {
  const items = []
  // 1) 佔床率 < 90% 警示
  BRANCH_INFO.forEach((b) => {
    if (b.occupancyRate < 90) {
      items.push({
        facility: b.full,
        metric: `佔床率 ${b.occupancyRate}%`,
        hint: `較目標 95% 仍有缺口、空床 ${b.beds - Math.round(b.beds * (b.occupancyRate / 100))} 床需積極招收`,
        tone: 'warning',
      })
    }
  })
  // 2) 收款率 < 90% 警示
  BRANCH_INFO.forEach((b) => {
    if (b.collectionRate < 90) {
      items.push({
        facility: b.full,
        metric: `收款率 ${b.collectionRate}%`,
        hint: `逾期應收 $${b.uncollected} 萬，需追蹤催收`,
        tone: 'warning',
      })
    }
  })
  // 3) MoM 為負警示
  BRANCH_INFO.forEach((b) => {
    if (b.momPct < 0) {
      items.push({
        facility: b.full,
        metric: `月營收 MoM ${b.momPct}%`,
        hint: `本月營收較上月下滑 $${Math.abs((b.monthRevenue * b.momPct) / 100).toFixed(0)} 萬`,
        tone: 'warning',
      })
    }
  })
  // 4) YoY 最佳的機構（亮點）
  const bestYoy = [...BRANCH_INFO].sort((a, b) => b.yoyPct - a.yoyPct)[0]
  items.push({
    facility: bestYoy.full,
    metric: `月營收 YoY +${bestYoy.yoyPct}%`,
    hint: `集團最佳，本月達 $${bestYoy.monthRevenue} 萬`,
    tone: 'ok',
  })
  // 5) 佔床率最佳的機構（亮點）
  const bestOcc = [...BRANCH_INFO].sort((a, b) => b.occupancyRate - a.occupancyRate)[0]
  items.push({
    facility: bestOcc.full,
    metric: `佔床率 ${bestOcc.occupancyRate}%`,
    hint: `營運表現穩健、近 6 個月維持 9 成以上`,
    tone: 'ok',
  })
  // warning 優先排序、最多 3 條
  const warnings = items.filter((x) => x.tone === 'warning')
  const oks = items.filter((x) => x.tone === 'ok')
  return [...warnings, ...oks].slice(0, 3)
}

export const overviewHighlights = deriveHighlights()

// ── Overview 財務分區 ─────────────────────────────────────
export const overviewFinanceKpis = [
  {
    key: 'ytdRevenue',
    title: '年度累計營收',
    value: `$${totalYtdRevenue.toLocaleString()}`,
    unit: '萬',
    delta: { noIcon: true, text: '2026 年 1 至 5 月' },
  },
  {
    key: 'monthRevenue',
    title: '本月營收',
    value: `$${totalMonthRevenue.toLocaleString()}`,
    unit: '萬',
    delta: { dir: 'up', text: 'YoY +8.2%', isWarning: false },
  },
  {
    key: 'collectionRate',
    title: '收款率',
    value: String(weightedCollectionRate),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +1.4pp', isWarning: false },
  },
  {
    key: 'uncollected',
    title: '未收款',
    value: `$${totalUncollected}`,
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +$5 萬', isWarning: true },
  },
]

export const overviewCollectionDonut = {
  ratePct: weightedCollectionRate,
  data: [
    { name: '已收款', value: totalCollected, color: COLOR_TAIPEI },
    { name: '未收款', value: totalUncollected, color: '#CFD8DC' },
  ],
}

// 各機構財務比較表
export const financeComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  monthRevenue: b.monthRevenue,
  yoyPct: b.yoyPct,
  momPct: b.momPct,
  collectionRate: b.collectionRate,
}))

// ── Overview 營運分區 ─────────────────────────────────────
export const overviewOperationKpis = [
  {
    key: 'staffTotal',
    title: '立案人數',
    value: String(totalStaff),
    unit: '人',
    delta: null,
  },
  {
    key: 'cases',
    title: '住民人數',
    value: String(totalCases),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +6 人', isWarning: false },
  },
  {
    key: 'occupiedBeds',
    title: '佔床數',
    value: String(totalOccupiedBeds),
    unit: '床',
    delta: { dir: 'up', text: '較上個月 +2 床', isWarning: false },
  },
  {
    key: 'vacantBeds',
    title: '空床數',
    value: String(totalVacantBeds),
    unit: '床',
    delta: { dir: 'up', text: '較上個月 +4 床', isWarning: true },
  },
  {
    key: 'reservations',
    title: '本月預約入住',
    value: String(totalReservations),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +3 人', isWarning: false },
  },
  {
    key: 'newAdmissions',
    title: '本月新入住',
    value: String(totalNewAdmissions),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
]

// 集團住民異動彙總（13 個月）
export const overviewResidentMovement = {
  months: trendMonths,
  baselineResidents: 277, // 集團起始月住民數
  series: [
    {
      name: '新入住',
      color: COLOR_TAIPEI,
      data: [10, 13, 9, 14, 10, 13, 9, 17, 10, 13, 14, 9, 12],
    },
    {
      name: '退住',
      color: '#4DB6AC',
      data: [6, 8, 6, 10, 8, 6, 10, 8, 6, 9, 6, 10, 9],
    },
    {
      name: '住院',
      color: WARNING_ACCENT,
      data: [15, 14, 18, 12, 15, 14, 19, 15, 14, 18, 12, 15, 14],
    },
    {
      name: '請假',
      color: '#78909C',
      data: [23, 19, 26, 22, 18, 23, 19, 27, 22, 19, 23, 18, 22],
    },
  ],
}

// 各機構營運比較表
export const operationComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  staffTotal: b.staffTotal,
  cases: b.cases,
  occupancyRate: b.occupancyRate,
  vacantBeds: b.beds - Math.round(b.beds * (b.occupancyRate / 100)),
}))

// ── Overview 住民分析分區 ─────────────────────────────────
// 三機構聚合的服務類型 / 退住原因
const aggregateServiceTypes = [
  { name: '自費全日型養護', value: 161 }, // 71+53+37
  { name: '老人', value: 132 }, // 61+47+24
  { name: '低收公費安置', value: 83 }, // 38+28+17
  { name: '身障', value: 55 }, // 25+21+9
  { name: '喘息服務', value: 33 }, // 12+13+8
  { name: '身障托育養護', value: 19 }, // 11+0+8 (左營/板橋無)
  { name: '其他', value: 49 }, // 4+6+39
]

const aggregateDisability = [
  { name: '65歲以上非身障', value: 329, color: COLOR_TAIPEI }, // 139+102+88
  { name: '65歲以下非身障', value: 89, color: COLOR_KAOHSIUNG }, // 37+28+24
  { name: '65歲以上身障', value: 72, color: COLOR_NEWTAIPEI }, // 30+23+19
  { name: '65歲以下身障', value: 42, color: '#80CBC4' }, // 16+15+11
]

const aggregateDischargeReasons = [
  { name: '返家', value: 9 },
  { name: '轉院', value: 7 },
  { name: '死亡', value: 4 },
  { name: '在院死亡', value: 3 },
  { name: '其他', value: 4 },
  { name: '特殊', value: 2 },
]

const seniorAbove65 = aggregateDisability[0].value + aggregateDisability[2].value
const seniorBelow65 = aggregateDisability[1].value + aggregateDisability[3].value
const disabilityTotal = aggregateDisability[2].value + aggregateDisability[3].value
const disabilityRatio = +((disabilityTotal / totalCases) * 100).toFixed(1)

export const overviewResidentKpis = [
  {
    key: 'residents',
    title: '住民人數',
    value: String(totalCases),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +6 人', isWarning: false },
  },
  {
    key: 'disability',
    title: '身障人數',
    value: String(disabilityTotal),
    unit: '人',
    delta: { dir: 'flat', text: `身障比例 ${disabilityRatio}%`, isWarning: false },
  },
  {
    key: 'over65',
    title: '65 歲以上人數',
    value: String(seniorAbove65),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +4 人', isWarning: false },
  },
  {
    key: 'below65',
    title: '65 歲以下人數',
    value: String(seniorBelow65),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
]

export const overviewServiceTypes = aggregateServiceTypes
export const overviewDischargeReasons = aggregateDischargeReasons
export const overviewDisabilityShare = aggregateDisability

// 各機構住民比較表
export const residentComparison = BRANCH_INFO.map((b) => {
  // 從 branchData 對應的 disabilityRatio 取數
  const ratio = findBy(b.short)
  return {
    id: b.short,
    name: b.full,
    disability: ratio.short === '台北信義' ? 46 : ratio.short === '高雄左營' ? 38 : 30,
    over65: ratio.short === '台北信義' ? 169 : ratio.short === '高雄左營' ? 125 : 107,
    below65: ratio.short === '台北信義' ? 53 : ratio.short === '高雄左營' ? 43 : 35,
  }
})

// ── Overview 照護品質分區 ─────────────────────────────────
// KPI: 跌倒 / 約束 / 傷口 / 住院 / 意外事件
const qualityAggregate = {
  falls: 134, // 67+32+35
  restraints: 32, // 16+8+8
  wounds: 26, // 13+6+7 壓瘡
  hospitalizations: 136, // 68+33+35 非計畫性住院
  incidents: 172, // 86+41+45
}

export const overviewQualityKpis = [
  {
    key: 'falls',
    title: '跌倒',
    value: String(qualityAggregate.falls),
    unit: '件',
    delta: { text: '發生率 7.0%', threshold: '閥值 10%' },
  },
  {
    key: 'restraints',
    title: '約束',
    value: String(qualityAggregate.restraints),
    unit: '件',
    delta: { text: '發生率 1.7%', threshold: '閥值 5%' },
  },
  {
    key: 'wounds',
    title: '傷口',
    value: String(qualityAggregate.wounds),
    unit: '件',
    delta: { dir: 'down', text: '較上個月 -2 件', isWarning: false },
  },
  {
    key: 'hospitalizations',
    title: '住院',
    value: String(qualityAggregate.hospitalizations),
    unit: '件',
    delta: { dir: 'up', text: '較上個月 +5 件', isWarning: true },
  },
  {
    key: 'incidents',
    title: '意外事件',
    value: String(qualityAggregate.incidents),
    unit: '件',
    delta: { dir: 'up', text: '較上個月 +8 件', isWarning: true },
  },
]

// 集團品質監測（橫向條圖用）
export const overviewQualityMonitoring = [
  { name: '疼痛', value: 345 },
  { name: '感染', value: 199 },
  { name: '住院', value: 136 },
  { name: '跌倒', value: 134 },
  { name: '體重改變', value: 104 },
  { name: '約束', value: 32 },
  { name: '傷口（壓瘡）', value: 26 },
  { name: '鼻胃管移除', value: 20 },
  { name: '導尿管移除', value: 18 },
]

// 集團意外事件類型
export const overviewIncidentTypes = [
  { name: '跌倒', value: 78 },
  { name: '誤吸', value: 32 },
  { name: '走失', value: 18 },
  { name: '自傷', value: 14 },
  { name: '藥物異常', value: 12 },
  { name: '其他', value: 18 },
]

// 各機構品質比較表
export const qualityComparison = [
  {
    id: '台北信義',
    name: '台北信義老人長照分院',
    falls: 67,
    restraints: 16,
    wounds: 13,
    hospitalizations: 68,
    incidents: 86,
  },
  {
    id: '高雄左營',
    name: '高雄左營長照分院',
    falls: 32,
    restraints: 8,
    wounds: 6,
    hospitalizations: 33,
    incidents: 41,
  },
  {
    id: '新北板橋',
    name: '新北板橋長照分院',
    falls: 35,
    restraints: 8,
    wounds: 7,
    hospitalizations: 35,
    incidents: 45,
  },
]

// ── Overview 人力狀況分區 ─────────────────────────────────
export const overviewHrKpis = [
  {
    key: 'fullTime',
    title: '全職員工',
    value: String(totalFullTime),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
  },
  {
    key: 'partTime',
    title: '兼職員工',
    value: String(totalPartTime),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
  },
  {
    key: 'resignations',
    title: '離職人數',
    value: String(totalResignations),
    unit: '人',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
  {
    key: 'turnoverRate',
    title: '離職率',
    value: String(weightedTurnover),
    unit: '%',
    delta: { dir: 'down', text: '較上個月 -0.3pp', isWarning: false },
  },
]

// 在職人員職位統計
export const overviewPositionStats = [
  { name: '照服員', value: 92 },
  { name: '護理師', value: 38 },
  { name: '社工', value: 18 },
  { name: '營養師', value: 8 },
  { name: '物理治療師', value: 12 },
  { name: '職能治療師', value: 8 },
  { name: '行政', value: 18 },
  { name: '主管', value: 12 },
]

// 各機構人力比較表
export const hrComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  fullTime: b.fullTime,
  partTime: b.partTime,
  resignations: b.resignations,
  turnoverRate: b.turnoverRate,
}))

// ── 三機構詳細資料（BranchTab 使用） ──────────────────────
export const branchData = {
  台北信義: {
    operationKpis: [
      {
        key: 'service',
        title: '當月服務人數',
        value: '222',
        unit: '人',
        delta: { dir: 'up', text: '較上個月 +3 人', isWarning: false },
      },
      {
        key: 'newIn',
        title: '本月新入住',
        value: '5',
        unit: '人',
        delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
      },
      {
        key: 'newOut',
        title: '本月退住',
        value: '4',
        unit: '人',
        delta: { dir: 'down', text: '較上個月 -1 人', isWarning: false },
      },
      {
        key: 'occupancy',
        title: '占床率',
        value: '92.5',
        unit: '%',
        delta: { dir: 'up', text: '較上個月 +0.3pp', isWarning: false },
      },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 198,
      series: [
        {
          name: '新入住',
          color: COLOR_TAIPEI,
          data: [5, 6, 4, 7, 5, 6, 4, 8, 5, 6, 7, 4, 5],
        },
        { name: '退住', color: '#4DB6AC', data: [3, 4, 3, 5, 4, 3, 5, 4, 3, 4, 3, 5, 4] },
        {
          name: '住院',
          color: WARNING_ACCENT,
          data: [8, 7, 9, 6, 8, 7, 10, 8, 7, 9, 6, 8, 7],
        },
        {
          name: '請假',
          color: '#78909C',
          data: [12, 10, 13, 11, 9, 12, 10, 14, 11, 10, 12, 9, 11],
        },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 71 },
      { name: '老人', value: 61 },
      { name: '低收公費安置', value: 38 },
      { name: '身障', value: 25 },
      { name: '喘息服務', value: 12 },
      { name: '身障托育養護', value: 11 },
      { name: '其他', value: 4 },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 30 },
      { name: '1 ～ 2 年', value: 42 },
      { name: '2 ～ 3 年', value: 38 },
      { name: '3 ～ 5 年', value: 61 },
      { name: '5 年以上', value: 51 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 139, color: COLOR_TAIPEI },
      { name: '65歲以下非身障', value: 37, color: COLOR_KAOHSIUNG },
      { name: '65歲以上身障', value: 30, color: COLOR_NEWTAIPEI },
      { name: '65歲以下身障', value: 16, color: '#80CBC4' },
    ],
    qualityMonitoring: [
      { name: '跌倒', cases: 67, rate: 7.2 },
      { name: '約束', cases: 16, rate: 1.8 },
      { name: '感染', cases: 99, rate: 10.5 },
      { name: '非計畫性住院', cases: 68, rate: 7.4 },
      { name: '壓瘡', cases: 13, rate: 1.4 },
      { name: '非計畫性體重改變', cases: 52, rate: 5.6 },
      { name: '疼痛', cases: 172, rate: 18.4 },
      { name: '鼻胃管移除', cases: 10, rate: 1.1 },
      { name: '導尿管移除', cases: 9, rate: 1.0 },
    ],
    incidents: { total: 86, closed: 72, open: 14 },
    warehouse: {
      totalValue: {
        value: '$328',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +$12 萬', isWarning: true },
      },
      totalCost: {
        value: '$156',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +2.8%', isWarning: true },
      },
      itemCount: {
        value: '482',
        unit: '項',
        delta: { dir: 'up', text: '較上個月 +5 項', isWarning: false },
      },
      lowStockAlert: {
        value: '12',
        unit: '項',
        delta: { dir: 'up', text: '較上個月 +3 項', isWarning: true },
      },
      categoryBreakdown: [
        { name: '藥品', value: 108, color: COLOR_TAIPEI },
        { name: '耗材', value: 82, color: COLOR_KAOHSIUNG },
        { name: '營養品', value: 58, color: COLOR_NEWTAIPEI },
        { name: '醫材', value: 48, color: '#4DB6AC' },
        { name: '紙尿褲及衛材', value: 32, color: '#80CBC4' },
      ],
      costTrend: {
        months: trendMonths,
        data: [
          12.8, 13.5, 13.1, 14.2, 13.8, 14.6, 14.1, 15.2, 13.9, 14.8, 14.3, 15.6, 15.6,
        ],
      },
    },
    dischargeReasons: [
      { name: '轉院', value: 3 },
      { name: '死亡', value: 2 },
      { name: '返家', value: 4 },
      { name: '在院死亡', value: 1 },
      { name: '其他', value: 2 },
      { name: '特殊', value: 1 },
    ],
    financeKpis: [
      {
        key: 'revenue',
        title: '營收',
        value: '$838',
        unit: '萬',
        delta: { dir: 'up', text: 'YoY +8.4%', isWarning: false },
      },
      {
        key: 'collected',
        title: '已收款',
        value: '$770',
        unit: '萬',
        delta: { dir: 'flat', text: '回收率 91.9%', isWarning: false },
      },
      {
        key: 'overdue',
        title: '逾期應收',
        value: '$68',
        unit: '萬',
        delta: { dir: 'up', text: '逾期率 8.1%', isWarning: true },
      },
      {
        key: 'staffCost',
        title: '人事費用',
        value: '$318',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +2.4%', isWarning: false },
      },
      {
        key: 'costRatio',
        title: '人月費用比',
        value: '1.43',
        unit: '倍',
        delta: { dir: 'up', text: '較上個月 +0.03', isWarning: false },
      },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [725, 738, 720, 745, 738, 760, 752, 778, 760, 790, 780, 815, 838],
      yoy: [5.8, 6.4, 6.8, 7.2, 6.9, 7.6, 7.3, 8.0, 7.5, 8.2, 7.9, 8.6, 8.4],
      yoyCurrent: 8.4,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [298, 300, 302, 304, 306, 308, 310, 311, 312, 314, 315, 317, 318],
    },
  },

  高雄左營: {
    operationKpis: [
      {
        key: 'service',
        title: '當月服務人數',
        value: '168',
        unit: '人',
        delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
      },
      {
        key: 'newIn',
        title: '本月新入住',
        value: '3',
        unit: '人',
        delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
      },
      {
        key: 'newOut',
        title: '本月退住',
        value: '2',
        unit: '人',
        delta: { dir: 'down', text: '較上個月 -1 人', isWarning: false },
      },
      {
        key: 'occupancy',
        title: '占床率',
        value: '93.3',
        unit: '%',
        delta: { dir: 'up', text: '較上個月 +0.4pp', isWarning: false },
      },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 151,
      series: [
        {
          name: '新入住',
          color: COLOR_TAIPEI,
          data: [3, 4, 3, 4, 3, 4, 3, 5, 3, 4, 4, 3, 3],
        },
        { name: '退住', color: '#4DB6AC', data: [2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 3, 2] },
        {
          name: '住院',
          color: WARNING_ACCENT,
          data: [4, 4, 5, 3, 4, 4, 5, 4, 4, 5, 3, 4, 4],
        },
        { name: '請假', color: '#78909C', data: [6, 5, 7, 6, 5, 6, 5, 7, 6, 5, 6, 5, 6] },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 53 },
      { name: '老人', value: 47 },
      { name: '低收公費安置', value: 28 },
      { name: '身障', value: 21 },
      { name: '喘息服務', value: 13 },
      { name: '其他', value: 6 },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 21 },
      { name: '1 ～ 2 年', value: 30 },
      { name: '2 ～ 3 年', value: 28 },
      { name: '3 ～ 5 年', value: 47 },
      { name: '5 年以上', value: 42 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 102, color: COLOR_TAIPEI },
      { name: '65歲以下非身障', value: 28, color: COLOR_KAOHSIUNG },
      { name: '65歲以上身障', value: 23, color: COLOR_NEWTAIPEI },
      { name: '65歲以下身障', value: 15, color: '#80CBC4' },
    ],
    qualityMonitoring: [
      { name: '跌倒', cases: 32, rate: 6.5 },
      { name: '約束', cases: 8, rate: 1.6 },
      { name: '感染', cases: 48, rate: 9.7 },
      { name: '非計畫性住院', cases: 33, rate: 6.7 },
      { name: '壓瘡', cases: 6, rate: 1.2 },
      { name: '非計畫性體重改變', cases: 25, rate: 5.1 },
      { name: '疼痛', cases: 83, rate: 16.8 },
      { name: '鼻胃管移除', cases: 5, rate: 1.0 },
      { name: '導尿管移除', cases: 4, rate: 0.8 },
    ],
    incidents: { total: 41, closed: 32, open: 9 },
    warehouse: {
      totalValue: {
        value: '$172',
        unit: '萬',
        delta: { dir: 'down', text: '較上個月 -$4 萬', isWarning: false },
      },
      totalCost: {
        value: '$82',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +0.8%', isWarning: true },
      },
      itemCount: {
        value: '342',
        unit: '項',
        delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
      },
      lowStockAlert: {
        value: '8',
        unit: '項',
        delta: { dir: 'up', text: '較上個月 +2 項', isWarning: true },
      },
      categoryBreakdown: [
        { name: '藥品', value: 58, color: COLOR_TAIPEI },
        { name: '耗材', value: 42, color: COLOR_KAOHSIUNG },
        { name: '營養品', value: 30, color: COLOR_NEWTAIPEI },
        { name: '醫材', value: 26, color: '#4DB6AC' },
        { name: '紙尿褲及衛材', value: 16, color: '#80CBC4' },
      ],
      costTrend: {
        months: trendMonths,
        data: [6.5, 6.9, 6.7, 7.2, 7.0, 7.5, 7.2, 7.8, 7.1, 7.6, 7.3, 8.0, 8.2],
      },
    },
    dischargeReasons: [
      { name: '轉院', value: 2 },
      { name: '死亡', value: 1 },
      { name: '返家', value: 2 },
      { name: '在院死亡', value: 1 },
      { name: '其他', value: 1 },
      { name: '特殊', value: 1 },
    ],
    financeKpis: [
      {
        key: 'revenue',
        title: '營收',
        value: '$612',
        unit: '萬',
        delta: { dir: 'up', text: 'YoY +11.2%', isWarning: false },
      },
      {
        key: 'collected',
        title: '已收款',
        value: '$580',
        unit: '萬',
        delta: { dir: 'flat', text: '回收率 94.8%', isWarning: false },
      },
      {
        key: 'overdue',
        title: '逾期應收',
        value: '$32',
        unit: '萬',
        delta: { dir: 'down', text: '逾期率 5.2%', isWarning: false },
      },
      {
        key: 'staffCost',
        title: '人事費用',
        value: '$234',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +1.6%', isWarning: false },
      },
      {
        key: 'costRatio',
        title: '人月費用比',
        value: '1.39',
        unit: '倍',
        delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
      },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [510, 522, 515, 530, 528, 548, 545, 565, 555, 580, 572, 595, 612],
      yoy: [7.2, 7.8, 8.2, 8.6, 8.3, 9.1, 8.8, 9.6, 9.2, 10.0, 9.7, 10.6, 11.2],
      yoyCurrent: 11.2,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [218, 220, 221, 223, 224, 226, 227, 228, 230, 231, 232, 233, 234],
    },
  },

  新北板橋: {
    operationKpis: [
      {
        key: 'service',
        title: '當月服務人數',
        value: '142',
        unit: '人',
        delta: { dir: 'up', text: '較上個月 +4 人', isWarning: false },
      },
      {
        key: 'newIn',
        title: '本月新入住',
        value: '4',
        unit: '人',
        delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
      },
      {
        key: 'newOut',
        title: '本月退住',
        value: '3',
        unit: '人',
        delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
      },
      {
        key: 'occupancy',
        title: '占床率',
        value: '88.8',
        unit: '%',
        delta: { dir: 'up', text: '較上個月 +0.5pp', isWarning: false },
      },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 122,
      series: [
        {
          name: '新入住',
          color: COLOR_TAIPEI,
          data: [3, 4, 3, 4, 3, 4, 3, 5, 3, 4, 4, 3, 4],
        },
        { name: '退住', color: '#4DB6AC', data: [2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 3, 3] },
        {
          name: '住院',
          color: WARNING_ACCENT,
          data: [4, 4, 5, 3, 4, 4, 5, 4, 4, 5, 3, 4, 4],
        },
        { name: '請假', color: '#78909C', data: [6, 5, 7, 6, 5, 6, 5, 7, 6, 5, 6, 5, 6] },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 37 },
      { name: '老人', value: 24 },
      { name: '低收公費安置', value: 17 },
      { name: '身障', value: 9 },
      { name: '喘息服務', value: 8 },
      { name: '身障托育養護', value: 8 },
      { name: '其他', value: 39 },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 20 },
      { name: '1 ～ 2 年', value: 28 },
      { name: '2 ～ 3 年', value: 24 },
      { name: '3 ～ 5 年', value: 38 },
      { name: '5 年以上', value: 32 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 88, color: COLOR_TAIPEI },
      { name: '65歲以下非身障', value: 24, color: COLOR_KAOHSIUNG },
      { name: '65歲以上身障', value: 19, color: COLOR_NEWTAIPEI },
      { name: '65歲以下身障', value: 11, color: '#80CBC4' },
    ],
    qualityMonitoring: [
      { name: '跌倒', cases: 35, rate: 6.8 },
      { name: '約束', cases: 8, rate: 1.5 },
      { name: '感染', cases: 52, rate: 10.1 },
      { name: '非計畫性住院', cases: 35, rate: 6.8 },
      { name: '壓瘡', cases: 7, rate: 1.4 },
      { name: '非計畫性體重改變', cases: 27, rate: 5.3 },
      { name: '疼痛', cases: 90, rate: 17.5 },
      { name: '鼻胃管移除', cases: 5, rate: 1.0 },
      { name: '導尿管移除', cases: 5, rate: 1.0 },
    ],
    incidents: { total: 45, closed: 39, open: 6 },
    warehouse: {
      totalValue: {
        value: '$186',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +$6 萬', isWarning: true },
      },
      totalCost: {
        value: '$89',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +1.5%', isWarning: true },
      },
      itemCount: {
        value: '358',
        unit: '項',
        delta: { dir: 'up', text: '較上個月 +3 項', isWarning: false },
      },
      lowStockAlert: {
        value: '6',
        unit: '項',
        delta: { dir: 'down', text: '較上個月 -1 項', isWarning: false },
      },
      categoryBreakdown: [
        { name: '藥品', value: 62, color: COLOR_TAIPEI },
        { name: '耗材', value: 46, color: COLOR_KAOHSIUNG },
        { name: '營養品', value: 32, color: COLOR_NEWTAIPEI },
        { name: '醫材', value: 28, color: '#4DB6AC' },
        { name: '紙尿褲及衛材', value: 18, color: '#80CBC4' },
      ],
      costTrend: {
        months: trendMonths,
        data: [7.2, 7.6, 7.4, 7.9, 7.7, 8.2, 7.9, 8.5, 7.8, 8.3, 8.0, 8.7, 8.9],
      },
    },
    dischargeReasons: [
      { name: '轉院', value: 2 },
      { name: '死亡', value: 1 },
      { name: '返家', value: 3 },
      { name: '在院死亡', value: 1 },
      { name: '其他', value: 1 },
      { name: '特殊', value: 0 },
    ],
    financeKpis: [
      {
        key: 'revenue',
        title: '營收',
        value: '$526',
        unit: '萬',
        delta: { dir: 'up', text: 'YoY +4.6%', isWarning: false },
      },
      {
        key: 'collected',
        title: '已收款',
        value: '$462',
        unit: '萬',
        delta: { dir: 'flat', text: '回收率 87.8%', isWarning: false },
      },
      {
        key: 'overdue',
        title: '逾期應收',
        value: '$64',
        unit: '萬',
        delta: { dir: 'up', text: '逾期率 12.2%', isWarning: true },
      },
      {
        key: 'staffCost',
        title: '人事費用',
        value: '$206',
        unit: '萬',
        delta: { dir: 'up', text: '較上個月 +1.4%', isWarning: false },
      },
      {
        key: 'costRatio',
        title: '人月費用比',
        value: '1.45',
        unit: '倍',
        delta: { dir: 'up', text: '較上個月 +0.02', isWarning: false },
      },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [462, 470, 458, 478, 472, 490, 485, 502, 495, 515, 510, 537, 526],
      yoy: [3.2, 3.5, 3.4, 3.8, 3.6, 4.0, 3.9, 4.2, 4.0, 4.5, 4.3, 4.8, 4.6],
      yoyCurrent: 4.6,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [195, 196, 197, 198, 199, 201, 202, 203, 204, 204, 205, 206, 206],
    },
  },
}

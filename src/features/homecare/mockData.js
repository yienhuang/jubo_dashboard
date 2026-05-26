// 居服頁 mock 資料
// 當月基準：2026/05，趨勢區間：2025/05 – 2026/05（近 13 個月）
// 兩家居服站：新北板橋 / 台南安康

export const trendMonths = [
  '25/05', '25/06', '25/07', '25/08', '25/09', '25/10',
  '25/11', '25/12', '26/01', '26/02', '26/03', '26/04', '26/05',
]

const COLOR_BANQIAO = '#0097A7'
const COLOR_ANKANG = '#4DB6AC'

// ── 兩家居服站核心數據 ────────────────────────────────────
export const BRANCH_INFO = [
  {
    short: '新北板橋',
    full: '新北板橋居服站',
    color: COLOR_BANQIAO,
    licensed: 60,
    cases: 90,
    monthlyServiceCount: 49,
    newCases: 3,
    suspended: 7,
    discharged: 1,
    ytdRevenue: 892,
    monthRevenue: 192,
    momPct: 3.2,
    yoyPct: 9.2,
    collectionRate: 94.1,
    collected: 181,
    uncollected: 11,
    subsidyQuota: 209,
    actualServiceCount: 192,
    subsidyUsageRate: 91.7,
    lowIncomeCount: 36,
    regularCount: 54,
    staffTotal: 28,
    careWorkers: 22,
    fullTime: 20,
    partTime: 8,
    resignations: 1,
    turnoverRate: 3.6,
    totalIncidents: 3,
    falls: 1,
    abnormalEvents: 2,
    complaints: 0,
    closedCases: 3,
    status: 'good',
    alert: '無',
    alertTone: 'none',
  },
  {
    short: '台南安康',
    full: '台南安康居服站',
    color: COLOR_ANKANG,
    licensed: 30,
    cases: 69,
    monthlyServiceCount: 30,
    newCases: 0,
    suspended: 5,
    discharged: 1,
    ytdRevenue: 745,
    monthRevenue: 155,
    momPct: -2.1,
    yoyPct: 7.3,
    collectionRate: 88.7,
    collected: 137,
    uncollected: 18,
    subsidyQuota: 179,
    actualServiceCount: 155,
    subsidyUsageRate: 86.7,
    lowIncomeCount: 23,
    regularCount: 46,
    staffTotal: 22,
    careWorkers: 17,
    fullTime: 16,
    partTime: 6,
    resignations: 2,
    turnoverRate: 9.1,
    totalIncidents: 4,
    falls: 2,
    abnormalEvents: 2,
    complaints: 1,
    closedCases: 3,
    status: 'warning',
    alert: '收款率 88.7%，需積極催收',
    alertTone: 'warning',
  },
]

// ── 衍生工具 ──────────────────────────────────────────────
const sumBy = (key) => BRANCH_INFO.reduce((s, b) => s + b[key], 0)

const totalLicensed = sumBy('licensed')
const totalCases = sumBy('cases')
const totalMonthlyServiceCount = sumBy('monthlyServiceCount')
const totalNewCases = sumBy('newCases')
const totalSuspended = sumBy('suspended')
const totalDischarged = sumBy('discharged')
const totalMonthRevenue = sumBy('monthRevenue')
const totalYtdRevenue = sumBy('ytdRevenue')
const totalCollected = sumBy('collected')
const totalUncollected = sumBy('uncollected')
const totalStaffTotal = sumBy('staffTotal')
const totalCareWorkers = sumBy('careWorkers')
const totalResignations = sumBy('resignations')
const totalSubsidyQuota = sumBy('subsidyQuota')
const totalActualServiceCount = sumBy('actualServiceCount')
const totalLowIncomeCount = sumBy('lowIncomeCount')
const totalIncidents = sumBy('totalIncidents')
const totalFalls = sumBy('falls')
const totalAbnormalEvents = sumBy('abnormalEvents')
const totalComplaints = sumBy('complaints')
const totalClosedCases = sumBy('closedCases')

const weightedCollectionRate = +((totalCollected / totalMonthRevenue) * 100).toFixed(1)
const weightedTurnover = +((totalResignations / totalStaffTotal) * 100).toFixed(1)
const weightedSubsidyUsage = +((totalActualServiceCount / totalSubsidyQuota) * 100).toFixed(1)
const lowIncomePct = +((totalLowIncomeCount / totalCases) * 100).toFixed(1)
const closedCaseRate = +((totalClosedCases / totalIncidents) * 100).toFixed(1)

export const BRANCHES = BRANCH_INFO.map((b) => b.short)

// ── 各機構排行（依本月營收 / 收案數） ─────────────────────
export const monthRevenueRanking = [...BRANCH_INFO]
  .sort((a, b) => b.monthRevenue - a.monthRevenue)
  .map((b, i) => ({
    rank: i + 1,
    id: b.short,
    name: b.full,
    subtitle: `立案 ${b.licensed} 人`,
    value: b.monthRevenue,
    unit: '萬',
  }))

export const caseCountRanking = [...BRANCH_INFO]
  .sort((a, b) => b.cases - a.cases)
  .map((b, i) => ({
    rank: i + 1,
    id: b.short,
    name: b.full,
    subtitle: `收案數 ${b.cases} 人`,
    value: b.cases,
    unit: '人',
  }))

// ── 重點摘要（自動推導） ──────────────────────────────────
function deriveHighlights() {
  const items = []
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
  BRANCH_INFO.forEach((b) => {
    if (b.momPct < 0) {
      items.push({
        facility: b.full,
        metric: `月營收 MoM ${b.momPct}%`,
        hint: `本月較上月下滑 $${Math.abs(Math.round((b.monthRevenue * b.momPct) / 100))} 萬`,
        tone: 'warning',
      })
    }
  })
  const bestYoy = [...BRANCH_INFO].sort((a, b) => b.yoyPct - a.yoyPct)[0]
  items.push({
    facility: bestYoy.full,
    metric: `月營收 YoY +${bestYoy.yoyPct}%`,
    hint: `集團最佳，本月達 $${bestYoy.monthRevenue} 萬`,
    tone: 'ok',
  })
  const bestCases = [...BRANCH_INFO].sort((a, b) => b.cases - a.cases)[0]
  items.push({
    facility: bestCases.full,
    metric: `收案數 ${bestCases.cases} 人`,
    hint: `收案量最高，服務規模穩健`,
    tone: 'ok',
  })
  const warnings = items.filter((x) => x.tone === 'warning')
  const oks = items.filter((x) => x.tone === 'ok')
  return [...warnings, ...oks].slice(0, 3)
}

export const overviewHighlights = deriveHighlights()

// ── 財務分區 ──────────────────────────────────────────────
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
    delta: { dir: 'up', text: 'YoY +8.5%', isWarning: false },
  },
  {
    key: 'collectionRate',
    title: '收款率',
    value: String(weightedCollectionRate),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +0.9%', isWarning: false },
  },
  {
    key: 'uncollected',
    title: '未收款',
    value: `$${totalUncollected}`,
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +$4 萬', isWarning: true },
  },
]

export const overviewCollectionDonut = {
  ratePct: weightedCollectionRate,
  data: [
    { name: '已收款', value: totalCollected, color: COLOR_BANQIAO },
    { name: '未收款', value: totalUncollected, color: '#CFD8DC' },
  ],
}

export const aggregateRevenueTrend = {
  months: trendMonths,
  series: [
    {
      name: '居服合計',
      color: COLOR_BANQIAO,
      data: [305, 312, 308, 316, 314, 322, 320, 328, 326, 335, 333, 340, 347],
    },
  ],
  yoy: [5.0, 5.6, 5.3, 6.0, 5.8, 6.4, 6.1, 6.9, 6.5, 7.2, 6.9, 7.6, 8.5],
  yoyCurrent: 8.5,
}

export const financeComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  monthRevenue: b.monthRevenue,
  yoyPct: b.yoyPct,
  momPct: b.momPct,
  collectionRate: b.collectionRate,
}))

// ── 營運分區 ──────────────────────────────────────────────
export const overviewOperationKpis = [
  {
    key: 'licensed',
    title: '立案人數',
    value: String(totalLicensed),
    unit: '人',
    delta: null,
  },
  {
    key: 'cases',
    title: '總收案數',
    value: String(totalCases),
    unit: '人',
    delta: { dir: 'up', text: 'YoY +9.2%', isWarning: false },
  },
  {
    key: 'monthlyServiceCount',
    title: '當月服務人數',
    value: String(totalMonthlyServiceCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +3 人', isWarning: false },
  },
  {
    key: 'newCases',
    title: '新個案',
    value: String(totalNewCases),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
  },
  {
    key: 'suspended',
    title: '暫停服務',
    value: String(totalSuspended),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: true },
  },
  {
    key: 'discharged',
    title: '結案',
    value: String(totalDischarged),
    unit: '人',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
]

// 總收案數趨勢（13 個月）
export const casesTrend = {
  months: trendMonths,
  series: [
    {
      name: '整體',
      color: '#546E7A',
      dashed: true,
      data: [142, 144, 146, 147, 149, 150, 152, 153, 154, 156, 157, 158, 159],
    },
    {
      name: '新北板橋',
      color: COLOR_BANQIAO,
      data: [80, 81, 83, 83, 84, 85, 86, 87, 87, 88, 89, 89, 90],
    },
    {
      name: '台南安康',
      color: COLOR_ANKANG,
      data: [62, 63, 63, 64, 65, 65, 66, 66, 67, 68, 68, 69, 69],
    },
  ],
}

// 新個案趨勢（13 個月，兩機構堆疊）
export const newCasesTrend = {
  months: trendMonths,
  series: [
    {
      name: '新北板橋',
      color: COLOR_BANQIAO,
      data: [4, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3],
    },
    {
      name: '台南安康',
      color: COLOR_ANKANG,
      data: [2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 0],
    },
  ],
}

export const operationComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  licensed: b.licensed,
  cases: b.cases,
  monthlyServiceCount: b.monthlyServiceCount,
  newCases: b.newCases,
  suspended: b.suspended,
  discharged: b.discharged,
}))

// ── 核銷分析分區 ──────────────────────────────────────────
const totalGrowthSpace = totalSubsidyQuota - totalActualServiceCount

export const overviewReimbursementKpis = [
  {
    key: 'subsidyQuota',
    title: '核定補助額度',
    value: totalSubsidyQuota.toLocaleString(),
    unit: '萬',
    delta: null,
  },
  {
    key: 'actualServiceCount',
    title: '實際服務金額',
    value: totalActualServiceCount.toLocaleString(),
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +5 萬', isWarning: false },
  },
  {
    key: 'subsidyUsageRate',
    title: '補助使用率',
    value: String(weightedSubsidyUsage),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +0.5%', isWarning: false },
  },
  {
    key: 'growthSpace',
    title: '成長空間',
    value: totalGrowthSpace.toLocaleString(),
    unit: '萬',
    delta: { noIcon: true, text: `尚有 ${(100 - weightedSubsidyUsage).toFixed(1)}% 額度可利用` },
  },
]

// 補助使用率趨勢（13 個月）
export const subsidyUsageTrend = {
  months: trendMonths,
  series: [
    {
      name: '整體',
      color: '#546E7A',
      dashed: true,
      data: [85.0, 84.5, 85.8, 86.5, 86.0, 87.2, 87.6, 88.0, 87.5, 88.5, 88.0, 88.8, 89.5],
    },
    {
      name: '新北板橋',
      color: COLOR_BANQIAO,
      data: [88.0, 87.5, 89.0, 90.0, 89.5, 90.5, 91.0, 91.5, 91.0, 92.0, 91.5, 91.8, 91.7],
    },
    {
      name: '台南安康',
      color: COLOR_ANKANG,
      data: [81.0, 80.5, 82.0, 83.0, 82.5, 83.5, 84.0, 84.5, 84.0, 85.0, 84.5, 85.0, 86.7],
    },
  ],
}

// 碼別營收排行（前3名）
export const codeRevenueRanking = [
  { name: 'BA01 身體照顧', value: 180 },
  { name: 'BA02 日常生活協助', value: 95 },
  { name: 'BA03 家事服務', value: 52 },
]

// 核銷統計趨勢（政府補助 / 自付 / 自費，13 個月）
export const reimbursementBreakdownTrend = {
  months: trendMonths,
  series: [
    {
      name: '政府補助',
      color: COLOR_BANQIAO,
      data: [155, 159, 156, 161, 160, 164, 163, 167, 166, 171, 170, 174, 178],
    },
    {
      name: '自付',
      color: '#80CBC4',
      data: [82, 84, 83, 85, 84, 87, 86, 88, 87, 90, 89, 91, 94],
    },
    {
      name: '自費',
      color: '#CFD8DC',
      data: [68, 69, 69, 70, 70, 71, 71, 73, 73, 74, 74, 75, 75],
    },
  ],
}

export const reimbursementComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  subsidyQuota: b.subsidyQuota,
  actualServiceCount: b.actualServiceCount,
  subsidyUsageRate: b.subsidyUsageRate,
  growthSpace: b.subsidyQuota - b.actualServiceCount,
}))

// ── 個案分析分區 ──────────────────────────────────────────
export const overviewCaseKpis = [
  {
    key: 'cases',
    title: '總收案數',
    value: String(totalCases),
    unit: '人',
    delta: { dir: 'up', text: 'YoY +9.2%', isWarning: false },
  },
  {
    key: 'lowIncomeCount',
    title: '低收/中低收人數',
    value: String(totalLowIncomeCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
  {
    key: 'regularCount',
    title: '一般身份人數',
    value: String(totalCases - totalLowIncomeCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +3 人', isWarning: false },
  },
  {
    key: 'lowIncomePct',
    title: '低收/中低收比例',
    value: String(lowIncomePct),
    unit: '%',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
]

// 有排班個案福利身份別趨勢（13 個月）
export const welfareTrend = {
  months: trendMonths,
  series: [
    {
      name: '低收',
      color: '#005F64',
      data: [10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15],
    },
    {
      name: '中低收',
      color: COLOR_BANQIAO,
      data: [28, 28, 29, 29, 30, 30, 31, 31, 32, 32, 33, 33, 44],
    },
    {
      name: '一般',
      color: '#B2DFDB',
      data: [104, 106, 106, 107, 108, 108, 109, 109, 109, 111, 110, 111, 100],
    },
  ],
}

// 當月有排班個案 CMS 等級
export const cmsLevelDonut = [
  { name: 'CMS 2', value: 12, color: '#B2DFDB' },
  { name: 'CMS 3', value: 28, color: '#4DB6AC' },
  { name: 'CMS 4', value: 45, color: COLOR_BANQIAO },
  { name: 'CMS 5', value: 38, color: COLOR_ANKANG },
  { name: 'CMS 6', value: 22, color: '#005F64' },
  { name: 'CMS 7', value: 10, color: '#37474F' },
  { name: 'CMS 8', value: 4, color: '#90A4AE' },
]

export const caseComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  cases: b.cases,
  lowIncomeCount: b.lowIncomeCount,
  regularCount: b.regularCount,
  lowIncomePct: +((b.lowIncomeCount / b.cases) * 100).toFixed(1),
}))

// ── 照護品質分區 ──────────────────────────────────────────
export const overviewQualityKpis = [
  {
    key: 'abnormalEvents',
    title: '異常事件數',
    value: String(totalAbnormalEvents),
    unit: '件',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
  {
    key: 'complaints',
    title: '申訴件數',
    value: String(totalComplaints),
    unit: '件',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: totalComplaints > 0 },
  },
  {
    key: 'closedCaseRate',
    title: '結案率',
    value: String(closedCaseRate),
    unit: '%',
    delta: { dir: 'flat', text: `已結案 ${totalClosedCases} 件`, isWarning: false },
  },
]

export const qualityComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  abnormalEvents: b.abnormalEvents,
  complaints: b.complaints,
  closedCaseRate: +((b.closedCases / b.totalIncidents) * 100).toFixed(1),
}))

// ── 人力狀況分區 ──────────────────────────────────────────
export const overviewHrKpis = [
  {
    key: 'staffTotal',
    title: '員工總數',
    value: String(totalStaffTotal),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
  },
  {
    key: 'careWorkers',
    title: '照服員人數',
    value: String(totalCareWorkers),
    unit: '人',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
  {
    key: 'resignations',
    title: '當月照服員離職人數',
    value: String(totalResignations),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: true },
  },
  {
    key: 'turnoverRate',
    title: '離職率',
    value: String(weightedTurnover),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +0.4%', isWarning: weightedTurnover > 10 },
  },
]

export const overviewPositionStats = [
  { name: '照服員', value: 39 },
  { name: '護理師', value: 3 },
  { name: '社工', value: 3 },
  { name: '督導', value: 2 },
  { name: '行政', value: 3 },
]

export const hrComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  staffTotal: b.staffTotal,
  careWorkers: b.careWorkers,
  resignations: b.resignations,
  turnoverRate: b.turnoverRate,
}))

// ── 各機構詳細資料（BranchTab 使用） ──────────────────────
const branchOverrides = {
  新北板橋: {
    revenueTrend: {
      data: [165, 169, 167, 171, 170, 174, 173, 178, 177, 182, 181, 186, 192],
      yoy: [6.5, 7.0, 7.2, 7.8, 7.5, 8.1, 7.9, 8.5, 8.2, 8.9, 8.6, 9.0, 9.2],
      yoyCurrent: 9.2,
    },
    reimbursementBreakdownTrend: {
      series: [
        {
          name: '政府補助',
          color: COLOR_BANQIAO,
          data: [84, 86, 85, 87, 87, 89, 88, 91, 90, 93, 92, 95, 97],
        },
        {
          name: '自付',
          color: '#80CBC4',
          data: [46, 47, 46, 48, 47, 49, 49, 50, 50, 52, 51, 53, 54],
        },
        {
          name: '自費',
          color: '#CFD8DC',
          data: [35, 36, 36, 36, 36, 36, 36, 37, 37, 37, 38, 38, 41],
        },
      ],
    },
    welfareTrend: {
      series: [
        { name: '低收', color: '#005F64', data: [6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9] },
        { name: '中低收', color: COLOR_BANQIAO, data: [16, 16, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 27] },
        { name: '一般', color: '#B2DFDB', data: [58, 59, 60, 59, 59, 60, 61, 60, 60, 60, 60, 60, 54] },
      ],
    },
    cmsLevelDonut: [
      { name: 'CMS 2', value: 7, color: '#B2DFDB' },
      { name: 'CMS 3', value: 16, color: '#4DB6AC' },
      { name: 'CMS 4', value: 26, color: COLOR_BANQIAO },
      { name: 'CMS 5', value: 22, color: COLOR_ANKANG },
      { name: 'CMS 6', value: 13, color: '#005F64' },
      { name: 'CMS 7', value: 5, color: '#37474F' },
      { name: 'CMS 8', value: 1, color: '#90A4AE' },
    ],
    positionStats: [
      { name: '照服員', value: 22 },
      { name: '護理師', value: 2 },
      { name: '社工', value: 2 },
      { name: '督導', value: 1 },
      { name: '行政', value: 1 },
    ],
    codeRevenueRanking: [
      { name: 'BA01 身體照顧', value: 104 },
      { name: 'BA02 日常生活協助', value: 56 },
      { name: 'BA03 家事服務', value: 32 },
    ],
  },

  台南安康: {
    revenueTrend: {
      data: [140, 143, 141, 145, 144, 148, 147, 150, 149, 153, 152, 154, 155],
      yoy: [3.5, 4.0, 3.8, 4.5, 4.2, 4.9, 4.6, 5.3, 5.0, 5.7, 5.4, 5.9, 7.3],
      yoyCurrent: 7.3,
    },
    reimbursementBreakdownTrend: {
      series: [
        {
          name: '政府補助',
          color: COLOR_BANQIAO,
          data: [71, 73, 71, 74, 73, 75, 75, 76, 76, 78, 78, 79, 81],
        },
        {
          name: '自付',
          color: '#80CBC4',
          data: [36, 37, 37, 37, 37, 38, 37, 38, 37, 38, 38, 38, 40],
        },
        {
          name: '自費',
          color: '#CFD8DC',
          data: [33, 33, 33, 34, 34, 35, 35, 36, 36, 37, 36, 37, 34],
        },
      ],
    },
    welfareTrend: {
      series: [
        { name: '低收', color: '#005F64', data: [4, 4, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6] },
        { name: '中低收', color: COLOR_BANQIAO, data: [12, 12, 12, 12, 12, 12, 13, 12, 13, 12, 13, 13, 17] },
        { name: '一般', color: '#B2DFDB', data: [46, 47, 46, 48, 49, 48, 48, 49, 49, 51, 50, 51, 46] },
      ],
    },
    cmsLevelDonut: [
      { name: 'CMS 2', value: 5, color: '#B2DFDB' },
      { name: 'CMS 3', value: 12, color: '#4DB6AC' },
      { name: 'CMS 4', value: 19, color: COLOR_ANKANG },
      { name: 'CMS 5', value: 16, color: COLOR_BANQIAO },
      { name: 'CMS 6', value: 9, color: '#005F64' },
      { name: 'CMS 7', value: 5, color: '#37474F' },
      { name: 'CMS 8', value: 3, color: '#90A4AE' },
    ],
    positionStats: [
      { name: '照服員', value: 17 },
      { name: '護理師', value: 1 },
      { name: '社工', value: 1 },
      { name: '督導', value: 1 },
      { name: '行政', value: 2 },
    ],
    codeRevenueRanking: [
      { name: 'BA01 身體照顧', value: 76 },
      { name: 'BA02 日常生活協助', value: 39 },
      { name: 'BA03 家事服務', value: 20 },
    ],
  },
}

// ── KPI 工廠函式（BranchTab 使用） ────────────────────────
function makeFinanceKpis(b) {
  const monthDelta = Math.max(1, Math.round(b.uncollected * 0.05))
  return [
    {
      key: 'ytdRevenue',
      title: '年度累計營收',
      value: `$${b.ytdRevenue.toLocaleString()}`,
      unit: '萬',
      delta: { noIcon: true, text: '2026 年 1 至 5 月' },
    },
    {
      key: 'monthRevenue',
      title: '本月營收',
      value: `$${b.monthRevenue.toLocaleString()}`,
      unit: '萬',
      delta: {
        dir: b.yoyPct >= 0 ? 'up' : 'down',
        text: `YoY ${b.yoyPct >= 0 ? '+' : ''}${b.yoyPct}%`,
        isWarning: false,
      },
    },
    {
      key: 'collectionRate',
      title: '收款率',
      value: String(b.collectionRate),
      unit: '%',
      delta: {
        dir: 'up',
        text: '較上個月 +0.8%',
        isWarning: false,
      },
    },
    {
      key: 'uncollected',
      title: '未收款',
      value: `$${b.uncollected}`,
      unit: '萬',
      delta: {
        dir: 'up',
        text: `較上個月 +$${monthDelta} 萬`,
        isWarning: false,
      },
    },
  ]
}

function makeOperationKpis(b) {
  return [
    {
      key: 'licensed',
      title: '立案人數',
      value: String(b.licensed),
      unit: '人',
      delta: null,
    },
    {
      key: 'cases',
      title: '總收案數',
      value: String(b.cases),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
    },
    {
      key: 'monthlyServiceCount',
      title: '當月服務個案',
      value: String(b.monthlyServiceCount),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
    },
    {
      key: 'newCases',
      title: '新個案',
      value: String(b.newCases),
      unit: '人',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
    {
      key: 'suspended',
      title: '暫停服務',
      value: String(b.suspended),
      unit: '人',
      delta: {
        dir: b.suspended > 1 ? 'up' : 'flat',
        text: b.suspended > 1 ? '較上個月 +1 人' : '較上個月 持平',
        isWarning: b.suspended > 5,
      },
    },
    {
      key: 'discharged',
      title: '結案',
      value: String(b.discharged),
      unit: '人',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
  ]
}

function makeReimbursementKpis(b) {
  const growthSpace = b.subsidyQuota - b.actualServiceCount
  return [
    {
      key: 'subsidyQuota',
      title: '核定補助額度',
      value: b.subsidyQuota.toLocaleString(),
      unit: '萬',
      delta: null,
    },
    {
      key: 'actualServiceCount',
      title: '實際服務金額',
      value: b.actualServiceCount.toLocaleString(),
      unit: '萬',
      delta: { dir: 'up', text: '較上個月 +4 萬', isWarning: false },
    },
    {
      key: 'subsidyUsageRate',
      title: '補助使用率',
      value: String(b.subsidyUsageRate),
      unit: '%',
      delta: {
        dir: 'up',
        text: '較上個月 +0.5%',
        isWarning: false,
      },
    },
    {
      key: 'growthSpace',
      title: '成長空間',
      value: growthSpace.toLocaleString(),
      unit: '萬',
      delta: {
        noIcon: true,
        text: `尚有 ${(100 - b.subsidyUsageRate).toFixed(1)}% 額度可利用`,
      },
    },
  ]
}

function makeCaseKpis(b) {
  const pct = +((b.lowIncomeCount / b.cases) * 100).toFixed(1)
  return [
    {
      key: 'cases',
      title: '總收案數',
      value: String(b.cases),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
    },
    {
      key: 'lowIncomeCount',
      title: '低收/中低收人數',
      value: String(b.lowIncomeCount),
      unit: '人',
      delta: { dir: 'flat', text: `比例 ${pct}%`, isWarning: false },
    },
    {
      key: 'regularCount',
      title: '一般身份人數',
      value: String(b.regularCount),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
    },
    {
      key: 'lowIncomePct',
      title: '低收/中低收比例',
      value: String(pct),
      unit: '%',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
  ]
}

function makeQualityKpis(b) {
  const closureRate = +((b.closedCases / b.totalIncidents) * 100).toFixed(1)
  return [
    {
      key: 'abnormalEvents',
      title: '異常事件數',
      value: String(b.abnormalEvents),
      unit: '件',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
    {
      key: 'complaints',
      title: '申訴件數',
      value: String(b.complaints),
      unit: '件',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: b.complaints > 0 },
    },
    {
      key: 'closedCaseRate',
      title: '結案率',
      value: String(closureRate),
      unit: '%',
      delta: { dir: 'flat', text: `已結案 ${b.closedCases} 件`, isWarning: false },
    },
  ]
}

function makeHrKpis(b) {
  return [
    {
      key: 'staffTotal',
      title: '員工總數',
      value: String(b.staffTotal),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
    },
    {
      key: 'careWorkers',
      title: '照服員人數',
      value: String(b.careWorkers),
      unit: '人',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
    {
      key: 'resignations',
      title: '當月照服員離職人數',
      value: String(b.resignations),
      unit: '人',
      delta: {
        dir: b.resignations > 1 ? 'up' : 'flat',
        text: b.resignations > 1 ? '較上個月 +1 人' : '較上個月 持平',
        isWarning: b.resignations > 1,
      },
    },
    {
      key: 'turnoverRate',
      title: '離職率',
      value: String(b.turnoverRate),
      unit: '%',
      delta: {
        dir: b.turnoverRate > 10 ? 'up' : 'flat',
        text: b.turnoverRate > 10 ? '較上個月 +2.1%' : '較上個月 持平',
        isWarning: b.turnoverRate > 10,
      },
    },
  ]
}

function makeCollectionDonut(b) {
  return {
    ratePct: b.collectionRate,
    data: [
      { name: '已收款', value: b.collected, color: COLOR_BANQIAO },
      { name: '未收款', value: b.uncollected, color: '#CFD8DC' },
    ],
  }
}

export const branchData = Object.fromEntries(
  BRANCH_INFO.map((b) => {
    const ov = branchOverrides[b.short]
    return [
      b.short,
      {
        financeKpis: makeFinanceKpis(b),
        operationKpis: makeOperationKpis(b),
        reimbursementKpis: makeReimbursementKpis(b),
        caseKpis: makeCaseKpis(b),
        qualityKpis: makeQualityKpis(b),
        hrKpis: makeHrKpis(b),
        collectionDonut: makeCollectionDonut(b),
        revenueTrend: { months: trendMonths, ...ov.revenueTrend },
        reimbursementBreakdownTrend: { months: trendMonths, ...ov.reimbursementBreakdownTrend },
        welfareTrend: { months: trendMonths, ...ov.welfareTrend },
        cmsLevelDonut: ov.cmsLevelDonut,
        positionStats: ov.positionStats,
        codeRevenueRanking: ov.codeRevenueRanking,
      },
    ]
  })
)

// 日照頁 mock 資料
// 當月基準：2026/05，趨勢區間：2025/05 – 2026/05（近 13 個月）
// 兩家日照分院：高雄幸福 / 台中建德

export const trendMonths = [
  '25/05', '25/06', '25/07', '25/08', '25/09', '25/10',
  '25/11', '25/12', '26/01', '26/02', '26/03', '26/04', '26/05',
]

const COLOR_KAOHSIUNG = '#0097A7'
const COLOR_TAICHUNG = '#4DB6AC'

// ── 兩家日照中心核心數據 ───────────────────────────────────
export const BRANCH_INFO = [
  {
    short: '高雄幸福',
    full: '高雄幸福日照中心',
    color: COLOR_KAOHSIUNG,
    licensed: 50,
    cases: 45,
    activeCases: 42,
    monthlyServiceCount: 43,
    attendanceRate: 86.0,
    newCases: 3,
    suspended: 2,
    discharged: 1,
    ytdRevenue: 682,
    monthRevenue: 142,
    momPct: 3.2,
    yoyPct: 8.6,
    collectionRate: 93.5,
    collected: 133,
    uncollected: 9,
    subsidyQuota: 158,
    actualServiceCount: 142,
    subsidyUsageRate: 89.6,
    selfPay: 18,
    lowIncomeCount: 8,
    midLowIncomeCount: 8,
    regularCount: 29,
    staffTotal: 18,
    careWorkers: 12,
    careWorkerResignations: 1,
    fullTime: 14,
    partTime: 4,
    resignations: 1,
    turnoverRate: 5.6,
    totalIncidents: 4,
    falls: 2,
    abnormalEvents: 2,
    closedCases: 2,
    status: 'good',
    alert: '無',
    alertTone: 'none',
  },
  {
    short: '台中建德',
    full: '台中建德日照中心',
    color: COLOR_TAICHUNG,
    licensed: 40,
    cases: 32,
    activeCases: 28,
    monthlyServiceCount: 30,
    attendanceRate: 75.0,
    newCases: 2,
    suspended: 3,
    discharged: 2,
    ytdRevenue: 518,
    monthRevenue: 108,
    momPct: -1.8,
    yoyPct: 5.2,
    collectionRate: 87.4,
    collected: 94,
    uncollected: 14,
    subsidyQuota: 138,
    actualServiceCount: 108,
    subsidyUsageRate: 78.1,
    selfPay: 12,
    lowIncomeCount: 5,
    midLowIncomeCount: 5,
    regularCount: 22,
    staffTotal: 14,
    careWorkers: 9,
    careWorkerResignations: 2,
    fullTime: 11,
    partTime: 3,
    resignations: 2,
    turnoverRate: 14.3,
    totalIncidents: 3,
    falls: 1,
    abnormalEvents: 2,
    closedCases: 1,
    status: 'warning',
    alert: '出席率 75.0%、收款率 87.4%，需重點關注',
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
const totalCareWorkerResignations = sumBy('careWorkerResignations')
const totalFullTime = sumBy('fullTime')
const totalPartTime = sumBy('partTime')
const totalResignations = sumBy('resignations')
const totalSubsidyQuota = sumBy('subsidyQuota')
const totalActualServiceCount = sumBy('actualServiceCount')
const totalSelfPay = sumBy('selfPay')
const totalLowIncomeCount = sumBy('lowIncomeCount')
const totalMidLowIncomeCount = sumBy('midLowIncomeCount')
const totalRegularCount = sumBy('regularCount')
const totalIncidents = sumBy('totalIncidents')
const totalFalls = sumBy('falls')
const totalAbnormalEvents = sumBy('abnormalEvents')
const totalClosedCases = sumBy('closedCases')

const weightedAttendance = +(
  BRANCH_INFO.reduce((s, b) => s + b.attendanceRate * b.licensed, 0) / totalLicensed
).toFixed(1)
const weightedCollectionRate = +((totalCollected / totalMonthRevenue) * 100).toFixed(1)
const weightedTurnover = +((totalResignations / totalStaffTotal) * 100).toFixed(1)
const careWorkerTurnoverRate = +((totalCareWorkerResignations / totalCareWorkers) * 100).toFixed(1)
const weightedSubsidyUsage = +((totalActualServiceCount / totalSubsidyQuota) * 100).toFixed(1)
const regularPct = +((totalRegularCount / totalCases) * 100).toFixed(1)
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
    subtitle: `出席率 ${b.attendanceRate}%`,
    value: b.cases,
    unit: '人',
  }))

// ── 重點摘要（自動推導） ──────────────────────────────────
function deriveHighlights() {
  const items = []
  BRANCH_INFO.forEach((b) => {
    if (b.attendanceRate < 80) {
      items.push({
        facility: b.full,
        metric: `出席率 ${b.attendanceRate}%`,
        hint: `低於目標 80%，需積極招收新個案`,
        tone: 'warning',
      })
    }
  })
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
  const bestAtt = [...BRANCH_INFO].sort((a, b) => b.attendanceRate - a.attendanceRate)[0]
  items.push({
    facility: bestAtt.full,
    metric: `出席率 ${bestAtt.attendanceRate}%`,
    hint: `出席率表現最佳，服務品質穩健`,
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
    delta: { dir: 'up', text: 'YoY +7.1%', isWarning: false },
  },
  {
    key: 'collectionRate',
    title: '收款率',
    value: String(weightedCollectionRate),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +1.1%', isWarning: false },
  },
  {
    key: 'uncollected',
    title: '未收款',
    value: `$${totalUncollected}`,
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +$3 萬', isWarning: true },
  },
]

export const overviewCollectionDonut = {
  ratePct: weightedCollectionRate,
  data: [
    { name: '已收款', value: totalCollected, color: COLOR_KAOHSIUNG },
    { name: '未收款', value: totalUncollected, color: '#CFD8DC' },
  ],
}

export const aggregateRevenueTrend = {
  months: trendMonths,
  series: [
    {
      name: '日照合計',
      color: COLOR_KAOHSIUNG,
      data: [218, 225, 221, 229, 227, 234, 232, 238, 236, 244, 242, 247, 250],
    },
  ],
  yoy: [4.2, 5.0, 4.8, 5.5, 5.3, 5.9, 5.6, 6.3, 6.0, 6.8, 6.5, 7.2, 7.1],
  yoyCurrent: 7.1,
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
    hint: '當月服務+暫停',
  },
  {
    key: 'monthlyServiceCount',
    title: '當月服務人數',
    value: String(totalMonthlyServiceCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +3 人', isWarning: false },
  },
  {
    key: 'attendanceRate',
    title: '出席率',
    value: String(weightedAttendance),
    unit: '%',
    delta: { dir: 'down', text: '較上個月 -1.1%', isWarning: true },
  },
  {
    key: 'newCases',
    title: '新個案',
    value: String(totalNewCases),
    unit: '人',
    delta: { dir: 'down', text: '較上個月 -2 人', isWarning: false },
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

// 出席率趨勢（13 個月）
export const attendanceTrend = {
  months: trendMonths,
  series: [
    {
      name: '整體',
      color: '#546E7A',
      dashed: true,
      data: [77.7, 77.2, 78.2, 78.7, 78.3, 79.2, 79.7, 80.2, 80.7, 81.5, 81.0, 82.2, 81.1],
    },
    {
      name: '高雄幸福',
      color: COLOR_KAOHSIUNG,
      data: [82.0, 81.5, 82.5, 83.0, 82.8, 83.5, 84.0, 84.5, 85.0, 85.5, 85.0, 86.5, 86.0],
    },
    {
      name: '台中建德',
      color: COLOR_TAICHUNG,
      data: [72.5, 72.0, 73.0, 73.5, 73.0, 74.0, 74.5, 75.0, 75.5, 76.5, 76.0, 77.0, 75.0],
    },
  ],
}

// 新個案趨勢（13 個月，兩機構堆疊）
export const newCasesTrend = {
  months: trendMonths,
  series: [
    {
      name: '高雄幸福',
      color: COLOR_KAOHSIUNG,
      data: [4, 5, 3, 4, 3, 5, 4, 3, 4, 5, 3, 4, 3],
    },
    {
      name: '台中建德',
      color: COLOR_TAICHUNG,
      data: [3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2],
    },
  ],
}

export const operationComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  licensed: b.licensed,
  cases: b.cases,
  monthlyServiceCount: b.monthlyServiceCount,
  attendanceRate: b.attendanceRate,
  newCases: b.newCases,
  suspended: b.suspended,
  discharged: b.discharged,
}))

// ── 核銷分析分區 ──────────────────────────────────────────

export const overviewReimbursementKpis = [
  {
    key: 'subsidyQuota',
    title: '核定補助額度',
    value: totalSubsidyQuota.toLocaleString(),
    unit: '萬',
    delta: { dir: 'down', text: 'YoY -5.3%', isWarning: true },
  },
  {
    key: 'actualServiceCount',
    title: '實際補助使用',
    value: totalActualServiceCount.toLocaleString(),
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +4 萬', isWarning: false },
  },
  {
    key: 'subsidyUsageRate',
    title: '補助使用率',
    value: String(weightedSubsidyUsage),
    unit: '%',
    delta: { dir: 'down', text: '較上個月 -0.7%', isWarning: false },
  },
  {
    key: 'selfPay',
    title: '實際自費使用',
    value: totalSelfPay.toLocaleString(),
    unit: '萬',
    delta: { dir: 'up', text: '較上個月 +2 萬', isWarning: false },
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
      data: [82.0, 81.5, 82.9, 83.8, 83.2, 84.3, 84.8, 85.3, 84.8, 85.8, 85.3, 85.5, 84.5],
    },
    {
      name: '高雄幸福',
      color: COLOR_KAOHSIUNG,
      data: [87.0, 86.5, 87.8, 88.5, 88.0, 89.0, 89.5, 90.0, 89.5, 90.5, 90.0, 90.2, 89.6],
    },
    {
      name: '台中建德',
      color: COLOR_TAICHUNG,
      data: [76.0, 75.5, 77.0, 78.0, 77.5, 78.5, 79.0, 79.5, 79.0, 80.0, 79.5, 79.8, 78.1],
    },
  ],
}

// 碼別營收排行（前3名）
export const codeRevenueRanking = [
  { name: 'BD01 日間照顧服務', value: 152 },
  { name: 'BD02 交通接送', value: 48 },
  { name: 'BD03 個別訓練', value: 28 },
]

// 核銷統計趨勢（政府補助 / 自費，13 個月）
export const reimbursementBreakdownTrend = {
  months: trendMonths,
  series: [
    {
      name: '政府補助',
      color: COLOR_KAOHSIUNG,
      data: [110, 115, 112, 116, 115, 118, 117, 120, 119, 123, 122, 126, 130],
    },
    {
      name: '自費',
      color: '#B2DFDB',
      data: [58, 59, 59, 61, 61, 63, 63, 64, 65, 66, 67, 66, 68],
    },
  ],
}

export const reimbursementComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  subsidyQuota: b.subsidyQuota,
  actualServiceCount: b.actualServiceCount,
  subsidyUsageRate: b.subsidyUsageRate,
  selfPay: b.selfPay,
  growthSpace: b.subsidyQuota - b.actualServiceCount,
}))

// ── 個案分析分區 ──────────────────────────────────────────
export const overviewCaseKpis = [
  {
    key: 'monthlyServiceCount',
    title: '服務中個案',
    value: String(totalMonthlyServiceCount),
    unit: `/${totalCases} 人`,
    hint: '服務中個案/總收案數',
  },
  {
    key: 'lowIncomeCount',
    title: '低收人數',
    value: String(totalLowIncomeCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
  },
  {
    key: 'midLowIncomeCount',
    title: '中低收人數',
    value: String(totalMidLowIncomeCount),
    unit: '人',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
  },
  {
    key: 'regularCount',
    title: '一般身份人數',
    value: String(totalRegularCount),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
  {
    key: 'regularPct',
    title: '一般身份比例',
    value: String(regularPct),
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
      data: [6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10],
    },
    {
      name: '中低收',
      color: COLOR_KAOHSIUNG,
      data: [12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16],
    },
    {
      name: '一般',
      color: '#B2DFDB',
      data: [39, 40, 42, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
    },
  ],
}

// 當月有排班個案 CMS 等級
export const cmsLevelDonut = [
  { name: 'CMS 2', value: 8, color: '#B2DFDB' },
  { name: 'CMS 3', value: 18, color: '#4DB6AC' },
  { name: 'CMS 4', value: 22, color: COLOR_KAOHSIUNG },
  { name: 'CMS 5', value: 19, color: COLOR_TAICHUNG },
  { name: 'CMS 6', value: 10, color: '#005F64' },
]

export const caseComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  activeCases: b.activeCases,
  cases: b.cases,
  lowIncomeCount: b.lowIncomeCount,
  midLowIncomeCount: b.midLowIncomeCount,
  regularCount: b.regularCount,
  regularPct: +((b.regularCount / b.cases) * 100).toFixed(1),
}))

// ── 照護品質分區 ──────────────────────────────────────────
export const overviewQualityKpis = [
  {
    key: 'totalIncidents',
    title: '總件數',
    value: String(totalIncidents),
    unit: '件',
    delta: { dir: 'up', text: '較上個月 +1 件', isWarning: false },
  },
  {
    key: 'falls',
    title: '跌倒',
    value: String(totalFalls),
    unit: '件',
    delta: {
      text: `發生率 ${+((totalFalls / totalCases) * 100).toFixed(1)}%`,
      isWarning: false,
    },
  },
  {
    key: 'abnormalEvents',
    title: '異常事件',
    value: String(totalAbnormalEvents),
    unit: '件',
    delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
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
  totalIncidents: b.totalIncidents,
  falls: b.falls,
  abnormalEvents: b.abnormalEvents,
  closedCaseRate: +((b.closedCases / b.totalIncidents) * 100).toFixed(1),
}))

// ── 人力狀況分區 ──────────────────────────────────────────
export const overviewHrKpis = [
  {
    key: 'staffTotal',
    title: '員工總數',
    value: String(totalStaffTotal),
    unit: '人',
    hint: '正職+兼職',
  },
  {
    key: 'otherStaff',
    title: '其他員工',
    value: String(totalStaffTotal - totalCareWorkers),
    unit: '人',
    hint: '非照服員員工',
  },
  {
    key: 'careWorkers',
    title: '照服員人數',
    value: String(totalCareWorkers),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人', isWarning: false },
  },
  {
    key: 'careWorkerResignations',
    title: '照服員離職人數',
    value: String(totalCareWorkerResignations),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人', isWarning: true },
  },
  {
    key: 'careWorkerTurnoverRate',
    title: '照服員離職率',
    value: String(careWorkerTurnoverRate),
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +3.2%', isWarning: true },
  },
]

export const overviewPositionStats = [
  { name: '照服員', value: 21 },
  { name: '護理師', value: 4 },
  { name: '職能治療師', value: 3 },
  { name: '社工', value: 2 },
  { name: '行政', value: 2 },
]

export const hrComparison = BRANCH_INFO.map((b) => ({
  id: b.short,
  name: b.full,
  staffTotal: b.staffTotal,
  otherStaff: b.staffTotal - b.careWorkers,
  careWorkers: b.careWorkers,
  careWorkerResignations: b.careWorkerResignations,
  careWorkerTurnoverRate: +((b.careWorkerResignations / b.careWorkers) * 100).toFixed(1),
}))

// ── 各機構詳細資料（BranchTab 使用） ──────────────────────
const branchOverrides = {
  高雄幸福: {
    revenueTrend: {
      data: [120, 124, 122, 126, 125, 129, 128, 131, 130, 134, 133, 137, 142],
      yoy: [5.8, 6.2, 6.5, 7.0, 6.8, 7.4, 7.1, 7.8, 7.5, 8.1, 7.8, 8.6, 8.6],
      yoyCurrent: 8.6,
    },
    reimbursementBreakdownTrend: {
      series: [
        {
          name: '政府補助',
          color: COLOR_KAOHSIUNG,
          data: [60, 62, 61, 63, 62, 65, 64, 66, 65, 68, 67, 70, 70],
        },
        {
          name: '自費',
          color: '#B2DFDB',
          data: [32, 33, 33, 33, 34, 34, 34, 34, 33, 34, 35, 35, 40],
        },
      ],
    },
    welfareTrend: {
      series: [
        { name: '低收', color: '#005F64', data: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6] },
        { name: '中低收', color: COLOR_KAOHSIUNG, data: [7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10, 10] },
        { name: '一般', color: '#B2DFDB', data: [22, 23, 24, 25, 25, 26, 27, 27, 27, 28, 29, 29, 29] },
      ],
    },
    cmsLevelDonut: [
      { name: 'CMS 2', value: 5, color: '#B2DFDB' },
      { name: 'CMS 3', value: 11, color: '#4DB6AC' },
      { name: 'CMS 4', value: 13, color: COLOR_KAOHSIUNG },
      { name: 'CMS 5', value: 11, color: COLOR_TAICHUNG },
      { name: 'CMS 6', value: 5, color: '#005F64' },
    ],
    positionStats: [
      { name: '照服員', value: 12 },
      { name: '護理師', value: 2 },
      { name: '職能治療師', value: 2 },
      { name: '社工', value: 1 },
      { name: '行政', value: 1 },
    ],
    codeRevenueRanking: [
      { name: 'BD01 日間照顧服務', value: 88 },
      { name: 'BD02 交通接送', value: 30 },
      { name: 'BD03 個別訓練', value: 18 },
    ],
  },

  台中建德: {
    revenueTrend: {
      data: [98, 101, 99, 103, 102, 105, 104, 107, 106, 110, 109, 110, 108],
      yoy: [3.0, 3.5, 3.2, 3.8, 3.6, 4.2, 3.9, 4.5, 4.2, 5.0, 4.7, 4.8, 5.2],
      yoyCurrent: 5.2,
    },
    reimbursementBreakdownTrend: {
      series: [
        {
          name: '政府補助',
          color: COLOR_KAOHSIUNG,
          data: [50, 53, 51, 53, 53, 53, 53, 54, 54, 55, 55, 56, 60],
        },
        {
          name: '自費',
          color: '#CFD8DC',
          data: [26, 26, 26, 28, 27, 29, 29, 30, 30, 32, 32, 31, 28],
        },
      ],
    },
    welfareTrend: {
      series: [
        { name: '低收', color: '#005F64', data: [3, 3, 3, 3, 3, 4, 3, 3, 4, 4, 3, 4, 4] },
        { name: '中低收', color: COLOR_KAOHSIUNG, data: [5, 5, 5, 6, 5, 5, 6, 6, 5, 6, 6, 5, 6] },
        { name: '一般', color: '#B2DFDB', data: [17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 22] },
      ],
    },
    cmsLevelDonut: [
      { name: 'CMS 2', value: 3, color: '#B2DFDB' },
      { name: 'CMS 3', value: 7, color: '#4DB6AC' },
      { name: 'CMS 4', value: 9, color: COLOR_TAICHUNG },
      { name: 'CMS 5', value: 8, color: COLOR_KAOHSIUNG },
      { name: 'CMS 6', value: 5, color: '#005F64' },
    ],
    positionStats: [
      { name: '照服員', value: 9 },
      { name: '護理師', value: 2 },
      { name: '職能治療師', value: 1 },
      { name: '社工', value: 1 },
      { name: '行政', value: 1 },
    ],
    codeRevenueRanking: [
      { name: 'BD01 日間照顧服務', value: 64 },
      { name: 'BD02 交通接送', value: 18 },
      { name: 'BD03 個別訓練', value: 10 },
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
      key: 'attendanceRate',
      title: '出席率',
      value: String(b.attendanceRate),
      unit: '%',
      delta: {
        dir: b.attendanceRate >= 80 ? 'up' : 'down',
        text: b.attendanceRate >= 80 ? '較上個月 +0.5%' : '較上個月 -2.0%',
        isWarning: b.attendanceRate < 80,
      },
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
        isWarning: b.suspended > 2,
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
  return [
    {
      key: 'subsidyQuota',
      title: '核定補助額度',
      value: b.subsidyQuota.toLocaleString(),
      unit: '萬',
      delta: { dir: 'down', text: 'YoY -5.3%', isWarning: true },
    },
    {
      key: 'actualServiceCount',
      title: '實際補助使用',
      value: b.actualServiceCount.toLocaleString(),
      unit: '萬',
      delta: { dir: 'up', text: '較上個月 +3 萬', isWarning: false },
    },
    {
      key: 'subsidyUsageRate',
      title: '補助使用率',
      value: String(b.subsidyUsageRate),
      unit: '%',
      delta: {
        dir: 'up',
        text: '較上個月 -0.4%',
        isWarning: false,
      },
    },
    {
      key: 'selfPay',
      title: '實際自費使用',
      value: b.selfPay.toLocaleString(),
      unit: '萬',
      delta: { dir: 'up', text: '較上個月 +1 萬', isWarning: false },
    },
  ]
}

function makeCaseKpis(b) {
  const regPct = +((b.regularCount / b.cases) * 100).toFixed(1)
  return [
    {
      key: 'monthlyServiceCount',
      title: '服務中個案',
      value: String(b.monthlyServiceCount),
      unit: `/${b.cases} 人`,
      hint: '服務中個案/總收案數',
    },
    {
      key: 'lowIncomeCount',
      title: '低收人數',
      value: String(b.lowIncomeCount),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
    },
    {
      key: 'midLowIncomeCount',
      title: '中低收人數',
      value: String(b.midLowIncomeCount),
      unit: '人',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
    {
      key: 'regularCount',
      title: '一般身份人數',
      value: String(b.regularCount),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
    },
    {
      key: 'regularPct',
      title: '一般身份比例',
      value: String(regPct),
      unit: '%',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
  ]
}

function makeQualityKpis(b) {
  const fallRate = +((b.falls / b.cases) * 100).toFixed(1)
  const closureRate = +((b.closedCases / b.totalIncidents) * 100).toFixed(1)
  return [
    {
      key: 'totalIncidents',
      title: '總件數',
      value: String(b.totalIncidents),
      unit: '件',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
    },
    {
      key: 'falls',
      title: '跌倒',
      value: String(b.falls),
      unit: '件',
      delta: { text: `發生率 ${fallRate}%`, isWarning: false },
    },
    {
      key: 'abnormalEvents',
      title: '異常事件',
      value: String(b.abnormalEvents),
      unit: '件',
      delta: { dir: 'flat', text: '較上個月 持平', isWarning: false },
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
  const cwTurnover = +((b.careWorkerResignations / b.careWorkers) * 100).toFixed(1)
  return [
    {
      key: 'staffTotal',
      title: '員工總數',
      value: String(b.staffTotal),
      unit: '人',
      hint: '正職+兼職',
    },
    {
      key: 'otherStaff',
      title: '其他員工',
      value: String(b.staffTotal - b.careWorkers),
      unit: '人',
      hint: '非照服員員工',
    },
    {
      key: 'careWorkers',
      title: '照服員人數',
      value: String(b.careWorkers),
      unit: '人',
      delta: { dir: 'up', text: '較上個月 +1 人', isWarning: false },
    },
    {
      key: 'careWorkerResignations',
      title: '照服員離職人數',
      value: String(b.careWorkerResignations),
      unit: '人',
      delta: {
        dir: b.careWorkerResignations > 0 ? 'up' : 'flat',
        text: b.careWorkerResignations > 0 ? '較上個月 +1 人' : '較上個月 持平',
        isWarning: b.careWorkerResignations > 1,
      },
    },
    {
      key: 'careWorkerTurnoverRate',
      title: '照服員離職率',
      value: String(cwTurnover),
      unit: '%',
      delta: {
        dir: cwTurnover > 10 ? 'up' : 'flat',
        text: cwTurnover > 10 ? '較上個月 +2.1%' : '較上個月 持平',
        isWarning: cwTurnover > 10,
      },
    },
  ]
}

function makeCollectionDonut(b) {
  return {
    ratePct: b.collectionRate,
    data: [
      { name: '已收款', value: b.collected, color: COLOR_KAOHSIUNG },
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

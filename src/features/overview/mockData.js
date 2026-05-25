// 集團總覽首頁 mock 資料
// 單一資料源：facilities 機構列表（住宿 / 日照 / 居服 三種類型）
// 所有 KPI、排名、佔比、趨勢都由這份列表派生，數字彼此一致
// 當月為 2026/05、趨勢圖為 2025/05 – 2026/05 共 13 個月

export const reportDate = '2026年5月14日 週四'

// 與既有頁面（Capacity / Workforce / Accommodation）一致的服務別配色
export const SERVICE_COLORS = {
  residential: '#0097A7', // 住宿
  daycare: '#005F64', // 日照
  homecare: '#26A69A', // 居服
}

// 流動率異常閾值（> 10% 視為警示）
export const TURNOVER_WARNING_THRESHOLD = 10

// 13 個月份標籤（2025/05 – 2026/05）
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

// ── 機構列表（唯一資料源） ─────────────────────────────────
// type: 'residential' (住宿) | 'daycare' (日照) | 'homecare' (居服)
// beds: 立案床數（住宿/日照）或 服務戶數（居服）
// monthRevenue / lastMonthRevenue 單位皆為「萬元」
// turnoverRate / collectionRate / intakeRate 單位皆為 %
export const facilities = [
  {
    id: 'taipei-xinyi',
    name: '台北信義老人長照分院',
    type: 'residential',
    beds: 240,
    ytdRevenue: 4080,
    monthRevenue: 838,
    lastMonthRevenue: 812,
    momPct: 3.2,
    yoyPct: 8.4,
    collected: 770,
    uncollected: 68,
    collectionRate: 91.9,
    cases: 222,
    newCases: 5,
    intakeRate: 92.5,
    staffTotal: 86,
    fullTime: 72,
    partTime: 14,
    turnoverRate: 4.7,
    turnoverMoMPct: -0.5,
  },
  {
    id: 'kaohsiung-zuoying',
    name: '高雄左營長照分院',
    type: 'residential',
    beds: 180,
    ytdRevenue: 2950,
    monthRevenue: 612,
    lastMonthRevenue: 580,
    momPct: 5.6,
    yoyPct: 11.2,
    collected: 580,
    uncollected: 32,
    collectionRate: 94.8,
    cases: 168,
    newCases: 3,
    intakeRate: 93.3,
    staffTotal: 64,
    fullTime: 54,
    partTime: 10,
    turnoverRate: 3.9,
    turnoverMoMPct: -0.3,
  },
  {
    id: 'newtaipei-banqiao',
    name: '新北板橋長照分院',
    type: 'residential',
    beds: 160,
    ytdRevenue: 2540,
    monthRevenue: 526,
    lastMonthRevenue: 537,
    momPct: -2.1,
    yoyPct: 4.6,
    collected: 462,
    uncollected: 64,
    collectionRate: 87.8,
    cases: 142,
    newCases: 4,
    intakeRate: 88.8,
    staffTotal: 56,
    fullTime: 47,
    partTime: 9,
    turnoverRate: 5.5,
    turnoverMoMPct: -0.2,
  },
  {
    id: 'taichung-dali',
    name: '幸福台中大里長照分院',
    type: 'residential',
    beds: 190,
    ytdRevenue: 2310,
    monthRevenue: 482,
    lastMonthRevenue: 505,
    momPct: -4.5,
    yoyPct: -1.8,
    collected: 376,
    uncollected: 106,
    collectionRate: 78.0,
    cases: 156,
    newCases: 6,
    intakeRate: 82.1,
    staffTotal: 64,
    fullTime: 52,
    partTime: 12,
    turnoverRate: 8.4,
    turnoverMoMPct: 0.7,
  },
  {
    id: 'taoyuan-guishan',
    name: '桃園龜山長照中心',
    type: 'residential',
    beds: 80,
    ytdRevenue: 810,
    monthRevenue: 168,
    lastMonthRevenue: 183,
    momPct: -8.4,
    yoyPct: -5.2,
    collected: 109,
    uncollected: 59,
    collectionRate: 64.9,
    cases: 58,
    newCases: 1,
    intakeRate: 72.5,
    staffTotal: 26,
    fullTime: 22,
    partTime: 4,
    turnoverRate: 11.8,
    turnoverMoMPct: 3.2,
  },
  {
    id: 'taichung-xi',
    name: '台中西區日照中心',
    type: 'daycare',
    beds: 150,
    ytdRevenue: 580,
    monthRevenue: 124,
    lastMonthRevenue: 116,
    momPct: 6.7,
    yoyPct: 13.5,
    collected: 112,
    uncollected: 12,
    collectionRate: 90.3,
    cases: 132,
    newCases: 6,
    intakeRate: 88.0,
    staffTotal: 28,
    fullTime: 22,
    partTime: 6,
    turnoverRate: 5.8,
    turnoverMoMPct: 0.3,
  },
  {
    id: 'newtaipei-zhonghe',
    name: '新北中和居家服務部',
    type: 'homecare',
    beds: 220,
    ytdRevenue: 470,
    monthRevenue: 96,
    lastMonthRevenue: 85,
    momPct: 12.3,
    yoyPct: 18.7,
    collected: 79,
    uncollected: 17,
    collectionRate: 82.3,
    cases: 198,
    newCases: 11,
    intakeRate: 90.0,
    staffTotal: 42,
    fullTime: 24,
    partTime: 18,
    turnoverRate: 13.2,
    turnoverMoMPct: 0.8,
  },
]

// ── 通用聚合工具 ──────────────────────────────────────────
const sumBy = (key) => facilities.reduce((s, f) => s + f[key], 0)
const sumByType = (type, key) =>
  facilities.filter((f) => f.type === type).reduce((s, f) => s + f[key], 0)

const TYPE_LABEL = {
  residential: '住宿',
  daycare: '日照',
  homecare: '居服',
}
const TYPE_COLOR = {
  residential: SERVICE_COLORS.residential,
  daycare: SERVICE_COLORS.daycare,
  homecare: SERVICE_COLORS.homecare,
}

// ── 摘要與排行 ────────────────────────────────────────────

// 重點摘要（靜態 mock，前 3 條為警示、後 2 條為表現良好）
export const highlights = [
  {
    facility: '桃園龜山長照中心',
    metric: '收款率 64.9%',
    hint: '較上個月 -7.2%，財務待跟進',
    tone: 'warning',
  },
  {
    facility: '新北中和居家服務部',
    metric: '離職率 13.2%',
    hint: '高於 10% 警示閾值，連 2 個月攀升',
    tone: 'warning',
  },
  {
    facility: '幸福台中大里長照分院',
    metric: '本月 MoM -4.5%',
    hint: '營收連 3 個月下滑，未收款累計 $106 萬',
    tone: 'warning',
  },
  {
    facility: '台北信義老人長照分院',
    metric: 'YTD 累計 $4,080 萬',
    hint: '佔床率 92.5%，本月新增 5 位個案',
    tone: 'ok',
  },
  {
    facility: '高雄左營長照分院',
    metric: '收款率 94.8%',
    hint: '財務管理表現最佳，MoM +5.6%',
    tone: 'ok',
  },
]

// 月營收 Top 5 機構（依 monthRevenue 由大到小）
export const revenueRankingTop5 = [...facilities]
  .sort((a, b) => b.monthRevenue - a.monthRevenue)
  .slice(0, 5)
  .map((f, i) => ({
    rank: i + 1,
    id: f.id,
    name: f.name,
    type: f.type,
    typeLabel: TYPE_LABEL[f.type],
    beds: f.beds,
    monthRevenue: f.monthRevenue,
  }))

// ── 財務概況 ──────────────────────────────────────────────

const ytdRevenueTotal = sumBy('ytdRevenue')
const monthRevenueTotal = sumBy('monthRevenue')
const collectedTotal = sumBy('collected')
const uncollectedTotal = sumBy('uncollected')
const collectionRateTotal = +((collectedTotal / monthRevenueTotal) * 100).toFixed(1)

export const financialKpis = [
  {
    key: 'ytdRevenue',
    title: '年度累計營收',
    value: ytdRevenueTotal.toLocaleString(),
    unit: '萬元',
    hint: '2026 年 1 至 5 月',
  },
  {
    key: 'monthRevenue',
    title: '本月營收',
    value: monthRevenueTotal.toLocaleString(),
    unit: '萬元',
    delta: { dir: 'up', text: 'YoY +9.2%' },
  },
  {
    key: 'collectionRate',
    title: '收款率',
    value: collectionRateTotal,
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +2.8%' },
  },
  {
    key: 'uncollected',
    title: '未收款',
    value: uncollectedTotal.toLocaleString(),
    unit: '萬元',
    delta: { dir: 'down', text: '較上個月 -12 萬' },
  },
]

// 收款率 donut（已收款 / 未收款）
export const collectionDonut = {
  ratePct: collectionRateTotal,
  data: [
    {
      name: '已收款',
      value: collectedTotal,
      color: SERVICE_COLORS.residential,
    },
    {
      name: '未收款',
      value: uncollectedTotal,
      color: '#CFD8DC',
    },
  ],
}

// 營收月趨勢（13 個月 × 三服務別 + YoY 折線）
// 季節性說明：
//   25/08 農曆七月（鬼月）→ 新收個案銳減，日照/居服影響最大、住宿較小
//   25/12 → 部分家屬接回準備過年，輕微減速
//   26/02 農曆春節 → 家屬接回過年，再次小幅凹陷
export const revenueTrend = {
  months: trendMonths,
  series: [
    {
      name: '住宿',
      color: SERVICE_COLORS.residential,
      data: [
        2425,
        2445,
        2460,
        2418, // 鬼月 −1.7%
        2455,
        2495,
        2520,
        2510, // 年底減速
        2548,
        2520, // 春節小幅凹陷
        2565,
        2598,
        sumByType('residential', 'monthRevenue'),
      ],
    },
    {
      name: '日照',
      color: SERVICE_COLORS.daycare,
      data: [
        105,
        108,
        110,
        103, // 鬼月 −6%
        108,
        115,
        118,
        116,
        122,
        117, // 春節
        121,
        123,
        sumByType('daycare', 'monthRevenue'),
      ],
    },
    {
      name: '居服',
      color: SERVICE_COLORS.homecare,
      data: [
        76,
        78,
        80,
        74, // 鬼月
        79,
        84,
        87,
        88,
        92,
        86, // 春節
        91,
        93,
        sumByType('homecare', 'monthRevenue'),
      ],
    },
  ],
  yoy: [6.8, 7.0, 7.1, 7.0, 7.3, 7.8, 8.0, 8.1, 8.3, 8.2, 8.7, 9.0, 9.2],
  yoyCurrent: 9.2,
}

// 機構營收排名（全部 7 家，依 monthRevenue 由大到小）
export const financialRanking = [...facilities]
  .sort((a, b) => b.monthRevenue - a.monthRevenue)
  .map((f, i) => ({
    rank: i + 1,
    id: f.id,
    name: f.name,
    type: f.type,
    typeLabel: TYPE_LABEL[f.type],
    monthRevenue: f.monthRevenue,
    momPct: f.momPct,
    yoyPct: f.yoyPct,
    collectionRate: f.collectionRate,
  }))

// ── 營運概況 ──────────────────────────────────────────────

const caseTotal = sumBy('cases')
const newCaseTotal = sumBy('newCases')

export const operationsKpis = [
  {
    key: 'caseTotal',
    title: '個案總數',
    value: caseTotal.toLocaleString(),
    unit: '人',
    delta: { dir: 'up', text: 'YoY +9.8% (+96 人)' },
  },
  {
    key: 'newCases',
    title: '本月新個案',
    value: String(newCaseTotal),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +4 人' },
  },
]

// 個案數佔比（三服務別）
const residentialCases = sumByType('residential', 'cases')
const daycareCases = sumByType('daycare', 'cases')
const homecareCases = sumByType('homecare', 'cases')

export const caseShareCurrent = [
  { name: '住宿', value: residentialCases, color: SERVICE_COLORS.residential },
  { name: '日照', value: daycareCases, color: SERVICE_COLORS.daycare },
  { name: '居服', value: homecareCases, color: SERVICE_COLORS.homecare },
]

// 個案數趨勢（13 個月 × 三服務別堆疊）
// 季節性同 revenueTrend：鬼月（25/08）與春節（26/02）為兩個明顯凹陷
export const caseTrend = {
  months: trendMonths,
  series: [
    {
      name: '住宿',
      color: SERVICE_COLORS.residential,
      data: [
        705,
        710,
        714,
        712, // 鬼月，新收個案趨緩、既有住民流失略增
        715,
        723,
        728,
        730,
        733,
        730, // 春節短期返家
        738,
        743,
        residentialCases,
      ],
    },
    {
      name: '日照',
      color: SERVICE_COLORS.daycare,
      data: [
        110,
        113,
        115,
        108, // 鬼月 −6%
        113,
        120,
        123,
        122,
        127,
        121, // 春節
        127,
        130,
        daycareCases,
      ],
    },
    {
      name: '居服',
      color: SERVICE_COLORS.homecare,
      data: [
        165,
        170,
        173,
        167, // 鬼月，部分家庭暫停服務
        173,
        181,
        185,
        187,
        192,
        184, // 春節
        191,
        195,
        homecareCases,
      ],
    },
  ],
}

// 機構營運排名（全部 7 家，依 cases 由大到小）
export const operationsRanking = [...facilities]
  .sort((a, b) => b.cases - a.cases)
  .map((f, i) => ({
    rank: i + 1,
    id: f.id,
    name: f.name,
    type: f.type,
    typeLabel: TYPE_LABEL[f.type],
    typeColor: TYPE_COLOR[f.type],
    beds: f.beds,
    cases: f.cases,
    intakeRate: f.intakeRate,
  }))

// ── 人力狀況 ──────────────────────────────────────────────

const staffTotal = sumBy('staffTotal')
const fullTimeTotal = sumBy('fullTime')
const partTimeTotal = sumBy('partTime')

// 加權平均離職率
const weightedTurnover = +(
  facilities.reduce((s, f) => s + f.turnoverRate * f.staffTotal, 0) / staffTotal
).toFixed(1)

export const hrKpis = [
  {
    key: 'staffTotal',
    title: '員工總數',
    value: String(staffTotal),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +2 人' },
  },
  {
    key: 'fullTime',
    title: '全職員工',
    value: String(fullTimeTotal),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人' },
  },
  {
    key: 'partTime',
    title: '兼職員工',
    value: String(partTimeTotal),
    unit: '人',
    delta: { dir: 'up', text: '較上個月 +1 人' },
  },
  {
    key: 'turnoverRate',
    title: '集團離職率',
    value: weightedTurnover,
    unit: '%',
    delta: { dir: 'up', text: '較上個月 +0.4%', isWarning: true },
  },
]

// 機構人力比較（依離職率由高到低，方便快速看到警示）
export const hrComparison = [...facilities]
  .sort((a, b) => b.turnoverRate - a.turnoverRate)
  .map((f) => ({
    id: f.id,
    name: f.name,
    type: f.type,
    typeLabel: TYPE_LABEL[f.type],
    typeColor: TYPE_COLOR[f.type],
    staffTotal: f.staffTotal,
    fullTime: f.fullTime,
    partTime: f.partTime,
    turnoverRate: f.turnoverRate,
  }))

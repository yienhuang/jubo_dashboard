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
    name: '幸福台中大里居家服務部',
    type: 'homecare',
    beds: 260,
    ytdRevenue: 620,
    monthRevenue: 128,
    lastMonthRevenue: 122,
    momPct: 4.9,
    yoyPct: 8.2,
    collected: 108,
    uncollected: 20,
    collectionRate: 84.4,
    cases: 240,
    newCases: 14,
    intakeRate: 92.3,
    staffTotal: 48,
    fullTime: 28,
    partTime: 20,
    turnoverRate: 12.5,
    turnoverMoMPct: 0.6,
  },
  {
    id: 'taoyuan-guishan',
    name: '桃園龜山日照中心',
    type: 'daycare',
    beds: 90,
    ytdRevenue: 450,
    monthRevenue: 92,
    lastMonthRevenue: 88,
    momPct: 4.5,
    yoyPct: 6.8,
    collected: 75,
    uncollected: 17,
    collectionRate: 81.5,
    cases: 68,
    newCases: 3,
    intakeRate: 75.6,
    staffTotal: 18,
    fullTime: 14,
    partTime: 4,
    turnoverRate: 7.2,
    turnoverMoMPct: 0.5,
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
    facility: '桃園龜山日照中心',
    metric: '收案率 75.6%',
    hint: '較上個月 -3.8%，新案來源待加強',
    tone: 'warning',
  },
  {
    facility: '新北中和居家服務部',
    metric: '離職率 13.2%',
    hint: '高於 10% 警示閾值，連 2 個月攀升',
    tone: 'warning',
  },
  {
    facility: '幸福台中大里居家服務部',
    metric: '離職率 12.5%',
    hint: '高於 10% 警示閾值，新進居服員流動率偏高',
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
        1820,
        1840,
        1855,
        1815, // 鬼月 −2.2%
        1850,
        1880,
        1900,
        1890, // 年底減速
        1925,
        1900, // 春節小幅凹陷
        1935,
        1960,
        sumByType('residential', 'monthRevenue'),
      ],
    },
    {
      name: '日照',
      color: SERVICE_COLORS.daycare,
      data: [
        182,
        187,
        192,
        178, // 鬼月 −7%
        188,
        200,
        206,
        202,
        213,
        204, // 春節
        211,
        214,
        sumByType('daycare', 'monthRevenue'),
      ],
    },
    {
      name: '居服',
      color: SERVICE_COLORS.homecare,
      data: [
        177,
        182,
        187,
        173, // 鬼月
        184,
        196,
        203,
        205,
        215,
        201, // 春節
        212,
        217,
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
        503,
        506,
        509,
        508, // 鬼月，新收個案趨緩、既有住民流失略增
        510,
        516,
        519,
        521,
        523,
        521, // 春節短期返家
        526,
        530,
        residentialCases,
      ],
    },
    {
      name: '日照',
      color: SERVICE_COLORS.daycare,
      data: [
        167,
        171,
        174,
        164, // 鬼月 −6%
        171,
        182,
        186,
        185,
        192,
        183, // 春節
        192,
        197,
        daycareCases,
      ],
    },
    {
      name: '居服',
      color: SERVICE_COLORS.homecare,
      data: [
        365,
        376,
        383,
        369, // 鬼月，部分家庭暫停服務
        383,
        400,
        409,
        413,
        425,
        407, // 春節
        422,
        431,
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

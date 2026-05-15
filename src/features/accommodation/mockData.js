// 住宿頁 mock 資料
// 當月基準：2026/05，趨勢區間：2025/05 – 2026/05（近 13 個月）

export const reportDate = '2026年5月14日 週四'

export const trendMonths = [
  '25/05', '25/06', '25/07', '25/08', '25/09', '25/10',
  '25/11', '25/12', '26/01', '26/02', '26/03', '26/04', '26/05',
]

export const yearMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

// ── 總覽 KPI ──────────────────────────────────────────────
export const overviewKpis = [
  { key: 'revenue',      title: '月營收',          value: '$858', unit: '萬', delta: { dir: 'up',  text: 'YoY +15.8%',      isWarning: false } },
  { key: 'serviceTotal', title: '當月總服務人數', value: '327', unit: '人',   delta: { dir: 'up',  text: '較上個月 +8 人',   isWarning: false } },
  { key: 'staffTotal',   title: '當月員工人數',   value: '104', unit: '人',   delta: { dir: 'up',  text: '較上個月 +2 人',   isWarning: false } },
  { key: 'occupancy',    title: '占床率',          value: '91.2', unit: '%',  delta: { dir: 'up',  text: '較上個月 +0.5pp', isWarning: false } },
]

// ── 各機構占床率趨勢 ──────────────────────────────────────
export const occupancyTrend = {
  months: trendMonths,
  series: [
    { name: '整體', color: '#546E7A', dashed: true, data: [87.9, 87.3, 86.6, 86.2, 87.5, 87.6, 88.1, 88.3, 89.2, 90.1, 89.1, 90.3, 90.6] },
    { name: '台北信義長照分院', color: '#0097A7', data: [94.1, 93.6, 94.8, 94.2, 95.3, 94.6, 95.8, 95.0, 95.5, 96.1, 95.2, 95.9, 96.2] },
    { name: '台中南屯長照分院', color: '#00838F', data: [84.2, 85.1, 83.5, 85.6, 86.4, 85.0, 86.8, 85.5, 86.7, 87.5, 86.2, 87.8, 87.6] },
    { name: '高雄左營長照分院', color: '#26A69A', data: [79.1, 76.5, 73.2, 70.5, 72.8, 76.1, 73.8, 77.5, 78.9, 80.5, 79.6, 81.4, 82.3] },
  ],
}

// ── 三機構佔比（當月） ────────────────────────────────────
export const branchServiceShare = [
  { name: '台北信義', value: 163, color: '#0097A7' },
  { name: '台中南屯', value:  85, color: '#00838F' },
  { name: '高雄左營', value:  79, color: '#26A69A' },
]

export const branchRevenueShare = [
  { name: '台北信義', value: 438, color: '#0097A7' },
  { name: '台中南屯', value: 198, color: '#00838F' },
  { name: '高雄左營', value: 222, color: '#26A69A' },
]

// ── 各機構整體服務營收 ────────────────────────────────────
export const revenueByBranch = {
  months: trendMonths,
  series: [
    { name: '台北信義', color: '#0097A7', data: [370, 412, 385, 420, 396, 433, 402, 446, 395, 430, 410, 452, 438] },
    { name: '台中南屯', color: '#00838F', data: [162, 175, 168, 180, 172, 185, 176, 192, 170, 183, 178, 195, 198] },
    { name: '高雄左營', color: '#26A69A', data: [188, 203, 195, 205, 199, 212, 203, 222, 200, 215, 205, 226, 222] },
  ],
  yoy: [7.2, 9.4, 8.5, 10.8, 9.6, 11.3, 10.5, 13.2, 11.4, 12.8, 12.1, 14.5, 15.8],
  yoyCurrent: 15.8,
}

// ── 住宿機構排行（依本月營收） ───────────────────────────
// status: good | warning  ／  alertTone: warning | none
export const branchRanking = [
  {
    rank: 1,
    name: '台北信義長照分院',
    status: 'good',
    ytdRevenue: 2125,
    ytdYoy: 8.5,
    monthRevenue: 438,
    monthYoy: 9.2,
    vacancyRate: 3.8,
    staffCost: 198,
    collectionRate: 86.3,
    alert: '無',
    alertTone: 'none',
  },
  {
    rank: 2,
    name: '高雄左營長照分院',
    status: 'warning',
    ytdRevenue: 1068,
    ytdYoy: 6.4,
    monthRevenue: 222,
    monthYoy: 7.8,
    vacancyRate: 17.7,
    staffCost: 88,
    collectionRate: 87.4,
    alert: '占床率偏低、需積極招收',
    alertTone: 'warning',
  },
  {
    rank: 3,
    name: '台中南屯長照分院',
    status: 'warning',
    ytdRevenue: 924,
    ytdYoy: 19.6,
    monthRevenue: 198,
    monthYoy: 22.4,
    vacancyRate: 12.4,
    staffCost: 98,
    collectionRate: 86.9,
    alert: '占床率未達目標',
    alertTone: 'warning',
  },
]

// ── 三機構資料 ────────────────────────────────────────────
export const BRANCHES = ['台北信義長照分院', '台中南屯長照分院', '高雄左營長照分院']

export const branchData = {
  台北信義長照分院: {
    operationKpis: [
      { key: 'service',   title: '當月服務人數', value: '163', unit: '人',  delta: { dir: 'up', text: '較上個月 +3 人',   isWarning: false } },
      { key: 'newIn',     title: '本月新入住',   value: '5',   unit: '人',  delta: { dir: 'up', text: '較上個月 +1 人',   isWarning: false } },
      { key: 'newOut',    title: '本月退住',     value: '4',   unit: '人',  delta: { dir: 'down', text: '較上個月 -1 人', isWarning: false } },
      { key: 'occupancy', title: '占床率',       value: '96.2', unit: '%', delta: { dir: 'up', text: '較上個月 +0.3pp', isWarning: false } },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 141,
      series: [
        { name: '新入住', color: '#0097A7', data: [5, 6, 4, 7, 5, 6, 4, 8, 5, 6, 7, 4, 5] },
        { name: '退住',   color: '#EF5350', data: [3, 4, 3, 5, 4, 3, 5, 4, 3, 4, 3, 5, 4] },
        { name: '住院',   color: '#FF9800', data: [8, 7, 9, 6, 8, 7, 10, 8, 7, 9, 6, 8, 7] },
        { name: '請假',   color: '#78909C', data: [12, 10, 13, 11, 9, 12, 10, 14, 11, 10, 12, 9, 11] },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 52 },
      { name: '老人',           value: 45 },
      { name: '低收公費安置',   value: 28 },
      { name: '身障',           value: 18 },
      { name: '喘息服務',       value: 9  },
      { name: '身障托育養護',   value: 8  },
      { name: '其他',           value: 3  },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 22 },
      { name: '1 ～ 2 年', value: 31 },
      { name: '2 ～ 3 年', value: 28 },
      { name: '3 ～ 5 年', value: 45 },
      { name: '5 年以上',  value: 37 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 102, color: '#0097A7' },
      { name: '65歲以下非身障', value: 27,  color: '#00838F' },
      { name: '65歲以上身障',   value: 22,  color: '#26A69A' },
      { name: '65歲以下身障',   value: 12,  color: '#80CBC4' },
    ],
    cmsLevels: [
      { level: '2', value: 4  },
      { level: '3', value: 18 },
      { level: '4', value: 32 },
      { level: '5', value: 45 },
      { level: '6', value: 38 },
      { level: '7', value: 22 },
      { level: '8', value: 4  },
    ],
    qualityAlerts: [
      { name: '身體約束發生密度', current: '20.1%', threshold: '19%' },
      { name: '約束移除成功率',   current: '14.3%', threshold: '10%' },
      { name: '感染發生密度',     current: '5.2%',  threshold: '3.0%' },
    ],
    dischargeReasons: [
      { name: '轉院',     value: 3 },
      { name: '死亡',     value: 2 },
      { name: '返家',     value: 4 },
      { name: '在院死亡', value: 1 },
      { name: '其他',     value: 2 },
      { name: '特殊',     value: 1 },
    ],
    financeKpis: [
      { key: 'revenue',     title: '營收',     value: '$438', unit: '萬', delta: { dir: 'up',   text: 'YoY +9.2%',      isWarning: false } },
      { key: 'collected',   title: '已收款',   value: '$378', unit: '萬', delta: { dir: 'flat', text: '回收率 86.3%',    isWarning: false } },
      { key: 'overdue',     title: '逾期應收', value: '$60',  unit: '萬', delta: { dir: 'up',   text: '逾期率 13.7%',   isWarning: true  } },
      { key: 'staffCost',   title: '人事費用', value: '$198', unit: '萬', delta: { dir: 'up',   text: '較上個月 +3.2%', isWarning: false } },
      { key: 'costRatio',   title: '人月費用比', value: '1.52', unit: '倍', delta: { dir: 'up', text: '較上個月 +0.04', isWarning: false } },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [370, 412, 385, 420, 396, 433, 402, 446, 395, 430, 410, 452, 438],
      yoy: [6.5, 7.2, 7.8, 8.3, 7.5, 8.8, 8.0, 9.4, 8.1, 8.7, 8.4, 9.6, 9.2],
      yoyCurrent: 9.2,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [178, 180, 182, 183, 185, 186, 188, 189, 190, 192, 193, 195, 198],
    },
  },

  台中南屯長照分院: {
    operationKpis: [
      { key: 'service',   title: '當月服務人數', value: '85', unit: '人',  delta: { dir: 'up',   text: '較上個月 +2 人',   isWarning: false } },
      { key: 'newIn',     title: '本月新入住',   value: '3',  unit: '人',  delta: { dir: 'flat', text: '較上個月 持平',   isWarning: false } },
      { key: 'newOut',    title: '本月退住',     value: '2',  unit: '人',  delta: { dir: 'down', text: '較上個月 -1 人', isWarning: false } },
      { key: 'occupancy', title: '占床率',       value: '87.6', unit: '%', delta: { dir: 'up',   text: '較上個月 +0.4pp', isWarning: false } },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 69,
      series: [
        { name: '新入住', color: '#0097A7', data: [3, 4, 3, 4, 3, 4, 3, 5, 3, 4, 4, 3, 3] },
        { name: '退住',   color: '#EF5350', data: [2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 3, 2] },
        { name: '住院',   color: '#FF9800', data: [4, 4, 5, 3, 4, 4, 5, 4, 4, 5, 3, 4, 4] },
        { name: '請假',   color: '#78909C', data: [6, 5, 7, 6, 5, 6, 5, 7, 6, 5, 6, 5, 6] },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 28 },
      { name: '老人',           value: 24 },
      { name: '低收公費安置',   value: 15 },
      { name: '身障',           value: 10 },
      { name: '喘息服務',       value: 5  },
      { name: '其他',           value: 3  },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 12 },
      { name: '1 ～ 2 年', value: 18 },
      { name: '2 ～ 3 年', value: 15 },
      { name: '3 ～ 5 年', value: 24 },
      { name: '5 年以上',  value: 16 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 52, color: '#0097A7' },
      { name: '65歲以下非身障', value: 14, color: '#00838F' },
      { name: '65歲以上身障',   value: 12, color: '#26A69A' },
      { name: '65歲以下身障',   value: 7,  color: '#80CBC4' },
    ],
    cmsLevels: [
      { level: '2', value: 2  },
      { level: '3', value: 10 },
      { level: '4', value: 18 },
      { level: '5', value: 24 },
      { level: '6', value: 20 },
      { level: '7', value: 9  },
      { level: '8', value: 2  },
    ],
    qualityAlerts: [],
    dischargeReasons: [
      { name: '轉院',     value: 2 },
      { name: '死亡',     value: 1 },
      { name: '返家',     value: 2 },
      { name: '在院死亡', value: 0 },
      { name: '其他',     value: 1 },
      { name: '特殊',     value: 1 },
    ],
    financeKpis: [
      { key: 'revenue',   title: '營收',       value: '$198', unit: '萬', delta: { dir: 'up',   text: 'YoY +22.4%',    isWarning: false } },
      { key: 'collected', title: '已收款',     value: '$172', unit: '萬', delta: { dir: 'flat', text: '回收率 86.9%',  isWarning: false } },
      { key: 'overdue',   title: '逾期應收',   value: '$26',  unit: '萬', delta: { dir: 'up',   text: '逾期率 13.1%', isWarning: true  } },
      { key: 'staffCost', title: '人事費用',   value: '$98',  unit: '萬', delta: { dir: 'up',   text: '較上個月 +2.1%', isWarning: false } },
      { key: 'costRatio', title: '人月費用比', value: '1.45', unit: '倍', delta: { dir: 'up',   text: '較上個月 +0.02', isWarning: false } },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [162, 175, 168, 180, 172, 185, 176, 192, 170, 183, 178, 195, 198],
      yoy: [15.2, 16.8, 17.5, 18.6, 17.2, 19.4, 18.5, 20.8, 18.9, 20.2, 19.8, 21.5, 22.4],
      yoyCurrent: 22.4,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [88, 89, 90, 91, 92, 93, 94, 95, 95, 96, 96, 97, 98],
    },
  },

  高雄左營長照分院: {
    operationKpis: [
      { key: 'service',   title: '當月服務人數', value: '79', unit: '人',  delta: { dir: 'up',   text: '較上個月 +1 人',   isWarning: false } },
      { key: 'newIn',     title: '本月新入住',   value: '2',  unit: '人',  delta: { dir: 'flat', text: '較上個月 持平',   isWarning: false } },
      { key: 'newOut',    title: '本月退住',     value: '2',  unit: '人',  delta: { dir: 'flat', text: '較上個月 持平',   isWarning: false } },
      { key: 'occupancy', title: '占床率',       value: '82.3', unit: '%', delta: { dir: 'up',   text: '較上個月 +0.4pp', isWarning: false } },
    ],
    residentMovement: {
      months: trendMonths,
      baselineResidents: 67,
      series: [
        { name: '新入住', color: '#0097A7', data: [2, 3, 2, 3, 2, 3, 2, 4, 2, 3, 3, 2, 2] },
        { name: '退住',   color: '#EF5350', data: [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2] },
        { name: '住院',   color: '#FF9800', data: [3, 3, 4, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3] },
        { name: '請假',   color: '#78909C', data: [5, 4, 6, 5, 4, 5, 4, 6, 5, 4, 5, 4, 5] },
      ],
    },
    serviceTypes: [
      { name: '自費全日型養護', value: 25 },
      { name: '老人',           value: 22 },
      { name: '低收公費安置',   value: 13 },
      { name: '身障',           value: 10 },
      { name: '喘息服務',       value: 6  },
      { name: '其他',           value: 3  },
    ],
    residencyYears: [
      { name: '未滿 1 年', value: 10 },
      { name: '1 ～ 2 年', value: 14 },
      { name: '2 ～ 3 年', value: 13 },
      { name: '3 ～ 5 年', value: 22 },
      { name: '5 年以上',  value: 20 },
    ],
    disabilityRatio: [
      { name: '65歲以上非身障', value: 48, color: '#0097A7' },
      { name: '65歲以下非身障', value: 13, color: '#00838F' },
      { name: '65歲以上身障',   value: 11, color: '#26A69A' },
      { name: '65歲以下身障',   value: 7,  color: '#80CBC4' },
    ],
    cmsLevels: [
      { level: '2', value: 2  },
      { level: '3', value: 8  },
      { level: '4', value: 16 },
      { level: '5', value: 22 },
      { level: '6', value: 18 },
      { level: '7', value: 10 },
      { level: '8', value: 3  },
    ],
    qualityAlerts: [
      { name: '感染發生密度', current: '4.1%', threshold: '3.0%' },
    ],
    dischargeReasons: [
      { name: '轉院',     value: 2 },
      { name: '死亡',     value: 1 },
      { name: '返家',     value: 2 },
      { name: '在院死亡', value: 1 },
      { name: '其他',     value: 1 },
      { name: '特殊',     value: 1 },
    ],
    financeKpis: [
      { key: 'revenue',   title: '營收',       value: '$222', unit: '萬', delta: { dir: 'up',   text: 'YoY +7.8%',     isWarning: false } },
      { key: 'collected', title: '已收款',     value: '$194', unit: '萬', delta: { dir: 'flat', text: '回收率 87.4%',  isWarning: false } },
      { key: 'overdue',   title: '逾期應收',   value: '$28',  unit: '萬', delta: { dir: 'up',   text: '逾期率 12.6%', isWarning: true  } },
      { key: 'staffCost', title: '人事費用',   value: '$88',  unit: '萬', delta: { dir: 'up',   text: '較上個月 +1.8%', isWarning: false } },
      { key: 'costRatio', title: '人月費用比', value: '1.38', unit: '倍', delta: { dir: 'flat', text: '較上個月 持平', isWarning: false } },
    ],
    revenueTrend: {
      months: trendMonths,
      data: [188, 203, 195, 205, 199, 212, 203, 222, 200, 215, 205, 226, 222],
      yoy: [5.1, 5.8, 6.2, 6.9, 6.3, 7.1, 6.5, 7.8, 6.9, 7.4, 7.0, 8.1, 7.8],
      yoyCurrent: 7.8,
    },
    staffCostTrend: {
      months: trendMonths,
      data: [78, 80, 81, 82, 83, 84, 85, 85, 86, 86, 87, 87, 88],
    },
  },
}

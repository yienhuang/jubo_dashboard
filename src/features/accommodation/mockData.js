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
  { key: 'serviceTotal', title: '當月總服務人數', value: '327', unit: '人',   delta: { dir: 'up',  text: '較上個月 +8 人',   isWarning: false } },
  { key: 'staffTotal',   title: '當月員工人數',   value: '104', unit: '人',   delta: { dir: 'up',  text: '較上個月 +2 人',   isWarning: false } },
  { key: 'occupancy',    title: '占床率',          value: '91.2', unit: '%',  delta: { dir: 'up',  text: '較上個月 +0.5pp', isWarning: false } },
  { key: 'revenue',      title: '月營收',          value: '$858', unit: '萬', delta: { dir: 'up',  text: 'YoY +15.8%',      isWarning: false } },
]

// ── 各機構占床率趨勢 ──────────────────────────────────────
export const occupancyTrend = {
  months: trendMonths,
  series: [
    { name: '台北信義長照分院', color: '#0097A7', data: [94.1, 94.5, 95.0, 95.3, 95.6, 95.8, 95.2, 95.5, 95.9, 95.7, 96.0, 95.8, 96.2] },
    { name: '台中南屯長照分院', color: '#00838F', data: [84.2, 84.8, 85.3, 85.7, 86.0, 86.4, 86.8, 87.1, 87.3, 87.0, 87.4, 87.2, 87.6] },
    { name: '高雄左營長照分院', color: '#26A69A', data: [79.1, 79.5, 80.0, 80.4, 80.8, 81.2, 81.5, 81.9, 82.1, 81.8, 82.0, 81.9, 82.3] },
  ],
}

// ── 各機構整體服務營收 ────────────────────────────────────
export const revenueByBranch = {
  months: trendMonths,
  series: [
    { name: '台北信義', color: '#0097A7', data: [370, 412, 385, 420, 396, 433, 402, 446, 395, 430, 410, 452, 438] },
    { name: '台中南屯', color: '#00838F', data: [162, 175, 168, 180, 172, 185, 176, 192, 170, 183, 178, 195, 198] },
    { name: '高雄左營', color: '#26A69A', data: [188, 203, 195, 205, 199, 212, 203, 222, 200, 215, 205, 226, 222] },
  ],
  yoy: [null, null, null, null, null, null, null, null, null, null, null, null, 15.8],
  yoyCurrent: 15.8,
}

// ── 三機構資料 ────────────────────────────────────────────
export const BRANCHES = ['台北信義長照分院', '台中南屯長照分院', '高雄左營長照分院']

export const branchData = {
  台北信義長照分院: {
    kpis: [
      { key: 'service',   title: '當月服務人數', value: '163', unit: '人',  delta: { dir: 'up', text: '較上個月 +3 人',   isWarning: false } },
      { key: 'staff',     title: '當月員工人數', value: '52',  unit: '人',  delta: { dir: 'up', text: '較上個月 +3 人',   isWarning: false } },
      { key: 'occupancy', title: '占床率',        value: '96.2', unit: '%', delta: { dir: 'up', text: '較上個月 +0.3pp', isWarning: false } },
      { key: 'revenue',   title: '月營收',        value: '$438', unit: '萬', delta: { dir: 'up', text: 'YoY +9.2%',      isWarning: false } },
    ],
    aiInsights: [
      { text: '人事成本率 62.3%，已接近警戒線，需持續監控', status: 'warning' },
      { text: '占床率 96.2%，超越集團目標 90%',             status: 'success' },
      { text: '月營收 YoY +9.2%，穩健成長',                 status: 'success' },
    ],
    yearOccupancy: [
      { month: '1月', value: 95.1 }, { month: '2月', value: 94.8 }, { month: '3月', value: 95.6 },
      { month: '4月', value: 95.9 }, { month: '5月', value: 96.2 }, { month: '6月', value: null  },
      { month: '7月', value: null  }, { month: '8月', value: null  }, { month: '9月', value: null  },
      { month: '10月', value: null }, { month: '11月', value: null }, { month: '12月', value: null },
    ],
    patientDays: {
      months: trendMonths,
      data: [2958, 3041, 3100, 3072, 3015, 2448, 2125, 1834, 1402, 1011, 748, 521, 714],
    },
    residentMovement: {
      months: trendMonths,
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
    },
  },

  台中南屯長照分院: {
    kpis: [
      { key: 'service',   title: '當月服務人數', value: '85',   unit: '人',  delta: { dir: 'up', text: '較上個月 +2 人',   isWarning: false } },
      { key: 'staff',     title: '當月員工人數', value: '28',   unit: '人',  delta: { dir: 'up', text: '較上個月 +1 人',   isWarning: false } },
      { key: 'occupancy', title: '占床率',        value: '87.6', unit: '%',  delta: { dir: 'up', text: '較上個月 +0.4pp', isWarning: false } },
      { key: 'revenue',   title: '月營收',        value: '$198', unit: '萬', delta: { dir: 'up', text: 'YoY +22.4%',      isWarning: false } },
    ],
    aiInsights: [
      { text: '占床率 87.6%，低於集團目標 90%，需加強招募', status: 'warning' },
      { text: '月營收 YoY +22.4%，成長最快',                status: 'success' },
      { text: '員工人數穩定，流動率正常',                    status: 'success' },
    ],
    yearOccupancy: [
      { month: '1月', value: 85.2 }, { month: '2月', value: 85.8 }, { month: '3月', value: 86.3 },
      { month: '4月', value: 87.0 }, { month: '5月', value: 87.6 }, { month: '6月', value: null  },
      { month: '7月', value: null  }, { month: '8月', value: null  }, { month: '9月', value: null  },
      { month: '10月', value: null }, { month: '11月', value: null }, { month: '12月', value: null },
    ],
    patientDays: {
      months: trendMonths,
      data: [1520, 1580, 1610, 1590, 1565, 1480, 1420, 1380, 1310, 1240, 1180, 1050, 1120],
    },
    residentMovement: {
      months: trendMonths,
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
    },
  },

  高雄左營長照分院: {
    kpis: [
      { key: 'service',   title: '當月服務人數', value: '79',   unit: '人',  delta: { dir: 'up', text: '較上個月 +1 人',   isWarning: false } },
      { key: 'staff',     title: '當月員工人數', value: '24',   unit: '人',  delta: { dir: 'flat', text: '較上個月 持平', isWarning: false } },
      { key: 'occupancy', title: '占床率',        value: '82.3', unit: '%',  delta: { dir: 'up', text: '較上個月 +0.4pp', isWarning: false } },
      { key: 'revenue',   title: '月營收',        value: '$222', unit: '萬', delta: { dir: 'up', text: 'YoY +7.8%',       isWarning: false } },
    ],
    aiInsights: [
      { text: '占床率 82.3%，仍低於集團目標 90%，需積極招收', status: 'warning' },
      { text: '月營收 YoY +7.8%，持續正成長',                  status: 'success' },
      { text: '員工人數穩定無異動',                             status: 'success' },
    ],
    yearOccupancy: [
      { month: '1月', value: 80.5 }, { month: '2月', value: 81.0 }, { month: '3月', value: 81.4 },
      { month: '4月', value: 81.9 }, { month: '5月', value: 82.3 }, { month: '6月', value: null  },
      { month: '7月', value: null  }, { month: '8月', value: null  }, { month: '9月', value: null  },
      { month: '10月', value: null }, { month: '11月', value: null }, { month: '12月', value: null },
    ],
    patientDays: {
      months: trendMonths,
      data: [1420, 1465, 1490, 1478, 1455, 1380, 1310, 1260, 1200, 1140, 1080, 980, 1050],
    },
    residentMovement: {
      months: trendMonths,
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
    },
  },
}

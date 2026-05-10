export const reportDate = '2026年3月10日 週二'

export const kpis = [
  {
    key: 'serviceTotal',
    title: '服務總人數',
    value: '543',
    unit: '人',
    hint: '本月服務中個案',
    delta: null,
  },
  {
    key: 'staffTotal',
    title: '總員工數',
    value: '603',
    unit: '人',
    hint: '本月新入職 +42、離職 -18',
    delta: null,
  },
  {
    key: 'vacancyRate',
    title: '平均空床率',
    value: '15.7',
    unit: '%',
    hint: '住宿長照',
    delta: { dir: 'down', text: '-1.2%' },
  },
  {
    key: 'attendanceRate',
    title: '日照出席率',
    value: '90.3',
    unit: '%',
    hint: '日間照顧中心',
    delta: { dir: 'up', text: '+2.5%' },
  },
]

export const serviceShare = [
  { name: '住宿長照', value: 282, color: '#0097A7' },
  { name: '居家服務', value: 163, color: '#26A69A' },
  { name: '日間照顧', value: 98, color: '#80CBC4' },
]

export const headcount = {
  total: 603,
  newHired: 42,
  resigned: 18,
  resignRate: '1.44%',
  licensed: 410,
  licensedRate: 68,
  composition: [
    { role: '照服員', count: 328, ratio: 54.5 },
    { role: '護理師', count: 116, ratio: 19.2 },
    { role: '社工', count: 58, ratio: 9.6 },
    { role: '行政', count: 45, ratio: 7.5 },
    { role: '物治／職治', count: 36, ratio: 6.0 },
    { role: '其他', count: 20, ratio: 3.2 },
  ],
}

export const trend6m = [
  { month: '10月', 空床率: 18.1, 出席率: 86.4 },
  { month: '11月', 空床率: 17.5, 出席率: 87.1 },
  { month: '12月', 空床率: 17.2, 出席率: 87.9 },
  { month: '1月', 空床率: 16.8, 出席率: 88.6 },
  { month: '2月', 空床率: 16.4, 出席率: 89.4 },
  { month: '3月', 空床率: 15.7, 出席率: 90.3 },
]

export const facilities = [
  {
    id: 'F-001',
    name: '台北大安',
    type: '住宿長照',
    inService: 142,
    capacity: 160,
    utilization: 88.8,
    status: 'stable',
  },
  {
    id: 'F-002',
    name: '桃園慈愛',
    type: '住宿長照',
    inService: 94,
    capacity: 120,
    utilization: 78.3,
    status: 'watch',
  },
  {
    id: 'F-003',
    name: '高雄幸福',
    type: '日間照顧',
    inService: 56,
    capacity: 60,
    utilization: 93.3,
    status: 'stable',
  },
  {
    id: 'F-004',
    name: '台中建德',
    type: '日間照顧',
    inService: 42,
    capacity: 50,
    utilization: 84.0,
    status: 'watch',
  },
  {
    id: 'F-005',
    name: '新北板橋',
    type: '居家服務',
    inService: 98,
    capacity: 110,
    utilization: 89.1,
    status: 'stable',
  },
  {
    id: 'F-006',
    name: '台南安康',
    type: '居家服務',
    inService: 65,
    capacity: 90,
    utilization: 72.2,
    status: 'shortage',
  },
]

export const statusMeta = {
  stable: { label: '穩定', color: 'success' },
  watch: { label: '留意', color: 'warning' },
  shortage: { label: '人員緊缺', color: 'error' },
}

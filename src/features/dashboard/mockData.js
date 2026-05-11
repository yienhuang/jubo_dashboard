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
  { name: '日間照顧', value: 98, color: '#005F64' },
]

export const headcount = {
  total: 603,
  newHired: 42,
  newHiredDelta: { dir: 'up', text: '+5' },
  resigned: 18,
  resignedDelta: { dir: 'down', text: '-3' },
  resignRate: '1.44%',
  resignRateDelta: { dir: 'down', text: '-0.12%' },
  staffRatio: '1:1.7',
}

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


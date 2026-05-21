import { createHashRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Dashboard from '@/pages/Dashboard'
import Residents from '@/pages/Residents'
import CareRecords from '@/pages/CareRecords'
import Capacity from '@/pages/Capacity'
import Workforce from '@/pages/Workforce'
import Accommodation from '@/pages/Accommodation'
import DayCare from '@/pages/DayCare'
import HomeCare from '@/pages/HomeCare'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'residents', element: <Residents /> },
      { path: 'care-records', element: <CareRecords /> },
      { path: 'capacity', element: <Capacity /> },
      { path: 'workforce', element: <Workforce /> },
      { path: 'accommodation', element: <Accommodation /> },
      { path: 'accommodation/:branch', element: <Accommodation /> },
      { path: 'day-care', element: <DayCare /> },
      { path: 'day-care/:branch', element: <DayCare /> },
      { path: 'home-care', element: <HomeCare /> },
      { path: 'home-care/:branch', element: <HomeCare /> },
      { path: 'settings', element: <Settings /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])

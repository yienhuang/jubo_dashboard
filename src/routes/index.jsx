import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Dashboard from '@/pages/Dashboard'
import Residents from '@/pages/Residents'
import CareRecords from '@/pages/CareRecords'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'residents', element: <Residents /> },
      { path: 'care-records', element: <CareRecords /> },
      { path: 'settings', element: <Settings /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])

import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const App = lazy(() => import('./pages/app'))
const Videos = lazy(() => import('./pages/videos'))
const NotFound = lazy(() => import('./pages/notFound'))

const routes: RouteObject[] = [
  { path: '/', element: <App /> },
  { path: '/videos', element: <Videos /> },
  { path: '*', element: <NotFound /> },
]

export default routes

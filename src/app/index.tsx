import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import routes from './router'
import ErrorBoundary from './ErrorBountary'

const App = () => {
  const routing = useRoutes(routes)
  return <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
}

const rootNode = document.getElementById('root')
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode)
  root.render(
    <BrowserRouter basename="/app">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>,
  )
  /* ReactDOM.hydrateRoot(
    root,
    <BrowserRouter basename="/app">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>,
  ) */
} else {
  console.error('Root element not found')
}

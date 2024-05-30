import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/app'

const root = document.getElementById('root')
if (root) {
  ReactDOM.hydrateRoot(root, <App />)
} else {
  console.error('Root element not found')
}

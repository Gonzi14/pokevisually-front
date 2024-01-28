import React from 'react'
import ReactDOM from 'react-dom/client'

import { Home } from './modules/Home/'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)

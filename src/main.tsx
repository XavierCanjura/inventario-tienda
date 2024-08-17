import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Inventario } from './Inventario.tsx'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Inventario />
    </HashRouter>
  </StrictMode>,
)

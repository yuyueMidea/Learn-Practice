import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ApprovalFlowSystem from './ApprovalFlowSystem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApprovalFlowSystem />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PasswordProvider } from './Context/PasswordContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PasswordProvider>
        <App />
      </PasswordProvider>
    </BrowserRouter>
  </StrictMode>,
)

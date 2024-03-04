import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
        <ThemeProvider themes={[ 'dark']}>
          <App />
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { soundEngine } from './utils/soundEngine.js'
import './index.css'

// Avoid a flash of the wrong theme before React mounts — default dark/black
try {
  const saved = localStorage.getItem('portfolio-theme')
  const theme = saved === 'dark' || saved === 'light' ? saved : 'dark'
  document.documentElement.setAttribute('data-theme', theme)
} catch {
  document.documentElement.setAttribute('data-theme', 'dark')
}

// Play /encom.mp3 as early as possible on page load
soundEngine.setEnabled(true)
soundEngine.preload()
soundEngine.startMusicAsync().then((ok) => {
  if (!ok) soundEngine.armAutoplayUnlock()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

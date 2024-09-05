import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProjectContextProvider from './contexts/ProjectContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectContextProvider>
      <App />
    </ProjectContextProvider>
  </React.StrictMode>,
)

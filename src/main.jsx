import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserProvider.jsx'
import { WorkerProvider } from './context/WorkerProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <WorkerProvider>
        <App />
      </WorkerProvider>
    </UserProvider>
  </React.StrictMode>,
)

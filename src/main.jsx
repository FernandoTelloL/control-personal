import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserProvider.jsx'
import { WorkerProvider } from './context/WorkerProvider.jsx'
import { TiposControlProvider } from './context/TiposControlProvider.jsx'
import { InfoPrintProvider } from './context/InfoPrintProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <TiposControlProvider>
        <WorkerProvider>
          <InfoPrintProvider>
            <App />
          </InfoPrintProvider>
        </WorkerProvider>
      </TiposControlProvider>
    </UserProvider>
  </React.StrictMode>,
)

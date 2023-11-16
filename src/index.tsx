import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import './index.css'

async function enableMocking() {
  if (import.meta.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./shared/api/mocks.ts')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({onUnhandledRequest: 'bypass'})
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})


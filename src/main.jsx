import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'flowbite/dist/flowbite.js'
import App from './App.jsx'
import { CounterContextProvider } from './context/CounterContext'
import { UserTokenProvider } from './context/UserTokenContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserTokenProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </UserTokenProvider>
  </QueryClientProvider>
)

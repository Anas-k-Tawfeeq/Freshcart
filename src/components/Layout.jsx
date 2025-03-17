import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: '#4ade80',
          },
        },
      }}/>
      <main className="flex-grow bg-white">
        <Outlet></Outlet>
      </main>
      <Footer/>
    </div>
  )
}

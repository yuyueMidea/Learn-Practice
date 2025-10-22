'use client'

import Header from './header'
import Sidebar from './sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 pt-16">
      <Header />
      <Sidebar />
      <main className="ml-64 p-6 transition-all duration-300">
        <div className="border-red-800">
          {children}
        </div>
      </main>
    </div>
  )
}

'use client'

import { useUserStore } from '@/app/stores/userStore'
import Header from './header'
import Sidebar from './sidebar'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { collapsed } = useUserStore()
  return (
    <div className="h-screen bg-gray-50 pt-16">
      <Header />
      <Sidebar />
      <main className={cn("p-6 transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}
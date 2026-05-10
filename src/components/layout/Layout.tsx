import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  currentView: string
  onNavigate: (view: string) => void
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <Header currentView={currentView} onNavigate={onNavigate} />
      <main className="flex-1 p-6 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
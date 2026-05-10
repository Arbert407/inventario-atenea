import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type LayoutProps = Readonly<{
  children: ReactNode
  currentView: string
  onNavigate: (view: string) => void
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
}>

const themeConfig = {
  dark: {
    background: '#0F172A',
    textPrimary: '#E5E7EB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    border: 'rgba(255,255,255,0.12)',
  },
  light: {
    background: '#1E1B18',
    textPrimary: '#D1D5DB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    border: 'rgba(255,255,255,0.1)',
  },
}

export function Layout({ children, currentView, onNavigate, theme, onThemeChange }: LayoutProps) {
  const styles = themeConfig[theme]

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: styles.background, color: styles.textPrimary }}
    >
      <Header currentView={currentView} onNavigate={onNavigate} theme={theme} onThemeChange={onThemeChange} />
      <main className="flex-1 p-6 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
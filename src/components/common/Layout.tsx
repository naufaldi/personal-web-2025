import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import ConnectCTA from '@/components/sections/ConnectCTA'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-100/40"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>
      <ConnectCTA />
      <Footer />
    </div>
  )
}

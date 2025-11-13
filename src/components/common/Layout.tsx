import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import ConnectCTA from '@/components/sections/ConnectCTA'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <ConnectCTA />
      <Footer />
    </div>
  )
}

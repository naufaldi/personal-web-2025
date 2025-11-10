import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ConnectCTA from '@/components/sections/ConnectCTA'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <ConnectCTA />
      <Footer />
    </div>
  )
}

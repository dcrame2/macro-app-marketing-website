import { AppNavbar } from '@/components/app/AppNavbar'

export const metadata = {
  title: 'InstaCal Web',
}

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <AppNavbar />
      <main className="pb-20 pt-20">{children}</main>
    </div>
  )
}

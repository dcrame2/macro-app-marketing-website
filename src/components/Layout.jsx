import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import '@/styles/landing.css'

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-auto" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}

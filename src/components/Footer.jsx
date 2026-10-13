import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Icon } from '@/components/landing/LandingUI'

export function Footer() {
  return (
    <footer className="ic-footer">
      <div className="ic-wrap">
        <div className="ic-footer-top">
          <div>
            <Link href="/" className="ic-brand">
              <Logo width={36} height={36} />
              <span>
                InstaCal<span className="ic-brand-dot">.</span>
              </span>
            </Link>
            <p>The social app for food & fitness.</p>
          </div>
          <nav aria-label="Explore InstaCal">
            <span>EXPLORE</span>
            <Link href="/#social">The social side</Link>
            <Link href="/#features">Food & fitness</Link>
            <Link href="/#pricing">Free & Pro</Link>
            <Link href="/#faqs">FAQs</Link>
          </nav>
          <nav aria-label="More from InstaCal">
            <span>INSTACAL</span>
            <Link href="/blog">Journal</Link>
            <Link href="/partners">
              Become a partner <Icon name="diagonal" />
            </Link>
            <Link href="/community-guidelines">Community guidelines</Link>
            <Link href="/privacy">Privacy policy</Link>
          </nav>
        </div>
        <div className="ic-footer-bottom">
          <span>
            © {new Date().getFullYear()} InstaCal. All rights reserved.
          </span>
          <span>FOOD. FITNESS. FRIENDS.</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Code2, Clock, Mail, Menu, X } from 'lucide-react'
import './navbar.css'

const navItems = [
  { id: 'hero',     label: 'Home',       icon: Home },
  { id: 'projects', label: 'Projects',   icon: Briefcase },
  { id: 'skills',   label: 'Skills',     icon: Code2 },
  { id: 'timeline', label: 'Experience', icon: Clock },
  { id: 'contact',  label: 'Contact',    icon: Mail },
]

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.nav
        className={`navbar-desktop glass ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="navbar-logo" onClick={() => scrollTo('hero')}>
          <span className="neon-text" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem' }}>
            &lt;MFI/&gt;
          </span>
        </div>

        <div className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div className="nav-indicator" layoutId="nav-indicator" />
                )}
              </button>
            )
          })}
        </div>

        <button className="nav-hire-btn btn-primary" onClick={() => scrollTo('contact')}>
          Hire Me
        </button>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="navbar-mobile-toggle glass"
        onClick={() => setMobileOpen(!mobileOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.id} className={`nav-link-mobile ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollTo(item.id)}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

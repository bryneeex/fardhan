import { useState, useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import ChatBot from './components/ChatBot'
import WhatsAppButton from './components/WhatsAppButton'
import ThemeToggle from './components/ThemeToggle'

import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check initial theme preference
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!isDark) {
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  useEffect(() => {
    // Intersection Observer for Active Navbar Link
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.3 })

    const sections = document.querySelectorAll('section')
    sections.forEach(s => observer.observe(s))

    return () => sections.forEach(s => observer.unobserve(s))
  }, [])

  useEffect(() => {
    // Command Palette Trigger
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="noise-overlay" />
      <div className="grid-bg" />
      
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ChatBot />
      <WhatsAppButton />
    </>
  )
}

export default App

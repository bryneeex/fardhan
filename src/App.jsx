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

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get IP and Location info
        const ipRes = await fetch('https://ipapi.co/json/');
        const data = await ipRes.json();

        // Discord Webhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1501151644707192885/jtfLz54iMyWZmhnIZygbnUs5Nfhf4l74jvXCfkP_Zj2nRfcqjdJt_9LR2u7DSvDIjYf7';
        
        const payload = {
          embeds: [{
            title: "🌐 New Visitor Detected!",
            description: `A user has just landed on **Muhammad Fardhan Ilmansyah's** portfolio.`,
            color: 0x00ff88,
            fields: [
              { name: "📍 IP Address", value: data.ip || 'Unknown', inline: true },
              { name: "🌍 Location", value: `${data.city || '?'}, ${data.region || '?'}, ${data.country_name || '?'}`, inline: true },
              { name: "🏢 ISP", value: data.org || 'Unknown', inline: true },
              { name: "📱 Device Info", value: navigator.userAgent, inline: false },
              { name: "💻 Platform", value: navigator.platform, inline: true },
              { name: "🌐 Language", value: navigator.language, inline: true },
              { name: "⏰ Time", value: new Date().toLocaleString('id-ID'), inline: false }
            ],
            footer: { text: "Fardhan-AI Tracking System • v2.0" },
            timestamp: new Date().toISOString()
          }]
        };

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        // Silently fail to not interrupt user experience
      }
    };

    trackVisitor();
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

      {/* Scroll To Top Button */}
      <motion.button
        className="scroll-to-top glass"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        viewport={{ margin: "0px 0px -200px 0px" }} // Only show when scrolled down
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </motion.button>
    </>
  )
}

export default App

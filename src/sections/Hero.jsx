import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import './hero.css'

const titles = ['Fresh Graduate', 'Software Developer', 'UI/UX Enthusiast', 'Creative Technologist']

function useTextScramble(texts, interval = 3000) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    let timeout
    let frameReq
    const target = texts[currentIndex]
    let frame = 0
    const totalFrames = 30

    const scramble = () => {
      let output = ''
      const progress = frame / totalFrames
      for (let i = 0; i < target.length; i++) {
        if (i < Math.floor(progress * target.length)) {
          output += target[i]
        } else {
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDisplayText(output)
      frame++
      if (frame <= totalFrames) {
        frameReq = requestAnimationFrame(scramble)
      } else {
        setDisplayText(target)
        timeout = setTimeout(() => {
          setCurrentIndex((currentIndex + 1) % texts.length)
        }, interval)
      }
    }

    scramble()
    return () => { cancelAnimationFrame(frameReq); clearTimeout(timeout) }
  }, [currentIndex])

  return displayText
}

export default function Hero() {
  const scrambledText = useTextScramble(titles, 3000)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      {/* Animated particles bg */}
      <div className="hero-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="section-container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="section-label">
            <Sparkles size={14} />
            Welcome to my digital space
          </div>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm <span className="gradient-text">Muhammad Fardhan Ilmansyah</span>
        </motion.h1>

        <motion.div
          className="hero-scramble"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="hero-scramble-prefix">&gt;_</span>
          <span className="hero-scramble-text neon-text">{scrambledText}</span>
          <span className="hero-cursor">|</span>
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I craft cutting-edge digital experiences with clean code and creative design.
          Specializing in modern web applications that push the boundaries of technology.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#contact" className="btn-primary magnetic-btn">
            <Sparkles size={16} />
            <span>Hire Me</span>
          </a>
          <a href="/cv.pdf" className="btn-outline" download>
            <Download size={16} />
            <span>Download CV</span>
          </a>
        </motion.div>

        <motion.button
          className="hero-scroll-indicator"
          onClick={scrollToProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        >
          <ArrowDown size={20} />
        </motion.button>
      </div>
    </section>
  )
}

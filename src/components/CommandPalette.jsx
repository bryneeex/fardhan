import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Hash, X } from 'lucide-react'
import './commandpalette.css'

const allItems = [
  { type: 'section', label: 'Home', id: 'hero', desc: 'Go to hero section' },
  { type: 'section', label: 'Projects', id: 'projects', desc: 'View my projects' },
  { type: 'section', label: 'Skills', id: 'skills', desc: 'View my tech stack' },
  { type: 'section', label: 'Experience', id: 'timeline', desc: 'My work timeline' },
  { type: 'section', label: 'Contact', id: 'contact', desc: 'Get in touch' },
  { type: 'skill', label: 'React', id: 'skills', desc: 'Frontend framework' },
  { type: 'skill', label: 'Node.js', id: 'skills', desc: 'Backend runtime' },
  { type: 'skill', label: 'TypeScript', id: 'skills', desc: 'Typed JavaScript' },
  { type: 'skill', label: 'Python', id: 'skills', desc: 'General purpose language' },
  { type: 'skill', label: 'PostgreSQL', id: 'skills', desc: 'Relational database' },
  { type: 'skill', label: 'Docker', id: 'skills', desc: 'Containerization' },
  { type: 'project', label: 'E-Commerce Platform', id: 'projects', desc: 'Full-stack shop' },
  { type: 'project', label: 'AI Dashboard', id: 'projects', desc: 'Analytics platform' },
  { type: 'project', label: 'Mobile Banking App', id: 'projects', desc: 'React Native app' },
]

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = allItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const navigate = (item) => {
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) navigate(filtered[selected])
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, filtered, selected])

  const typeColor = { section: 'var(--primary)', skill: 'var(--secondary)', project: '#ff9500' }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cp-modal glass"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cp-input-wrap">
              <Search size={18} className="cp-search-icon" />
              <input
                ref={inputRef}
                className="cp-input"
                placeholder="Search sections, skills, projects..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="cp-close" onClick={onClose}><X size={16} /></button>
            </div>

            <div className="cp-results">
              {filtered.length === 0 ? (
                <div className="cp-empty">No results found for "{query}"</div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={i}
                    className={`cp-item ${i === selected ? 'active' : ''}`}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <Hash size={14} style={{ color: typeColor[item.type], flexShrink: 0 }} />
                    <div className="cp-item-content">
                      <span className="cp-item-label">{item.label}</span>
                      <span className="cp-item-desc">{item.desc}</span>
                    </div>
                    <span className="cp-item-type" style={{ color: typeColor[item.type] }}>{item.type}</span>
                    {i === selected && <ArrowRight size={14} style={{ color: 'var(--primary)' }} />}
                  </button>
                ))
              )}
            </div>

            <div className="cp-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>Enter</kbd> select</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

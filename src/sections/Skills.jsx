import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu } from 'lucide-react'
import './skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    icon: '💻',
    skills: ['React', 'TypeScript', 'Next.js', 'Framer Motion', 'Tailwind', 'Three.js']
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redis']
  },
  {
    title: 'Design & Tools',
    icon: '🎨',
    skills: ['Figma', 'Docker', 'Git', 'AWS', 'Jest', 'Vite']
  }
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="skills-section">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Cpu size={14} />
            Core Stack
          </div>
          <h2>My <span className="gradient-text">Tech Stack</span></h2>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="skill-card glass"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className="skill-card-header">
                <span className="skill-icon">{cat.icon}</span>
                <h3 className="skill-title">{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-dim)', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating background elements for high-tech feel */}
        <div className="skills-bg-elements">
          <div className="skills-ring ring-1" />
          <div className="skills-ring ring-2" />
        </div>
      </div>
    </section>
  )
}

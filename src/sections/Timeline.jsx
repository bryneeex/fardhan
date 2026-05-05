import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Briefcase, GraduationCap } from 'lucide-react'
import './timeline.css'

const experiences = [
  {
    type: 'edu',
    title: 'Software Engineering (RPL)',
    org: 'SMK Infokom Bogor',
    date: '2025 - 2027',
    desc: 'Studying Software Engineering. Building various interactive website projects and mastering modern web technologies.',
    tech: ['React', 'Node.js', 'JavaScript', 'UI/UX']
  },
  {
    type: 'work',
    title: 'Game Developer / Creator',
    org: 'Forest Ranger Studio (Roblox)',
    date: '2024 - 2025',
    desc: 'Developed a mobile platformer game system and designed interactive custom maps on the Roblox platform.',
    tech: ['Luau', 'Roblox Studio', 'Game Design']
  },
  {
    type: 'edu',
    title: 'Junior High Student',
    org: 'SMP Negeri 1 Ciomas',
    date: '2022 - 2025',
    desc: 'Developed an early passion for technology, algorithms, and creative problem-solving, which laid a strong foundation for my IT career.',
    tech: []
  }
]

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // The glowing line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline">
      <div className="section-container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Calendar size={14} />
            Experience
          </div>
          <h2>My <span className="gradient-text">Journey</span></h2>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line-bg" />
          <motion.div className="timeline-line-fill" style={{ height: lineHeight }} />

          {experiences.map((exp, i) => {
            const isWork = exp.type === 'work'
            return (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="timeline-dot">
                  {isWork ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                </div>
                
                <div className="timeline-content glass">
                  <span className="timeline-date">{exp.date}</span>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <h4 className="timeline-org">{exp.org}</h4>
                  <p className="timeline-desc">{exp.desc}</p>
                  
                  {exp.tech.length > 0 && (
                    <div className="timeline-tech">
                      {exp.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

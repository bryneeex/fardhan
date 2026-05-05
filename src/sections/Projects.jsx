import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code, Layers } from 'lucide-react'
import './projects.css'

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'A full-stack e-commerce solution with real-time inventory, payment integration, and AI-powered recommendations.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web',
    color: 'var(--primary)',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'AI Analytics Dashboard',
    desc: 'Interactive data visualization dashboard with machine learning insights and predictive analytics.',
    tags: ['Python', 'React', 'TensorFlow', 'D3.js'],
    category: 'Web',
    color: 'var(--secondary)',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'Mobile Banking App',
    desc: 'Secure mobile banking application with biometric authentication and real-time transactions.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    category: 'Mobile',
    color: '#ff9500',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'Brand Identity System',
    desc: 'Complete visual identity design including logo, typography, color palette, and brand guidelines.',
    tags: ['Figma', 'Illustrator', 'After Effects'],
    category: 'Design',
    color: '#ff4081',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'Cloud Infrastructure CLI',
    desc: 'Command-line tool for managing cloud deployments across AWS, GCP, and Azure environments.',
    tags: ['Go', 'Docker', 'Kubernetes', 'Terraform'],
    category: 'Web',
    color: '#00ff88',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'Social Media App',
    desc: 'Feature-rich social platform with real-time messaging, stories, and content recommendation engine.',
    tags: ['Flutter', 'Firebase', 'GraphQL'],
    category: 'Mobile',
    color: '#ff6b6b',
    link: '#',
    github: '#',
    featured: false,
  },
]

const categories = ['All', 'Web', 'Mobile', 'Design']

function TiltCard({ children, className }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Layers size={14} />
            The Lab
          </div>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p style={{ maxWidth: 500, marginTop: '0.75rem' }}>
            A collection of my best work — from full-stack platforms to creative experiments.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={project.featured ? 'project-featured' : ''}
            >
              <TiltCard className="project-card glass">
                <div className="project-card-glow" style={{ background: project.color }} />
                <div className="project-card-content">
                  <div className="project-card-header">
                    <span className="project-category" style={{ color: project.color }}>
                      {project.category}
                    </span>
                    <div className="project-links">
                      <a href={project.github} className="project-link" aria-label="Code">
                        <Code size={16} />
                      </a>
                      <a href={project.link} className="project-link" aria-label="Live demo">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

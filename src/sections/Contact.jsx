import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, Code, Briefcase, MessageSquare } from 'lucide-react'
import './contact.css'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Mail size={14} />
            Direct Portal
          </div>
          <h2>Let's <span className="gradient-text">Connect</span></h2>
          <p style={{ maxWidth: 500, marginTop: '0.75rem' }}>
            Have a project in mind or want to collaborate? Send me a message and let's make it happen.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info glass"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Get in touch</h3>
            <p>You can reach me directly via email or through my social media channels.</p>
            
            <a href="mailto:fardhanilmansyah42@gmail.com" className="contact-email">
              fardhanilmansyah42@gmail.com
            </a>

            <div className="contact-socials">
              <a href="#" className="social-link"><Code size={20} /></a>
              <a href="#" className="social-link"><Briefcase size={20} /></a>
              <a href="#" className="social-link"><MessageSquare size={20} /></a>
            </div>

            <div className="contact-deco">
              <div className="scanline" />
            </div>
          </motion.div>

          <motion.form
            className="contact-form glass"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="input-group">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <span className="input-border" />
            </div>
            <div className="input-group">
              <input
                type="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <span className="input-border" />
            </div>
            <div className="input-group">
              <textarea
                required
                placeholder="Your Message"
                rows="5"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
              <span className="input-border" />
            </div>
            
            <button
              type="submit"
              className={`btn-primary contact-submit ${status !== 'idle' ? 'loading' : ''}`}
              disabled={status !== 'idle'}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} Muhammad Fardhan Ilmansyah. Built with React & Vite.</p>
      </footer>
    </section>
  )
}

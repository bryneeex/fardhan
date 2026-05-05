import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Loader2 } from 'lucide-react'
import './chatbot.css'

const SYSTEM_PROMPT = `You are Fardhan-AI, the personal AI assistant for a software developer's portfolio website. 
You respond in a concise, friendly, slightly futuristic tone — like a helpful terminal AI.
You know the following about the portfolio owner:
- Name: Muhammad Fardhan Ilmansyah
- Role: Fresh Graduate & Web Developer
- Skills: React, Node.js, JavaScript, Python, UI/UX, Figma
- Experience: Fresh Graduate from SMK Infokom Bogor (Software Engineering)
- Available for freelance and full-time opportunities
- Contact: Available through the Contact form or WhatsApp on this website

Keep responses short (2-3 sentences max). Use tech-savvy language. 
If asked something you don't know, suggest they use the contact form.
Always respond in the same language the user uses.`

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '> Fardhan-AI initialized...\n> How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      if (!apiKey || apiKey.includes('your_')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: '> ERROR: API key not configured.\n> Please set VITE_GROQ_API_KEY in the .env file.'
        }])
        setLoading(false)
        return
      }

      const groqMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(1).map(m => ({
          role: m.role,
          content: m.text.replace(/^>\s/, '')
        })),
        { role: 'user', content: userMsg }
      ]

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Menggunakan model Llama 3.1 terbaru dari Groq
          messages: groqMessages,
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API error: ${response.status} ${errorData.error?.message || JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      const text = data.choices[0].message.content

      setMessages(prev => [...prev, { role: 'assistant', text: `> ${text}` }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `> Connection error. Try again or use the contact form.\n> ${err.message || ''}`
      }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
        {!isOpen && <span className="chatbot-toggle-pulse" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window glass"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-status-dot" />
                <span className="chatbot-title">Fardhan-AI</span>
              </div>
              <span className="chatbot-subtitle">Terminal v2.0</span>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" ref={chatRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <pre>{msg.text}</pre>
                </motion.div>
              ))}
              {loading && (
                <div className="chatbot-msg assistant">
                  <Loader2 size={16} className="chatbot-spinner" />
                  <span style={{ marginLeft: 8, color: 'var(--primary)' }}>Processing...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="chatbot-input-wrap">
              <span className="chatbot-prompt">&gt;</span>
              <input
                ref={inputRef}
                className="chatbot-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="chatbot-send" onClick={sendMessage} disabled={loading}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

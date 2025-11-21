import { useEffect, useRef, useState } from 'react'

function ChatPanel() {
  const [messages, setMessages] = useState([ { role: 'assistant', content: 'Welcome! Send a message to test your agent.' } ])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: userMsg.content })
      })
      const data = await res.json()
      setSessionId(data.session_id)
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error contacting backend.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto grid w-full max-w-4xl grid-rows-[1fr_auto] rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
      <div className="scrollbar-thin h-[46vh] overflow-y-auto rounded-2xl bg-black/20 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${m.role === 'user' ? 'bg-gradient-to-br from-blue-500/70 to-indigo-500/70 text-white' : 'bg-white/10 text-slate-100'} max-w-[70%] rounded-2xl px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_30px_rgba(59,130,246,0.25)] backdrop-blur`}> 
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-black/30 p-2">
        <input
          className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-300/50 outline-none backdrop-blur focus:border-blue-400/50"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white shadow-[0_8px_30px_rgba(59,130,246,0.35)] disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default ChatPanel

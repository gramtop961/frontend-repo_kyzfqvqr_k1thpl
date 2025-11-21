import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import GlassTabs from './components/GlassTabs'
import ChatPanel from './components/ChatPanel'
import KnowledgePanel from './components/KnowledgePanel'
import DashboardPanel from './components/DashboardPanel'

function App() {
  const [tab, setTab] = useState('chat')

  // Prefetch backend status subtly
  useEffect(() => {
    fetch((import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000') + '/test').catch(() => {})
  }, [])

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      {/* Hero with Spline liquid orb */}
      <Hero />

      {/* Tab Bar */}
      <div className="relative z-30 -mt-14 px-6">
        <GlassTabs value={tab} onChange={setTab} />
      </div>

      {/* Panels */}
      <div className="relative z-20 px-6 pb-24 pt-8">
        {tab === 'chat' && <ChatPanel />}
        {tab === 'knowledge' && <KnowledgePanel />}
        {tab === 'dashboard' && <DashboardPanel />}
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(120%_100%_at_50%_-20%,rgba(59,130,246,0.15),transparent_60%)]" />
    </div>
  )
}

export default App

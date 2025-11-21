import { useEffect, useState } from 'react'

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-slate-100 backdrop-blur-xl">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-slate-300/70">{label}</div>
    </div>
  )
}

function DashboardPanel() {
  const [stats, setStats] = useState({ agents: 0, knowledge: 0, sessions: 0, recent: [] })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${baseUrl}/stats`)
    const data = await res.json()
    setStats(data)
  }
  useEffect(() => { load() }, [])

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Agents" value={stats.agents} />
        <Stat label="Knowledge" value={stats.knowledge} />
        <Stat label="Sessions" value={stats.sessions} />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="text-sm font-medium text-white">Recent Activity</div>
        <div className="mt-3 space-y-2">
          {stats.recent?.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-black/30 p-3 text-slate-200">
              <div className="text-xs text-slate-400">Session {s.id}</div>
              <div className="text-sm">Updated {new Date(s.updated_at).toLocaleString?.() || ''}</div>
            </div>
          ))}
          {(!stats.recent || stats.recent.length === 0) && (
            <div className="text-slate-300/70">No activity yet. Try chatting with your agent.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPanel

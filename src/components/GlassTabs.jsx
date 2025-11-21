import { useState } from 'react'

const tabs = [
  { id: 'chat', label: 'Tests' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'dashboard', label: 'Dashboard' },
]

function GlassTabs({ value, onChange }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const updateIndicator = (e) => {
    const el = e.target
    setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth })
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="relative flex rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        {/* animated indicator */}
        <span
          className="pointer-events-none absolute bottom-1 top-1 rounded-xl bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_30px_rgba(59,130,246,0.25)] transition-all"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={(e) => { onChange(t.id); updateIndicator(e) }}
            className={`relative z-10 flex-1 px-4 py-3 text-sm font-medium tracking-wide text-slate-200 transition-colors ${value === t.id ? 'text-white' : 'hover:text-white/90'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GlassTabs

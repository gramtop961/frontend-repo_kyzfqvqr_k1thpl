import { useEffect, useState } from 'react'

function KnowledgePanel() {
  const [items, setItems] = useState([])
  const [kind, setKind] = useState('prompt')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${baseUrl}/knowledge`)
    const data = await res.json()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!content.trim()) return
    await fetch(`${baseUrl}/knowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, title, content })
    })
    setTitle('')
    setContent('')
    load()
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="grid gap-3 md:grid-cols-[160px_1fr]">
          <select value={kind} onChange={(e) => setKind(e.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-slate-100">
            <option value="prompt">Prompt</option>
            <option value="faq">FAQ</option>
          </select>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-slate-100 placeholder:text-slate-300/50" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={3} className="md:col-span-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-300/50" />
          <div className="md:col-span-2 flex justify-end">
            <button onClick={add} className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 px-5 py-2.5 text-white shadow-[0_8px_30px_rgba(59,130,246,0.35)]">Add</button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-wider text-slate-300/70">{it.kind}</div>
            {it.title && <div className="mt-1 text-lg font-medium text-white">{it.title}</div>}
            <div className="mt-2 text-slate-200 whitespace-pre-wrap">{it.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KnowledgePanel

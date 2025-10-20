import { useState } from 'react'
import { getTriggers, setTriggers } from '../storage.js'

export default function Triggers() {
  const [list, setList] = useState(() => getTriggers())
  const [text, setText] = useState('')

  function add() {
    const t = text.trim()
    if (!t) return
    const next = Array.from(new Set([t, ...list]))
    setList(next)
    setTriggers(next)
    setText('')
  }

  function remove(item) {
    const next = list.filter(x => x !== item)
    setList(next)
    setTriggers(next)
  }

  return (
    <div className="rounded-2xl shadow-sm ring-1 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{backgroundColor:'var(--surface)', borderColor:'var(--ring)'}}>
      <div className="text-sm mb-2" style={{color:'var(--text-secondary)'}}>تریگرها</div>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2" style={{backgroundColor:'var(--surface-secondary)', borderColor:'var(--ring-secondary)', color:'var(--text-primary)'}} placeholder="مثل: تنهایی، خستگی، استرس" />
        <button onClick={add} className="rounded-lg text-white px-4 py-2 hover:opacity-90" style={{backgroundColor:'var(--success)'}}>افزودن</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {list.map(item => (
          <span key={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{backgroundColor:'var(--surface-secondary)', color:'var(--text-primary)'}}>
            {item}
            <button onClick={() => remove(item)} className="hover:opacity-70" style={{color:'var(--text-muted)'}}>×</button>
          </span>
        ))}
      </div>
    </div>
  )
}



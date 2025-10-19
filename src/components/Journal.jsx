import { useState } from 'react'
import { addNote, getNotes } from '../storage.js'

export default function Journal() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState(() => getNotes())

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    const note = addNote(text.trim())
    setNotes(prev => [note, ...prev])
    setText('')
  }

  return (
    <div className="rounded-2xl shadow-sm ring-1 p-5" style={{backgroundColor:'var(--surface)', borderColor:'var(--ring)'}}>
      <div className="text-sm mb-3" style={{color:'var(--text-secondary)'}}>یادداشت روزانه</div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          style={{backgroundColor:'var(--surface-secondary)', borderColor:'var(--ring-secondary)', color:'var(--text-primary)'}}
          placeholder="چه چیزی را یاد گرفتی؟ چه پیشرفتی کردی؟"
        />
        <button className="rounded-lg text-white px-4 py-2 hover:opacity-90" style={{backgroundColor:'var(--chart-primary)'}}>ثبت</button>
      </form>
      <ul className="mt-4 space-y-2">
        {notes.map(n => (
          <li key={n.id} className="text-sm" style={{color:'var(--text-secondary)'}}>
            <span className="ml-2" style={{color:'var(--text-muted)'}}>{new Date(n.timestamp).toLocaleDateString('fa-IR')}</span>
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  )
}



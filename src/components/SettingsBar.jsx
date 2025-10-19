import { getSettings, setSettings, exportAll, importAll } from '../storage.js'
import { useEffect, useState } from 'react'

export default function SettingsBar({ onThemeChange, goal, onGoalChange }) {

  useEffect(() => {
    onThemeChange?.(null)
  }, [])

  function handleExport() {
    const data = exportAll()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mindguard-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try { importAll(JSON.parse(reader.result)) } catch {}
      window.location.reload()
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl shadow-sm ring-1 p-3" style={{backgroundColor:'var(--surface)', borderColor:'var(--ring)', color:'var(--text-primary)'}}>
      <div className="text-sm">تنظیمات</div>
      <div className="flex items-center gap-3 text-sm">
        <label className="flex items-center gap-2">
          هدف هفتگی:
          <input type="number" min="0" value={goal} onChange={e => onGoalChange?.(Number(e.target.value))} className="w-20 rounded-md border px-2 py-1" style={{backgroundColor:'var(--surface-secondary)', borderColor:'var(--ring-secondary)', color:'var(--text-primary)'}} />
        </label>
        <button onClick={handleExport} className="px-3 py-1 rounded-lg text-white hover:opacity-90" style={{background:'var(--accent)', color:'var(--accent-contrast)'}}>خروجی</button>
        <label className="px-3 py-1 rounded-lg cursor-pointer hover:opacity-90" style={{backgroundColor:'var(--surface-secondary)', color:'var(--text-primary)'}}>
          ورودی
          <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </label>
      </div>
    </div>
  )
}



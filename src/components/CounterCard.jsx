import { useEffect, useState } from 'react'

export default function CounterCard({ title, value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const start = display
    const end = value
    const duration = 600
    const startTs = performance.now()
    let raf
    function tick(ts) {
      const t = Math.min(1, (ts - startTs) / duration)
      const eased = t * (2 - t)
      setDisplay(Math.round(start + (end - start) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div className="rounded-2xl shadow-sm ring-1 p-6 relative overflow-hidden focus-smooth transition-all duration-300" style={{backgroundColor:'var(--surface)', borderColor:'var(--ring)'}}>
      <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full transition-all duration-500" style={{backgroundColor:'var(--surface-secondary)'}} />
      <div className="text-sm mb-1 transition-colors duration-200" style={{color:'var(--text-muted)'}}>{title}</div>
      <div className="text-5xl font-extrabold tracking-tight transition-all duration-300 will-change-transform hover:scale-110" style={{color:'var(--text-primary)'}}>
        {display}
      </div>
    </div>
  )
}



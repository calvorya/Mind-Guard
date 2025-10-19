export default function ProgressRing({
  size = 120,
  stroke = 10,
  progress = 0,
  label = "",
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--ring)"
          strokeWidth={stroke}
          fill="none"
          opacity={0.3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--success)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset .6s cubic-bezier(.2,.8,.2,1)",
            filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.3))"
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="rotate-90"
          style={{ 
            fontSize: 16, 
            fill: 'var(--text-primary)',
            fontWeight: 'bold',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {Math.round(progress * 100)}%
        </text>
      </svg>
      {label ? <div className="text-sm" style={{color:'var(--text-secondary)'}}>{label}</div> : null}
    </div>
  );
}

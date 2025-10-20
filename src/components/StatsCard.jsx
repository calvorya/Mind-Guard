export default function StatsCard({ title, value, subtitle, className = '' }) {
  return (
    <div
      className={`rounded-2xl shadow-sm ring-1 p-5 focus-smooth transition-all duration-300 backdrop-blur-md 
      ${className}`}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--ring)"
      }}
    >
      <div className="text-sm transition-colors duration-200 text-[var(--text-muted)]">{title}</div>
      <div className="mt-2 text-4xl font-bold transition-all duration-300 hover:scale-105 text-[var(--text-primary)]">{value}</div>
      {subtitle ? (
        <div className="mt-1 text-xs transition-colors duration-200 text-[var(--text-muted)]">{subtitle}</div>
      ) : null}
    </div>
  );
}
